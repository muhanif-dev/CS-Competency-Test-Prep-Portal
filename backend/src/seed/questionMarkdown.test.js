import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  createQuestionIndex,
  findQuestionMatch,
  parseQuestionMarkdown,
  preserveQuestionNumber,
} from './questionMarkdown.js'
import { SUBJECT_MAP } from '../utils/questionPool.js'

const sourcePath = fileURLToPath(
  new URL('../NSCT/all-subjects-questions.md', import.meta.url),
)

test('parses the complete multiline Python question from the source bank', () => {
  const source = fs.readFileSync(sourcePath, 'utf8')
  const questions = parseQuestionMarkdown(source)
  const question = questions.find(
    (item) =>
      item.number === 179 &&
      item.options[2]?.text === 'Bark' &&
      item.question.startsWith('179. What is the output?'),
  )

  assert.ok(question)
  assert.match(question.question, /class Animal:\n    def sound\(self\):/)
  assert.match(question.question, /d\.sound\(\)$/)
  assert.deepEqual(
    question.options.map((option) => option.id),
    ['A', 'B', 'C', 'D'],
  )
})

test('preserves existing answer choices while matching truncated prompts', () => {
  const questions = parseQuestionMarkdown(
    '179. What is the output?\nclass Animal:\n    pass\nA) Sound\nB) Animal\nC) Bark\nD) Error\n',
  )
  const index = createQuestionIndex(questions)
  const options = [
    { id: 'A', text: 'Sound' },
    { id: 'B', text: 'Animal' },
    { id: 'C', text: 'Bark' },
    { id: 'D', text: 'Error' },
  ]
  const { candidate, ambiguous } = findQuestionMatch(
    '179. What is the output?',
    options,
    index,
  )

  assert.equal(ambiguous, false)
  assert.match(candidate.question, /class Animal:\n    pass/)
  assert.equal(
    preserveQuestionNumber('179. What is the output?', candidate.question),
    candidate.question,
  )
})

test('skips ambiguous stem-and-option matches without a matching source number', () => {
  const questions = parseQuestionMarkdown(
    '1. What is the output?\nprint(1)\nA) 1\nB) 2\nC) 3\nD) 4\n' +
      '2. What is the output?\nprint(2)\nA) 1\nB) 2\nC) 3\nD) 4\n',
  )
  const { candidate, ambiguous } = findQuestionMatch(
    'What is the output?',
    [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '3' },
      { id: 'D', text: '4' },
    ],
    createQuestionIndex(questions),
  )

  assert.equal(candidate, null)
  assert.equal(ambiguous, true)
})

test('uses the subject topic to disambiguate repeated stems and answer choices', () => {
  const questions = parseQuestionMarkdown(
    'TOPIC 1: First Topic\n1. What is the output?\nprint(1)\nA) 1\nB) 2\nC) 3\nD) 4\n' +
      'TOPIC 2: Second Topic\n2. What is the output?\nprint(2)\nA) 1\nB) 2\nC) 3\nD) 4\n',
  )
  const { candidate, ambiguous } = findQuestionMatch(
    'What is the output?',
    [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '3' },
      { id: 'D', text: '4' },
    ],
    createQuestionIndex(questions),
    'Second Topic',
  )

  assert.equal(ambiguous, false)
  assert.match(candidate.question, /print\(2\)/)
  assert.equal(candidate.topic, 'Second Topic')
})

