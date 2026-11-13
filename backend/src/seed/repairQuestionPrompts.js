import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import mongoose from 'mongoose'
import { fileURLToPath } from 'node:url'
import connectDB from '../config/db.js'
import DatabaseQuestion from '../models/DatabaseQuestion.js'
import CybersecurityQuestion from '../models/CybersecurityQuestion.js'
import OperatingSystemQuestion from '../models/operatingSystemQuestion.js'
import ComputerNetworksQuestion from '../models/ComputerNetworksQuestion.js'
import WebDevelopmentQuestion from '../models/WebDevelopmentQuestion.js'
import ProblemSolvingQuestion from '../models/ProblemSolvingQuestion.js'
import ProgrammingQuestion from '../models/ProgrammingQuestion.js'
import SoftwareEngineeringQuestion from '../models/SoftwareEngineeringQuestion.js'
import AiMlQuestion from '../models/AiMlQuestion.js'
import DsaQuestion from '../models/DsaQuestion.js'
import databaseQuestions from './databaseQuestions.js'
import cybersecurityQuestions from './cybersecurityQuestions.js'
import operatingSystemQuestions from './operatingSystemQuestions.js'
import computerNetworksQuestions from './computerNetworksQuestions.js'
import webDevelopmentQuestions from './webDevelopmentQuestions.js'
import problemSolvingQuestions from './problemSolvingQuestions.js'
import programmingQuestions from './programmingQuestions.js'
import softwareEngineeringQuestions from './softwareEngineeringQuestions.js'
import aiMlQuestions from './aiMlQuestions.js'
import dsaQuestions from './dsaQuestions.js'
import {
  createQuestionIndex,
  findQuestionMatch,
  parseQuestionMarkdown,
  preserveQuestionNumber,
} from './questionMarkdown.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const questionFile = path.resolve(__dirname, '../NSCT/all-subjects-questions.md')
const questionSets = [
  [DatabaseQuestion, databaseQuestions],
  [CybersecurityQuestion, cybersecurityQuestions],
  [OperatingSystemQuestion, operatingSystemQuestions],
  [ComputerNetworksQuestion, computerNetworksQuestions],
  [WebDevelopmentQuestion, webDevelopmentQuestions],
  [ProblemSolvingQuestion, problemSolvingQuestions],
  [ProgrammingQuestion, programmingQuestions],
  [SoftwareEngineeringQuestion, softwareEngineeringQuestions],
  [AiMlQuestion, aiMlQuestions],
  [DsaQuestion, dsaQuestions],
]

async function repairQuestionPrompts() {
  await connectDB()
  if (mongoose.connection.readyState !== 1) {
    throw new Error('MongoDB is unavailable; no question documents were changed.')
  }

  const markdown = await fs.readFile(questionFile, 'utf8')
  const sourceQuestions = parseQuestionMarkdown(markdown)
  const questionIndex = createQuestionIndex(sourceQuestions)
  const totals = { scanned: 0, updated: 0, inserted: 0, ambiguous: 0 }

  for (const [QuestionModel, seedQuestions] of questionSets) {
    const documents = await QuestionModel.find({})
      .select('_id question options topic correctAnswer explanation')
      .lean()
    const operations = []
    const sourceQuestionKeys = new Set()

    for (const document of documents) {
      totals.scanned += 1
      const { candidate, ambiguous } = findQuestionMatch(
        document.question,
        document.options,
        questionIndex,
        document.topic,
        {
          correctAnswer: document.correctAnswer,
          explanation: document.explanation,
        },
      )

      if (ambiguous) {
        totals.ambiguous += 1
        continue
      }
      if (!candidate) continue
      sourceQuestionKeys.add(candidate.question)

      const question = preserveQuestionNumber(document.question, candidate.question)
      if (question === document.question) continue

      operations.push({
        updateOne: {
          filter: { _id: document._id },
          update: { $set: { question } },
        },
      })
    }

    const missingQuestions = []
    for (const seedQuestion of seedQuestions) {
      const { candidate } = findQuestionMatch(
        seedQuestion.question,
        seedQuestion.options,
        questionIndex,
        seedQuestion.topic,
        {
          correctAnswer: seedQuestion.correctAnswer,
          explanation: seedQuestion.explanation,
        },
      )
      if (!candidate || sourceQuestionKeys.has(candidate.question)) continue

      sourceQuestionKeys.add(candidate.question)
      missingQuestions.push({
        ...seedQuestion,
        question: preserveQuestionNumber(seedQuestion.question, candidate.question),
      })
    }

    for (let offset = 0; offset < operations.length; offset += 500) {
      await QuestionModel.bulkWrite(operations.slice(offset, offset + 500), {
        ordered: false,
      })
    }

    if (missingQuestions.length > 0) {
      await QuestionModel.insertMany(missingQuestions, { ordered: false })
    }

    totals.updated += operations.length
    totals.inserted += missingQuestions.length
    console.log(
      `${QuestionModel.modelName}: ${operations.length} prompt(s) repaired; ${missingQuestions.length} missing question(s) added.`,
    )
  }

  console.log(
    `Question bank repair complete. Scanned ${totals.scanned}; updated ${totals.updated}; added ${totals.inserted}; skipped ${totals.ambiguous} ambiguous match(es).`,
  )
}

repairQuestionPrompts()
  .catch((error) => {
    console.error('Question prompt repair failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
