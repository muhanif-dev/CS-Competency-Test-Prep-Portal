import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'cs-prep-quiz-settings'
const RESULT_KEY = 'cs-prep-last-result'
const HISTORY_KEY = 'cs-prep-question-history'
const HISTORY_LIMIT_PER_TOPIC = 40

const defaultSettings = {
  competencyId: '',
  topicId: '',
  questionCount: 10,
  difficulty: 'Medium',
  quizMode: 'ai', // 'ai' | 'db'
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultSettings }
    return { ...defaultSettings, ...JSON.parse(raw) }
  } catch {
    return { ...defaultSettings }
  }
}

const QuizContext = createContext(null)

export function QuizProvider({ children }) {
  const [settings, setSettingsState] = useState(loadSettings)
  const [questions, setQuestions] = useState([])
  const [quizMeta, setQuizMeta] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [revealed, setRevealed] = useState({})
  const [completed, setCompleted] = useState(false)
  const [generationToken, setGenerationToken] = useState(0)

  const setSettings = useCallback((partial) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...partial }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const getQuestionHistory = useCallback((topicId) => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY)
      const all = raw ? JSON.parse(raw) : {}
      return all[topicId] || []
    } catch {
      return []
    }
  }, [])

  const recordQuestionHistory = useCallback((topicId, questionTexts) => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY)
      const all = raw ? JSON.parse(raw) : {}
      const existing = all[topicId] || []
      const merged = [...existing, ...questionTexts].slice(-HISTORY_LIMIT_PER_TOPIC)
      all[topicId] = merged
      localStorage.setItem(HISTORY_KEY, JSON.stringify(all))
    } catch {
      // ignore storage errors
    }
  }, [])

  const resetQuizSession = useCallback(() => {
    setQuestions([])
    setQuizMeta(null)
    setCurrentIndex(0)
    setAnswers({})
    setRevealed({})
    setCompleted(false)
  }, [])

  const startNewQuiz = useCallback((payload) => {
    setQuestions(payload.questions)
    setQuizMeta(payload.meta)
    setCurrentIndex(0)
    setAnswers({})
    setRevealed({})
    setCompleted(false)
    setGenerationToken((t) => t + 1)
  }, [])

  const selectAnswer = useCallback((questionId, optionId) => {
    setAnswers((prev) => {
      if (prev[questionId] !== undefined) return prev
      return { ...prev, [questionId]: optionId }
    })
    setRevealed((prev) => {
      if (prev[questionId]) return prev
      return { ...prev, [questionId]: true }
    })
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((i) => {
      const next = i + 1
      if (next >= questions.length) {
        setCompleted(true)
        return i
      }
      return next
    })
  }, [questions.length])

  const retrySameQuiz = useCallback(() => {
    setCurrentIndex(0)
    setAnswers({})
    setRevealed({})
    setCompleted(false)
  }, [])

  const scoreSummary = useMemo(() => {
    let correct = 0
    let wrong = 0
    let unattempted = 0

    questions.forEach((q) => {
      const chosen = answers[q.id]
      if (chosen === undefined) {
        unattempted += 1
      } else if (chosen === q.correctAnswer) {
        correct += 1
      } else {
        wrong += 1
      }
    })

    const total = questions.length
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

    return { correct, wrong, unattempted, total, percentage }
  }, [questions, answers])

  const persistResult = useCallback(() => {
    if (!quizMeta || questions.length === 0) return
    const result = {
      ...scoreSummary,
      meta: quizMeta,
      finishedAt: Date.now(),
    }
    localStorage.setItem(RESULT_KEY, JSON.stringify(result))
    return result
  }, [quizMeta, questions.length, scoreSummary])

  const value = useMemo(
    () => ({
      settings,
      setSettings,
      questions,
      quizMeta,
      currentIndex,
      answers,
      revealed,
      completed,
      generationToken,
      resetQuizSession,
      getQuestionHistory,
      recordQuestionHistory,
      startNewQuiz,
      selectAnswer,
      goToNext,
      retrySameQuiz,
      scoreSummary,
      persistResult,
      setCompleted,
      setCurrentIndex,
    }),
    [
      settings,
      setSettings,
      questions,
      quizMeta,
      currentIndex,
      answers,
      revealed,
      completed,
      generationToken,
      resetQuizSession,
      getQuestionHistory,
      recordQuestionHistory,
      startNewQuiz,
      selectAnswer,
      goToNext,
      retrySameQuiz,
      scoreSummary,
      persistResult,
    ],
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export function useQuiz() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider')
  return ctx
}

export function loadLastResult() {
  try {
    const raw = localStorage.getItem(RESULT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