test('uses the stored correct answer and explanation to resolve repeated code options', () => {
  const questions = parseQuestionMarkdown(
    'TOPIC 1: Control Structures - C++\n' +
      'Q46. What is the output of the following code?\nint x = 3;\nif (x = 5)\ncout << "True";\nelse\ncout << "False";\n' +
      'A) True\nB) False\nC) Error\nD) Nothing\nCorrect Answer: A) True\nExplanation: Assignment sets x to 5, which is non-zero, so the condition is true.\n' +
      'Q47. What is the output of the following code?\nint x = 3;\nif (x == 5)\ncout << "True";\nelse\ncout << "False";\n' +
      'A) True\nB) False\nC) Error\nD) Nothing\nCorrect Answer: B) False\nExplanation: The comparison is false, so the else branch runs.',
  )
  const { candidate, ambiguous } = findQuestionMatch(
    'What is the output of the following code?',
    [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' },
      { id: 'C', text: 'Error' },
      { id: 'D', text: 'Nothing' },
    ],
    createQuestionIndex(questions),
    'Control Structures - C++',
    {
      correctAnswer: 'A',
      explanation:
        'Assignment sets x to 5, which is non-zero, so the condition is true.',
    },
  )

  assert.equal(ambiguous, false)
  assert.match(candidate.question, /if \(x = 5\)/)
  assert.equal(candidate.correctAnswer, 'A')
})

test('matches code prompts when the source has malformed answer option labels', () => {
  const questions = parseQuestionMarkdown(
    'TOPIC 1: Input / Output Handling - C++\n' +
      'Q15. What is the output of the following code?\ncout << "A\\\\tB";\n' +
      'A) AB\nB) A B with tab space\nC) A\nB\nC) Error\n' +
      'Correct Answer: B) A B with tab space\n' +
      'Explanation: The \\\\t escape sequence creates a tab space between A and B.',
  )
  const { candidate, ambiguous } = findQuestionMatch(
    'What is the output of the following code?',
    [
      { id: 'A', text: 'AB' },
      { id: 'B', text: 'A B with tab space' },
      { id: 'C', text: 'A' },
      { id: 'D', text: 'Error' },
    ],
    createQuestionIndex(questions),
    'Input / Output Handling - C++',
    {
      correctAnswer: 'B',
      explanation: 'The \\t escape sequence creates a tab space between A and B.',
    },
  )

  assert.equal(ambiguous, false)
  assert.match(candidate.question, /cout << "A\\\\tB";/)
})

test('does not match unrelated questions using answer options alone', () => {
  const questions = parseQuestionMarkdown(
    'Q17. Which operator is used to assign a value?\n' +
      'A) ==\nB) =\nC) ===\nD) !=\nCorrect Answer: B\n' +
      'Explanation: The assignment operator is =.',
  )
  const { candidate } = findQuestionMatch(
    'Which operator compares both value and type?',
    [
      { id: 'A', text: '== ' },
      { id: 'B', text: '=' },
      { id: 'C', text: '===' },
      { id: 'D', text: '!=' },
    ],
    createQuestionIndex(questions),
    '',
    { correctAnswer: 'B' },
  )

  assert.equal(candidate, null)
})

test('repairs abbreviated code questions in the active quiz question pool', () => {
  const questions = SUBJECT_MAP['programming-cpp-java-python'].questions
  const hasOptions = (question, expected) =>
    ['A', 'B', 'C', 'D'].every(
      (id, index) =>
        question.options.find((option) => option.id === id)?.text === expected[index],
    )

  const exceptionQuestion = questions.find((question) =>
    hasOptions(question, ['A', 'B', 'AB', 'Nothing']),
  )
  const threadQuestion = questions.find((question) =>
    hasOptions(question, [
      'TaskTask always',
      'TaskTask may appear with interleaved output',
      'Only one Task appears',
      'Error',
    ]),
  )

  assert.match(exceptionQuestion.question, /throw 2\.5;/)
  assert.match(threadQuestion.question, /thread t1\(task\);/)
})

test('includes the full Python inheritance question in the active question pool', () => {
  const question = SUBJECT_MAP['programming-cpp-java-python'].questions.find(
    (item) => item.options.find((option) => option.id === 'C')?.text === 'Bark',
  )

  assert.ok(question)
  assert.match(question.question, /class Animal:\n    def sound\(self\):/)
  assert.match(question.question, /d\.sound\(\)$/)
  assert.equal(question.correctAnswer, 'C')
})
