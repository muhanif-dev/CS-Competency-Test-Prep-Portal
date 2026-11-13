import { readFileSync } from 'node:fs'
import databaseQuestions from '../seed/databaseQuestions.js'
import cybersecurityQuestions from '../seed/cybersecurityQuestions.js'
import operatingSystemQuestions from '../seed/operatingSystemQuestions.js'
import computerNetworksQuestions from '../seed/computerNetworksQuestions.js'
import webDevelopmentQuestions from '../seed/webDevelopmentQuestions.js'
import problemSolvingQuestions from '../seed/problemSolvingQuestions.js'
import programmingQuestions from '../seed/programmingQuestions.js'
import softwareEngineeringQuestions from '../seed/softwareEngineeringQuestions.js'
import aiMlQuestions from '../seed/aiMlQuestions.js'
import dsaQuestions from '../seed/dsaQuestions.js'
import {
  createQuestionIndex,
  findQuestionMatch,
  parseQuestionMarkdown,
  preserveQuestionNumber,
} from '../seed/questionMarkdown.js'

const sourceQuestions = parseQuestionMarkdown(
  readFileSync(new URL('../NSCT/all-subjects-questions.md', import.meta.url), 'utf8'),
)
const sourceQuestionIndex = createQuestionIndex(sourceQuestions)

function restoreCompletePrompts(questions) {
  return questions.map((question) => {
    const { candidate } = findQuestionMatch(
      question.question,
      question.options,
      sourceQuestionIndex,
      question.topic,
      {
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      },
    )
    if (!candidate || candidate.question.length <= question.question.length) {
      return question
    }

    return {
      ...question,
      question: preserveQuestionNumber(question.question, candidate.question),
    }
  })
}

export const SUBJECT_MAP = {
  databases: {
    name: 'Databases',
    questions: databaseQuestions,
  },
  'cyber-security': {
    name: 'Cyber Security',
    questions: cybersecurityQuestions,
  },
  'operating-systems': {
    name: 'Operating Systems',
    questions: operatingSystemQuestions,
  },
  'computer-networks': {
    name: 'Computer Networks and Cloud Computing',
    questions: computerNetworksQuestions,
  },
  'web-development': {
    name: 'Web Development',
    questions: webDevelopmentQuestions,
  },
  'problem-solving-analytical-skills': {
    name: 'Problem Solving and Analytical Skills',
    questions: problemSolvingQuestions,
  },
  'programming-cpp-java-python': {
    name: 'Programming (C++/Java/Python)',
    questions: programmingQuestions,
  },
  'software-engineering': {
    name: 'Software Engineering',
    questions: softwareEngineeringQuestions,
  },
  'ai-machine-learning-data-analytics': {
    name: 'AI / Machine Learning and Data Analytics',
    questions: aiMlQuestions,
  },
  'data-structures-algorithms': {
    name: 'Data Structures & Algorithms',
    questions: dsaQuestions,
  },
}

for (const subject of Object.values(SUBJECT_MAP)) {
  subject.questions = restoreCompletePrompts(subject.questions)
}

// Fisher-Yates array shuffle
export function shuffleArray(arr) {
  const cloned = [...arr]
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cloned[i], cloned[j]] = [cloned[j], cloned[i]]
  }
  return cloned
}

/**
 * Retrieves questions for a specific subject or across all subjects.
 * Works with MongoDB if connected or falls back to the embedded seed pool.
 */
export async function getQuestionBatch({
  competencyId = 'all',
  count = 20,
  difficulty = 'Mixed',
}) {
  const isAll =
    !competencyId ||
    competencyId === 'all' ||
    competencyId === 'all-subjects'

  // 1. ALL SUBJECTS
  if (isAll) {
    const allSubjectKeys = Object.keys(SUBJECT_MAP)
    const perSubject = Math.max(1, Math.ceil(count / allSubjectKeys.length))
    let combined = []

    for (const key of allSubjectKeys) {
      let subjectList = SUBJECT_MAP[key].questions
      if (difficulty && difficulty !== 'Mixed') {
        const filtered = subjectList.filter((q) => q.difficulty === difficulty)
        if (filtered.length > 0) subjectList = filtered
      }
      const shuffledSubject = shuffleArray(subjectList)
      combined.push(...shuffledSubject.slice(0, perSubject))
    }

    const shuffled = shuffleArray(combined)
    const result = shuffled.slice(0, count)

    if (result.length < count) {
      throw new Error(
        `Insufficient questions in database pool across all subjects. Required: ${count}, Available: ${result.length}`,
      )
    }

    return {
      questions: result,
      competencyId: 'all',
      competencyName: 'All Subjects (Full Mock Test)',
    }
  }

  // 2. SPECIFIC SUBJECT
  const subjectInfo = SUBJECT_MAP[competencyId]
  if (!subjectInfo) {
    throw new Error(
      `Invalid subject "${competencyId}". Please choose a recognized competency area.`,
    )
  }

  let pool = subjectInfo.questions
  if (difficulty && difficulty !== 'Mixed') {
    const filtered = pool.filter((q) => q.difficulty === difficulty)
    if (filtered.length > 0) pool = filtered
  }

  if (pool.length < count) {
    throw new Error(
      `Insufficient questions available for "${subjectInfo.name}". Required: ${count}, Available: ${pool.length}.`,
    )
  }

  const shuffled = shuffleArray(pool)
  const result = shuffled.slice(0, count)

  return {
    questions: result,
    competencyId,
    competencyName: subjectInfo.name,
  }
}
