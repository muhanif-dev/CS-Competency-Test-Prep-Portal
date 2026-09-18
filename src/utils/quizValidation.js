const OPTION_IDS = ['A', 'B', 'C', 'D']

function normalizeQuestionText(text) {
  return String(text).trim().toLowerCase().replace(/\s+/g, ' ')
}

export function validateQuizPayload(data, expectedCount) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Response is empty or invalid.' }
  }

  const { questions } = data
  if (!Array.isArray(questions)) {
    return { valid: false, error: 'Questions array is missing.' }
  }

  if (questions.length !== expectedCount) {
    return {
      valid: false,
      error: `Expected ${expectedCount} questions, received ${questions.length}.`,
    }
  }

  const seen = new Set()

  for (let i = 0; i < questions.length; i += 1) {
    const q = questions[i]
    const prefix = `Question ${i + 1}`

    if (!q || typeof q !== 'object') {
      return { valid: false, error: `${prefix}: invalid question object.` }
    }

    if (!q.question || !String(q.question).trim()) {
      return { valid: false, error: `${prefix}: missing question text.` }
    }

    const normalized = normalizeQuestionText(q.question)
    if (seen.has(normalized)) {
      return { valid: false, error: `${prefix}: duplicate question detected.` }
    }
    seen.add(normalized)

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      return { valid: false, error: `${prefix}: must have exactly 4 options.` }
    }

    const optionIds = new Set()
    for (const opt of q.options) {
      if (!opt || !opt.id || !String(opt.text).trim()) {
        return { valid: false, error: `${prefix}: empty or invalid option.` }
      }
      if (!OPTION_IDS.includes(opt.id)) {
        return { valid: false, error: `${prefix}: option id must be A, B, C, or D.` }
      }
      optionIds.add(opt.id)
    }

    if (optionIds.size !== 4) {
      return { valid: false, error: `${prefix}: duplicate option ids.` }
    }

    if (!q.correctAnswer || !OPTION_IDS.includes(q.correctAnswer)) {
      return { valid: false, error: `${prefix}: invalid correctAnswer.` }
    }

    if (!optionIds.has(q.correctAnswer)) {
      return { valid: false, error: `${prefix}: correctAnswer does not match an option.` }
    }

    if (!q.explanation || !String(q.explanation).trim()) {
      return { valid: false, error: `${prefix}: missing explanation.` }
    }
  }

  return { valid: true, questions }
}

export function parseQuizJson(rawText) {
  if (!rawText || !String(rawText).trim()) {
    return { ok: false, error: 'Empty response from AI.' }
  }

  let text = String(rawText).trim()

  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenceMatch) {
    text = fenceMatch[1].trim()
  }

  const firstBrace = text.indexOf('{')
  const lastBrace = text.lastIndexOf('}')
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return { ok: false, error: 'No JSON object found in response.' }
  }

  text = text.slice(firstBrace, lastBrace + 1)

  try {
    const data = JSON.parse(text)
    return { ok: true, data }
  } catch {
    return { ok: false, error: 'Invalid JSON in AI response.' }
  }
}
