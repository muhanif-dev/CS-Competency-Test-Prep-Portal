const questionHeadingPattern = /^\s*(?:Q\s*)?(\d+)[.)]\s*(.+?)\s*$/
const optionPattern = /^\s*([A-D])[.)]\s*(.*)$/
const metadataPattern = /^\s*(?:Correct Answer|Answer|Reason|Why|Explanation)\s*:/i
const sectionHeadingPattern = /^\s*(?:Subject:|\.?\s*TOPIC\s+\d+\s*:|\.?\s*Topic\s+\d+\s*:)/i
const topicHeadingPattern = /^\s*\.?\s*(?:TOPIC|Topic)\s+\d+\s*:\s*(.+?)\s*$/i

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function getQuestionNumber(question) {
  const match = String(question).match(/^\s*(?:Q\s*)?(\d+)[.)]\s+/i)
  return match ? Number(match[1]) : null
}

function getQuestionStem(question) {
  const firstLine = String(question).split(/\r?\n/, 1)[0]
  return normalizeText(firstLine.replace(/^\s*(?:Q\s*)?\d+[.)]\s*/i, ''))
}

function getQuestionBody(question) {
  return normalizeText(String(question).replace(/^\s*(?:Q\s*)?\d+[.)]\s*/i, ''))
}

