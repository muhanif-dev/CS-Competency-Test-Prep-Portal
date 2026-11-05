import axios from 'axios'
import { getOtherTopicNames, getTopicByIds } from '../data/competencies'
import { parseQuizJson, validateQuizPayload } from '../utils/quizValidation'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL?.trim() || 'gemini-3.5-flash'
const MAX_GENERATION_ATTEMPTS = 3

function buildPrompt({
  competencyName,
  topicName,
  otherTopics,
  numberOfQuestions,
  difficulty,
  excludeQuestions,
  nonce,
}) {
  const difficultyInstruction =
    difficulty === 'Mixed'
      ? 'Use a balanced mix of Easy, Medium, and Hard questions.'
      : `All questions must be ${difficulty} difficulty (set the "difficulty" field accordingly).`

  const exclusionList =
    otherTopics.length > 0 ? otherTopics.join(', ') : 'any other topic'

  const previousQuestionsBlock =
    excludeQuestions && excludeQuestions.length > 0
      ? `\nDo NOT repeat, rephrase, or lightly modify any of these previously asked questions. Generate genuinely different questions covering different sub-concepts, examples, or angles:\n${excludeQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n`
      : ''

  return `You are an expert Computer Science educator creating competency test preparation questions.

Session reference (ignore, only for uniqueness): ${nonce}

Generate questions ONLY from the selected competency area and selected topic provided below.

Competency Area:
${competencyName}

Topic:
${topicName}

Do not generate questions about ${exclusionList}, or any other topic outside "${topicName}" within this competency area.
Do not generate random or general Computer Science questions unrelated to this topic.
${previousQuestionsBlock}
Requirements:
- Generate exactly ${numberOfQuestions} unique multiple-choice questions.
- ${difficultyInstruction}
- Prioritize variety: vary phrasing, use different concrete examples/code snippets/scenarios each time rather than the most common textbook version of a question.
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
    if (status === 503) {
      return 'Google Gemini is temporarily overloaded. Please try again in a few moments.'
    }
    if (status === 400) {
      return `Gemini rejected the quiz request: ${message || 'check the configured model and request settings.'}`
    }
    if (status === 401 || status === 403) {
      return `Gemini rejected the API key or access: ${message || 'check that the key is valid and the Gemini API is enabled for its project.'}`
    }
    if (status === 404) {
      return `Gemini model "${GEMINI_MODEL}" was not found. Set VITE_GEMINI_MODEL to an available Gemini model.`
    }
    if (error.code === 'ERR_NETWORK') {
      return 'Network error. Check your internet connection and try again.'
    }
    if (message) return `Gemini API error${status ? ` (${status})` : ''}: ${message}`
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
  excludeQuestions = [],
}) {
  if (!isAiConfigured()) {
    throw new Error(
      'Quiz generation is currently unavailable. Please try again later.'
    )
  }

  const resolved = getTopicByIds(competencyId, topicId)
  if (!resolved) {
    throw new Error('Invalid competency area or topic selected.')
  }

  const { competency, topic } = resolved
  const otherTopics = getOtherTopicNames(competency, topicId)

  const nonce = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

  const prompt = buildPrompt({
    competencyName: competency.name,
    topicName: topic.name,
    otherTopics,
    numberOfQuestions,
    difficulty,
    excludeQuestions: excludeQuestions.slice(-40),
    nonce,
  })

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

  let response
  for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt += 1) {
    try {
      response = await axios.post(
        url,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY,
          },
          timeout: 120000,
        },
      )
      break
    } catch (error) {
      const isTemporaryOverload = error.response?.status === 503 || error.response?.status === 429
      if (!isTemporaryOverload || attempt === MAX_GENERATION_ATTEMPTS - 1) {
        throw new Error(mapApiError(error))
      }
      const delayMs = 700 * (2 ** attempt) + Math.random() * 300
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }

  const candidates = response.data?.candidates
  const candidate = candidates?.[0]
  const text = candidate?.content?.parts?.map((part) => part.text || '').join('').trim()

  if (!text) {
    const reason = candidate?.finishReason || response.data?.promptFeedback?.blockReason
    throw new Error(
      reason
        ? `Gemini did not return quiz text (reason: ${reason}). Try again or adjust the request.`
        : 'Gemini returned an empty response. Please try again.',
    )
  }

  const parsed = parseQuizJson(text)
  if (!parsed.ok) {
    throw new Error(`Gemini returned invalid quiz JSON: ${parsed.error}`)
  }

  const validation = validateQuizPayload(parsed.data, numberOfQuestions)
  if (!validation.valid) {
    throw new Error(`Gemini returned an invalid quiz: ${validation.error}`)
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
      source: 'ai',
      generatedAt: Date.now(),
    },
  }
}
