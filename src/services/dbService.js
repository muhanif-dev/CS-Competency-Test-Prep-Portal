import axios from 'axios'
import { getCompetencyById } from '../data/competencies'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function mapApiError(error) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const message = error.response?.data?.error

    if (message) return message
    if (status === 404) return 'Is subject ke liye database mein questions nahi milay.'
    if (error.code === 'ERR_NETWORK') {
      return 'Backend server se connect nahi ho saka. Check karein ke server chal raha hai.'
    }
  }
  return error?.message || 'Database se quiz fetch karte hue error aya.'
}

// Practice flow: poori subject (competencyId) se random questions,
// koi topic select nahi karna hota.
export async function generateQuizFromDB({ competencyId, numberOfQuestions, difficulty }) {
  const competency = getCompetencyById(competencyId)
  if (!competency) {
    throw new Error('Invalid competency area select ki gayi hai.')
  }

  let response
  try {
    response = await axios.get(`${API_BASE_URL}/api/questions/quiz`, {
      params: {
        competencyId,
        count: numberOfQuestions,
        difficulty,
      },
      timeout: 20000,
    })
  } catch (error) {
    throw new Error(mapApiError(error))
  }

  const { questions, meta } = response.data

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('Database se koi valid quiz nahi mil saka.')
  }

  return {
    questions,
    meta: {
      competencyArea: meta.competencyArea || competency.name,
      competencyId,
      numberOfQuestions: questions.length,
      difficulty,
      source: 'database',
      generatedAt: Date.now(),
    },
  }
}