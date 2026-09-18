import { parseQuizJson, validateQuizPayload } from './quizValidation.js'

function sampleQuestion(n) {
  return {
    id: `q${n}`,
    question: `Sample question ${n}?`,
    options: [
      { id: 'A', text: 'A' },
      { id: 'B', text: 'B' },
      { id: 'C', text: 'C' },
      { id: 'D', text: 'D' },
    ],
    correctAnswer: 'B',
    explanation: 'Because B.',
    difficulty: 'Medium',
  }
}

const validPayload = {
  questions: [1, 2].map(sampleQuestion),
}

let passed = 0
let failed = 0

function assert(name, condition) {
  if (condition) {
    passed += 1
    console.log(`✓ ${name}`)
  } else {
    failed += 1
    console.error(`✗ ${name}`)
  }
}

assert('valid payload passes', validateQuizPayload(validPayload, 2).valid === true)

const dup = {
  questions: [sampleQuestion(1), { ...sampleQuestion(2), question: 'Sample question 1?' }],
}
assert('duplicate questions fail', validateQuizPayload(dup, 2).valid === false)

const parsed = parseQuizJson('```json\n' + JSON.stringify(validPayload) + '\n```')
assert('parse fenced json', parsed.ok === true)

assert('wrong count fails', validateQuizPayload(validPayload, 10).valid === false)

if (failed > 0) {
  process.exit(1)
}

console.log(`\n${passed} tests passed`)