function normalizeTopic(topic) {
  return normalizeText(String(topic ?? '').replace(/^(?:TOPIC|Topic)\s+\d+\s*:\s*/i, ''))
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

function getOptionsKey(options) {
  if (!Array.isArray(options) || options.length !== 4) return null

  const textById = new Map(options.map((option) => [option.id, option.text]))
  const orderedText = ['A', 'B', 'C', 'D'].map((id) => textById.get(id))
  if (orderedText.some((text) => typeof text !== 'string' || !text.trim())) return null

  return JSON.stringify(orderedText.map(normalizeText))
}

function getMetadataMatch(question, metadata) {
  let candidates = question

  if (metadata.correctAnswer) {
    const answerMatches = candidates.filter(
      (candidate) => candidate.correctAnswer === metadata.correctAnswer,
    )
    if (answerMatches.length > 0) candidates = answerMatches
  }

  if (metadata.explanation) {
    const explanationKey = normalizeText(metadata.explanation)
    const explanationMatches = candidates.filter(
      (candidate) => normalizeText(candidate.explanation) === explanationKey,
    )
    if (explanationMatches.length > 0) candidates = explanationMatches
  }

  return candidates
}

export function parseQuestionMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/)
  const questions = []
  let currentTopic = ''

  for (let index = 0; index < lines.length; index += 1) {
    const topicHeading = lines[index].match(topicHeadingPattern)
    if (topicHeading) {
      currentTopic = topicHeading[1]
      continue
    }

    if (/^\s*Subject\s*:/i.test(lines[index])) {
      currentTopic = ''
      continue
    }

    const heading = lines[index].match(questionHeadingPattern)
    if (!heading) continue

    const promptLines = [lines[index].trim()]
    const optionMap = new Map()
    let activeOption = null
    let correctAnswer = ''
    let explanation = ''
    let activeMetadata = ''

    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      const line = lines[cursor]

      if (questionHeadingPattern.test(line) || sectionHeadingPattern.test(line)) break
      if (metadataPattern.test(line)) {
        activeMetadata = /^(?:Reason|Why|Explanation)\s*:/i.test(line.trim())
          ? 'explanation'
          : 'answer'
        const answerMatch = line.match(/^\s*(?:Correct Answer|Answer)\s*:\s*([A-D])(?:\s*[).:]|$)/i)
        const explanationMatch = line.match(/^\s*(?:Reason|Why|Explanation)\s*:\s*(.*)$/i)
        if (answerMatch) correctAnswer = answerMatch[1].toUpperCase()
        if (explanationMatch) explanation = explanationMatch[1].trim()
        continue
      }

      if (activeMetadata) {
        if (activeMetadata === 'explanation' && line.trim()) {
          explanation = `${explanation} ${line.trim()}`.trim()
        }
        continue
      }

      const optionMatch = line.match(optionPattern)
      if (optionMatch) {
        const id = optionMatch[1].toUpperCase()
        if (optionMap.has(id)) continue

        activeOption = { id, text: optionMatch[2].trim() }
        optionMap.set(id, activeOption)
        continue
      }

      if (optionMap.size === 0) {
        if (/^\s*```/.test(line)) continue
        promptLines.push(line)
      } else if (activeOption && line.trim()) {
        activeOption.text = `${activeOption.text} ${line.trim()}`.trim()
      }
    }

    const question = promptLines.join('\n').trim()
    const options = ['A', 'B', 'C', 'D']
      .filter((id) => optionMap.has(id))
      .map((id) => optionMap.get(id))
    const stemKey = getQuestionStem(question)
    const matchKey = JSON.stringify([stemKey, getOptionsKey(options)])

    questions.push({
      number: Number(heading[1]),
      question,
      options,
      topic: currentTopic,
      correctAnswer,
      explanation,
      stemKey,
      matchKey,
      optionsKey: getOptionsKey(options),
    })
  }

  return questions
}

export function findQuestionMatch(
  question,
  options,
  questionIndex,
  topic = '',
  metadata = {},
) {
  const stemKey = getQuestionStem(question)
  const optionsKey = getOptionsKey(options)
  const matchKey = JSON.stringify([stemKey, optionsKey])
  let candidates =
    questionIndex.get(matchKey) ||
    questionIndex.byStem.get(stemKey) ||
    []
  if (candidates.length === 0) return { candidate: null, ambiguous: false }

  const topicKey = normalizeTopic(topic)
  if (topicKey) {
    const topicMatches = candidates.filter(
      (candidate) => normalizeTopic(candidate.topic) === topicKey,
    )
    if (topicMatches.length === 1) {
      return { candidate: topicMatches[0], ambiguous: false }
    }
    if (topicMatches.length > 1) candidates = topicMatches
  }

  candidates = getMetadataMatch(candidates, metadata)

  const currentNumber = getQuestionNumber(question)
  if (currentNumber !== null) {
    const sameNumber = candidates.filter((candidate) => candidate.number === currentNumber)
    if (sameNumber.length === 1) return { candidate: sameNumber[0], ambiguous: false }
    if (sameNumber.length > 1) {
      return { candidate: null, ambiguous: true }
    }
  }

  const distinctBodies = new Map(
    candidates.map((candidate) => [getQuestionBody(candidate.question), candidate]),
  )
  if (distinctBodies.size === 1) {
    return { candidate: distinctBodies.values().next().value, ambiguous: false }
  }

  if (candidates.length === 1) return { candidate: candidates[0], ambiguous: false }
  return { candidate: null, ambiguous: true }
}

export function createQuestionIndex(questions) {
  const index = new Map()
  index.byStem = new Map()

  for (const question of questions) {
    const candidates = index.get(question.matchKey) || []
    if (!candidates.some((candidate) => candidate.question === question.question)) {
      candidates.push(question)
    }
    index.set(question.matchKey, candidates)

    const stemCandidates = index.byStem.get(question.stemKey) || []
    stemCandidates.push(question)
    index.byStem.set(question.stemKey, stemCandidates)
  }
  return index
}

export function preserveQuestionNumber(existingQuestion, repairedQuestion) {
  const existingPrefix = String(existingQuestion).match(/^\s*((?:Q\s*)?\d+[.)])\s*/i)
  const repairedBody = String(repairedQuestion).replace(/^\s*(?:Q\s*)?\d+[.)]\s*/i, '')
  return existingPrefix ? `${existingPrefix[1]} ${repairedBody}` : repairedBody
}
