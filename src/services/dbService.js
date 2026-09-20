import axios from 'axios'
import { getCompetencyById } from '../data/competencies'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function mapApiError(error) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const message = error.response?.data?.error

    if (message) return message
    if (status === 404) return 'Requested quiz data not found in the database.'
    if (error.code === 'ERR_NETWORK') {
      return 'Network error: Unable to reach the quiz API. Please check your internet connection or try again later.'
    }
  }
  return error?.message || 'An unknown error occurred while fetching quiz data.'
}

export async function generateQuizFromDB({ competencyId, numberOfQuestions, difficulty }) {
  const competency = getCompetencyById(competencyId)
  if (!competency) {
    throw new Error('Invalid competencyId provided. Please select a valid subject for the quiz.')
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
    throw new Error('No valid quiz questions found in the database.')
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