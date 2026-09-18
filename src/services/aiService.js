import axios from 'axios'
import { getOtherTopicNames, getTopicByIds } from '../data/competencies'
import { parseQuizJson, validateQuizPayload } from '../utils/quizValidation'

/**
 * Browser-side quiz generation via Google Gemini.
 *
 * Security note: Standard OpenAI/Anthropic secret keys must not ship in frontend bundles.
 * Google Gemini supports client-side use when the key is stored in VITE_* env vars (not
 * hardcoded) and restricted in Google Cloud Console (API + HTTP referrer limits).
 * See .env.example and README for setup.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.5-flash-lite'

function buildPrompt({ competencyName, topicName, otherTopics, numberOfQuestions, difficulty }) {
  const difficultyInstruction =
    difficulty === 'Mixed'
      ? 'Use a balanced mix of Easy, Medium, and Hard questions.'
      : `All questions must be ${difficulty} difficulty (set the "difficulty" field accordingly).`

  const exclusionList =
    otherTopics.length > 0
      ? otherTopics.join(', ')
      : 'any other topic'

  return `You are an expert Computer Science educator creating competency test preparation questions.

Generate questions ONLY from the selected competency area and selected topic provided below.

Competency Area:
${competencyName}

Topic:
${topicName}

Do not generate questions about ${exclusionList}, or any other topic outside "${topicName}" within this competency area.
Do not generate random or general Computer Science questions unrelated to this topic.

Requirements:
- Generate exactly ${numberOfQuestions} unique multiple-choice questions.
- ${difficultyInstruction}
- Each question must have exactly 4 options with ids "A", "B", "C", "D".
- Exactly one correct answer per question.
- Include a clear explanation for each question.
- Question ids: q1 through q${numberOfQuestions}.

Return ONLY valid JSON with this exact structure (no markdown, no extra text):
{
  "questions": [
    {
      "id": "q1",
      "question": "Question text",
      "options": [
        { "id": "A", "text": "Option A" },
        { "id": "B", "text": "Option B" },
        { "id": "C", "text": "Option C" },
        { "id": "D", "text": "Option D" }
      ],
      "correctAnswer": "B",
      "explanation": "Explanation of the correct answer",
      "difficulty": "Medium"
    }
  ]
}`
}

function mapApiError(error) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const message = error.response?.data?.error?.message

    if (status === 429) {
      return 'Rate limit reached. Please wait a moment and try again.'
    }
    if (status === 401 || status === 403) {
      return 'API authentication failed. Check your API key configuration.'
    }
    if (error.code === 'ERR_NETWORK') {
      return 'Network error. Check your internet connection and try again.'
    }
    if (message) return message
  }
  return error?.message || 'Failed to generate quiz.'
}

export function isAiConfigured() {
  return Boolean(GEMINI_API_KEY && String(GEMINI_API_KEY).trim())
}

export async function generateQuiz({
  competencyId,
  topicId,
  numberOfQuestions,
  difficulty,
}) {
  if (!isAiConfigured()) {
    throw new Error(
      'AI is not configured. Add VITE_GEMINI_API_KEY to your .env file (see .env.example).',
    )
  }

  const resolved = getTopicByIds(competencyId, topicId)
  if (!resolved) {
    throw new Error('Invalid competency area or topic selected.')
  }

  const { competency, topic } = resolved
  const otherTopics = getOtherTopicNames(competency, topicId)

  const prompt = buildPrompt({
    competencyName: competency.name,
    topicName: topic.name,
    otherTopics,
    numberOfQuestions,
    difficulty,
  })

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

  let response
  try {
    response = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          responseMimeType: 'application/json',
        },
      },
      {
        params: { key: GEMINI_API_KEY },
        headers: { 'Content-Type': 'application/json' },
        timeout: 120000,
      },
    )
  } catch (error) {
    throw new Error(mapApiError(error))
  }

  const candidates = response.data?.candidates
  const text = candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('Empty response from AI. Please try again.')
  }

  const parsed = parseQuizJson(text)
  if (!parsed.ok) {
    throw new Error(
      'Unable to generate a valid quiz. Please try again.',
    )
  }

  const validation = validateQuizPayload(parsed.data, numberOfQuestions)
  if (!validation.valid) {
    throw new Error('Unable to generate a valid quiz. Please try again.')
  }

  const questions = validation.questions.map((q, index) => ({
    ...q,
    id: q.id || `q${index + 1}`,
  }))

  return {
    questions,
    meta: {
      competencyArea: competency.name,
      topic: topic.name,
      competencyId: competency.id,
      topicId: topic.id,
      numberOfQuestions,
      difficulty,
      generatedAt: Date.now(),
    },
  }
}
