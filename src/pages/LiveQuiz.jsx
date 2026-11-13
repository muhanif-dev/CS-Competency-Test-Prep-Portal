import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  Radio,
  RefreshCw,
  User,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ProgressBar from '../components/ProgressBar'
import {
  completeLiveQuiz,
  getLiveQuizStatus,
  startLiveQuiz,
  submitLiveAnswer,
} from '../services/liveQuizService'

const SEMESTER_OPTIONS = [
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7',
  'Semester 8',
]

const SUBJECT_OPTIONS = [
  { id: 'all', name: 'All Subjects (Full Comprehensive Exam)' },
  { id: 'databases', name: 'Databases' },
  { id: 'cyber-security', name: 'Cyber Security' },
  { id: 'operating-systems', name: 'Operating Systems' },
  { id: 'computer-networks', name: 'Computer Networks and Cloud Computing' },
  { id: 'web-development', name: 'Web Development' },
  { id: 'problem-solving-analytical-skills', name: 'Problem Solving and Analytical Skills' },
  { id: 'programming-cpp-java-python', name: 'Programming (C++/Java/Python)' },
  { id: 'software-engineering', name: 'Software Engineering' },
  { id: 'ai-machine-learning-data-analytics', name: 'AI / Machine Learning and Data Analytics' },
  { id: 'data-structures-algorithms', name: 'Data Structures & Algorithms' },
]

const QUESTION_COUNT_OPTIONS = [20, 50, 100]
const QUESTION_TIME_LIMIT = 30 // 30 seconds per question

const SESSION_STORAGE_KEY = 'cs_prep_live_quiz_session'

export default function LiveQuiz() {
  // Session / flow state: 'setup' | 'active' | 'completed'
  const [stage, setStage] = useState('setup')

  // Setup form inputs
  const [studentName, setStudentName] = useState('')
  const [semester, setSemester] = useState('Semester 5')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [questionCount, setQuestionCount] = useState(20)
  const [setupError, setSetupError] = useState('')
  const [isStarting, setIsStarting] = useState(false)

  // Active quiz state
  const [attemptId, setAttemptId] = useState('')
  const [sessionToken, setSessionToken] = useState('')
  const [questions, setQuestions] = useState([])
  const [competencyTitle, setCompetencyTitle] = useState('All Subjects')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')

  // Completion & Announcement state
  const [isAnnounced, setIsAnnounced] = useState(false)
  const [announcedScore, setAnnouncedScore] = useState(null)
  const [statusLoading, setStatusLoading] = useState(false)
  const [completedMeta, setCompletedMeta] = useState(null)

  // Race condition locks and timers
  const timerRef = useRef(null)
  const isSubmittingRef = useRef(false)
  const currentIndexRef = useRef(0)

  // Check announcement status from server
  const checkAnnouncement = useCallback(async (targetId, targetToken) => {
    if (!targetId || !targetToken) return
    setStatusLoading(true)
    try {
      const data = await getLiveQuizStatus(targetId, targetToken)
      setIsAnnounced(Boolean(data.isAnnounced))
      if (data.isAnnounced && data.score) {
        setAnnouncedScore(data.score)
      }
      if (data.studentName) {
        setCompletedMeta({
          studentName: data.studentName,
          semester: data.semester,
          competencyName: data.competencyName,
          questionCount: data.questionCount,
          completedAt: data.completedAt,
        })
      }
    } catch (err) {
      console.error('Failed to check status:', err)
    } finally {
      setStatusLoading(false)
    }
  }, [])

  // Restore session from localStorage if user refreshed during live quiz
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw)
      if (saved.attemptId && saved.sessionToken) {
        if (saved.completed) {
          setAttemptId(saved.attemptId)
          setSessionToken(saved.sessionToken)
          setCompletedMeta({
            studentName: saved.studentName,
            semester: saved.semester,
            competencyName: saved.competencyName,
            questionCount: saved.questionCount,
            completedAt: saved.completedAt,
          })
          setStage('completed')
          checkAnnouncement(saved.attemptId, saved.sessionToken)
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, [checkAnnouncement])

  // Start live quiz
  const handleStartQuiz = async (e) => {
    e.preventDefault()
    setSetupError('')

    const trimmed = studentName.trim()
    if (!trimmed || trimmed.length < 2) {
      setSetupError('Please enter your full name (at least 2 characters).')
      return
    }

    if (!semester) {
      setSetupError('Please select your current academic semester.')
      return
    }

    if (!QUESTION_COUNT_OPTIONS.includes(Number(questionCount))) {
      setSetupError('Please choose 20, 50, or 100 questions.')
      return
    }

    setIsStarting(true)

    try {
      const data = await startLiveQuiz({
        name: trimmed,
        semester,
        questionCount: Number(questionCount),
        competencyId: selectedSubject,
      })

      setAttemptId(data.attemptId)
      setSessionToken(data.sessionToken)
      setQuestions(data.questions)
      setCompetencyTitle(data.competencyName || 'Live Exam')
      setCurrentIndex(0)
      currentIndexRef.current = 0
      setSelectedOption(null)
      setTimeLeft(QUESTION_TIME_LIMIT)
      setSubmissionError('')
      setStage('active')

      // Save session info
      localStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          attemptId: data.attemptId,
          sessionToken: data.sessionToken,
          studentName: data.studentName,
          semester: data.semester,
          competencyName: data.competencyName,
          questionCount: data.questionCount,
          completed: false,
        }),
      )
    } catch (err) {
      setSetupError(err.message || 'Failed to start quiz session. Please try again.')
    } finally {
      setIsStarting(false)
    }
  }

  // Finalize quiz
  const finishQuiz = useCallback(
    async (finalAttemptId, finalSessionToken) => {
      clearInterval(timerRef.current)
      setStage('completed')

      try {
        const res = await completeLiveQuiz(finalAttemptId, {
          sessionToken: finalSessionToken,
        })
        setIsAnnounced(Boolean(res.isAnnounced))
      } catch (err) {
        console.error('Error finalizing quiz:', err)
      }

      setCompletedMeta((prev) => ({
        ...prev,
        studentName,
        semester,
        competencyName: competencyTitle,
        questionCount: questions.length,
        completedAt: new Date().toISOString(),
      }))

      localStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          attemptId: finalAttemptId,
          sessionToken: finalSessionToken,
          studentName,
          semester,
          competencyName: competencyTitle,
          questionCount: questions.length,
          completed: true,
          completedAt: new Date().toISOString(),
        }),
      )
    },
    [competencyTitle, questions.length, semester, studentName],
  )

  // Handle recorded answer or timeout
  const recordAndAdvance = useCallback(
    async (chosenOption, isTimeout = false) => {
      // Race-condition guard: prevent double submission of the same question
      if (isSubmittingRef.current) return
      isSubmittingRef.current = true
      setIsSubmitting(true)
      setSubmissionError('')

      // Immediately stop timer for current question
      clearInterval(timerRef.current)

      const activeIndex = currentIndexRef.current
      const isLast = activeIndex >= questions.length - 1

      if (!isTimeout) {
        setSelectedOption(chosenOption)
      }

      try {
        await submitLiveAnswer(attemptId, {
          sessionToken,
          questionIndex: activeIndex,
          answer: chosenOption || null,
        })
      } catch (err) {
        console.error('Failed to submit answer to server:', err)
        setSubmissionError(
          'Your answer could not be saved. Please select an option again to retry.',
        )
        isSubmittingRef.current = false
        setIsSubmitting(false)
        return
      }

      if (isLast) {
        await finishQuiz(attemptId, sessionToken)
        isSubmittingRef.current = false
        setIsSubmitting(false)
      } else {
        // Smooth transition to next question
        setTimeout(() => {
          const nextIndex = activeIndex + 1
          currentIndexRef.current = nextIndex
          setCurrentIndex(nextIndex)
          setSelectedOption(null)
          setTimeLeft(QUESTION_TIME_LIMIT)
          isSubmittingRef.current = false
          setIsSubmitting(false)
        }, 250)
      }
    },
    [attemptId, finishQuiz, questions.length, sessionToken],
  )

  // Timer loop for active question
  useEffect(() => {
    if (stage !== 'active' || questions.length === 0) return

    clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          // Timeout occurred: automatically advance as unanswered
          recordAndAdvance(null, true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [stage, currentIndex, questions.length, recordAndAdvance])

  // Keyboard shortcut listener for options (1,2,3,4 or A,B,C,D)
  useEffect(() => {
    if (stage !== 'active') return

    function handleKeyDown(e) {
      if (isSubmittingRef.current) return
      const key = e.key.toUpperCase()
      const mapping = {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
      }
      if (mapping[key]) {
        e.preventDefault()
        recordAndAdvance(mapping[key], false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [stage, recordAndAdvance])

  // Periodic polling on completed screen until announced
  useEffect(() => {
    if (stage !== 'completed' || isAnnounced || !attemptId || !sessionToken) {
      return
    }

    const interval = setInterval(() => {
      checkAnnouncement(attemptId, sessionToken)
    }, 12000)

    return () => clearInterval(interval)
  }, [stage, isAnnounced, attemptId, sessionToken, checkAnnouncement])

  // Render current question
  const currentQ = questions[currentIndex]
  const timerPercentage = (timeLeft / QUESTION_TIME_LIMIT) * 100
  const isTimeCritical = timeLeft <= 5
  const isTimeWarning = timeLeft <= 10 && !isTimeCritical

  return (
    <>
      <PageHero
        title="Live Computer Science Competency Quiz"
        subtitle="Timed examination environment with subject-specific selection, server-side scoring, and centralized result announcement."
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* =========================================================================
            STAGE 1: STUDENT REGISTRATION & QUIZ SETUP
           ========================================================================= */}
        {stage === 'setup' && (
          <div className="rounded-2xl border border-ulm-lavender bg-white p-6 sm:p-9 shadow-xs">
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ulm-lavender text-ulm-purple">
                <Radio className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-ulm-dark">
                  Candidate Registration & Exam Setup
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Select your subject, enter candidate details, and choose your preferred question count.
                </p>
              </div>
            </div>

            {setupError && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-800"
              >
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                <p>{setupError}</p>
              </div>
            )}

            <form onSubmit={handleStartQuiz} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="studentName"
                  className="block text-sm font-semibold text-ulm-dark mb-2"
                >
                  Candidate Full Name <span className="text-ulm-purple">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    id="studentName"
                    type="text"
                    required
                    placeholder="e.g. Muhammad Hanif"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm text-ulm-dark placeholder-gray-400 focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 transition"
                  />
                </div>
              </div>

              {/* Semester Selector */}
              <div>
                <label
                  htmlFor="semesterSelect"
                  className="block text-sm font-semibold text-ulm-dark mb-2"
                >
                  Academic Semester <span className="text-ulm-purple">*</span>
                </label>
                <select
                  id="semesterSelect"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 py-3 px-4 text-sm text-ulm-dark focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 transition bg-white"
                >
                  {SEMESTER_OPTIONS.map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Selection (All subjects vs Specific Subject) */}
              <div>
                <label
                  htmlFor="subjectSelect"
                  className="block text-sm font-semibold text-ulm-dark mb-2"
                >
                  Examination Subject <span className="text-ulm-purple">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <select
                    id="subjectSelect"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-sm font-medium text-ulm-dark focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 transition bg-white"
                  >
                    {SUBJECT_OPTIONS.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  {selectedSubject === 'all'
                    ? 'Questions will be balanced and randomly sampled across all 10 computer science subjects.'
                    : `Questions will be exclusively generated for ${
                        SUBJECT_OPTIONS.find((s) => s.id === selectedSubject)?.name
                      }.`}
                </p>
              </div>

              {/* Question Count Selector */}
              <div>
                <label className="block text-sm font-semibold text-ulm-dark mb-2">
                  Number of Questions <span className="text-ulm-purple">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {QUESTION_COUNT_OPTIONS.map((count) => {
                    const isSelected = Number(questionCount) === count
                    return (
                      <button
                        type="button"
                        key={count}
                        onClick={() => setQuestionCount(count)}
                        className={`flex flex-col items-center justify-center rounded-xl border p-3 sm:p-4 text-center transition cursor-pointer ${
                          isSelected
                            ? 'border-ulm-purple bg-ulm-lavender/50 text-ulm-purple font-bold ring-2 ring-ulm-purple/20'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-ulm-purple/40 hover:bg-ulm-lavender/20'
                        }`}
                      >
                        <span className="text-lg sm:text-xl font-extrabold">{count}</span>
                        <span className="text-xs text-gray-500">Questions</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Exam Rules Info Card */}
              <div className="rounded-xl border border-ulm-lavender bg-ulm-lavender/30 p-4 text-xs sm:text-sm text-ulm-dark space-y-1.5">
                <p className="font-bold flex items-center gap-1.5 text-ulm-purple">
                  <Clock className="h-4 w-4" />
                  Live Exam Rules:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-700">
                  <li>You will receive exactly <strong>30 seconds</strong> for each question.</li>
                  <li>Clicking an option records your choice and advances to the next question automatically.</li>
                  <li>If 30 seconds expire without an answer, the question is marked as unanswered and advances.</li>
                  <li>Once submitted, your result will be announced by the examination committee.</li>
                </ul>
              </div>

              {/* Submit / Start Button */}
              <button
                type="submit"
                disabled={isStarting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-ulm-purple py-3.5 px-6 text-sm sm:text-base font-bold text-white shadow-xs hover:bg-ulm-purple-dark focus:outline-none focus:ring-2 focus:ring-ulm-purple/30 transition disabled:opacity-60 cursor-pointer"
              >
                {isStarting ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Preparing Question Paper...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 fill-current" />
                    <span>Start Live Quiz ({questionCount} Qs)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* =========================================================================
            STAGE 2: ACTIVE TIMED QUIZ VIEW (Theme-aligned)
           ========================================================================= */}
        {stage === 'active' && currentQ && (
          <div className="space-y-6">
            {/* Candidate & Timer Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-ulm-lavender bg-white p-4 sm:px-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ulm-lavender text-ulm-purple font-bold text-sm">
                  {studentName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base text-ulm-dark leading-tight">
                    {studentName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {semester} · Question {currentIndex + 1} of {questions.length}
                  </p>
                </div>
              </div>

              {/* 30-Second Countdown Timer */}
              <div
                className={`flex items-center gap-2.5 self-start sm:self-auto rounded-xl px-4 py-2 border font-mono font-bold transition-all ${
                  isTimeCritical
                    ? 'border-red-400 bg-red-100 text-red-700 animate-pulse ring-2 ring-red-300'
                    : isTimeWarning
                      ? 'border-amber-400 bg-amber-50 text-amber-700'
                      : 'border-ulm-purple/30 bg-ulm-lavender/40 text-ulm-purple'
                }`}
                aria-live="polite"
              >
                <Clock className="h-5 w-5 shrink-0" />
                <span className="text-xl sm:text-2xl leading-none">
                  {String(timeLeft).padStart(2, '0')}s
                </span>
                <span className="text-xs font-sans font-normal uppercase tracking-wider text-gray-500">
                  Left
                </span>
              </div>
            </div>

            {/* Linear Progress Bar for entire quiz */}
            <ProgressBar current={currentIndex + 1} total={questions.length} />

            {/* Timer Progress Ring / Bar for current 30s question */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 linear ${
                  isTimeCritical ? 'bg-red-500' : isTimeWarning ? 'bg-amber-500' : 'bg-ulm-purple'
                }`}
                style={{ width: `${timerPercentage}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="rounded-2xl border border-ulm-lavender bg-white p-5 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-4">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-ulm-purple">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                {currentQ.competencyName && (
                  <span className="inline-flex items-center rounded-full bg-ulm-lavender/70 px-3 py-1 text-xs font-semibold text-ulm-purple border border-ulm-purple/20">
                    {currentQ.competencyName}
                  </span>
                )}
              </div>

              <h2 className="whitespace-pre-wrap text-base sm:text-lg lg:text-xl font-bold leading-relaxed text-ulm-dark break-words">
                {currentQ.question}
              </h2>

              {submissionError && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800 sm:text-sm"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <p>{submissionError}</p>
                </div>
              )}

              {/* 4 Options — Styled according to website theme */}
              <div className="mt-6 space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => recordAndAdvance(opt.id, false)}
                      className={`group flex w-full items-start gap-3 rounded-xl border p-3.5 sm:px-4 sm:py-4 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 focus:ring-offset-1 min-h-[50px] cursor-pointer ${
                        isSelected
                          ? 'border-ulm-purple bg-ulm-lavender/50 ring-2 ring-ulm-purple/20 text-ulm-dark'
                          : 'border-gray-200 bg-white hover:border-ulm-purple/40 hover:bg-ulm-lavender/20 text-ulm-dark'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                          isSelected
                            ? 'bg-ulm-purple text-white shadow-xs'
                            : 'bg-ulm-purple/10 text-ulm-purple group-hover:bg-ulm-lavender'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="flex-1 pt-0.5 text-xs sm:text-sm leading-relaxed text-ulm-dark break-words">
                        {opt.text}
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="mt-5 text-right text-xs text-gray-400">
                Tip: Press 1-4 or A-D on your keyboard to answer instantly.
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 3: COMPLETION & RESULT ANNOUNCEMENT VIEW
           ========================================================================= */}
        {stage === 'completed' && (
          <div className="space-y-6">
            {/* Primary Status Card */}
            <div className="rounded-2xl border border-ulm-lavender bg-white p-6 sm:p-9 text-center shadow-xs">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ulm-lavender text-ulm-purple mb-4">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-ulm-dark">
                Live Quiz Submitted
              </h2>

              {/* Prominent Result Status Message */}
              <div className="my-6 inline-flex items-center justify-center">
                {isAnnounced ? (
                  <div className="flex items-center gap-2.5 rounded-full bg-green-50 px-6 py-3 text-green-900 border border-green-300 font-bold text-base sm:text-lg shadow-xs">
                    <Award className="h-6 w-6 text-green-600" />
                    <span>Result announced</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 rounded-full bg-amber-50 px-6 py-3 text-amber-900 border border-amber-300 font-bold text-base sm:text-lg shadow-xs">
                    <Clock className="h-6 w-6 text-amber-700 animate-spin" />
                    <span>Result will be announced.</span>
                  </div>
                )}
              </div>

              <p className="mx-auto max-w-lg text-xs sm:text-sm text-gray-600 leading-relaxed">
                {isAnnounced
                  ? 'The examination administration has finalized and announced your score. Review your performance breakdown below.'
                  : 'Your live examination answers have been securely recorded on the server. The academic committee will review and officially publish the results.'}
              </p>

              {/* Student Metadata Overview */}
              <div className="mt-6 mx-auto max-w-md rounded-xl border border-gray-200 bg-gray-50/70 p-4 text-xs sm:text-sm text-left space-y-2">
                <div className="flex justify-between border-b border-gray-200/80 pb-1.5">
                  <span className="text-gray-500">Candidate Name:</span>
                  <span className="font-semibold text-ulm-dark">
                    {completedMeta?.studentName || studentName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/80 pb-1.5">
                  <span className="text-gray-500">Semester:</span>
                  <span className="font-semibold text-ulm-dark">
                    {completedMeta?.semester || semester}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/80 pb-1.5">
                  <span className="text-gray-500">Subject:</span>
                  <span className="font-semibold text-ulm-purple">
                    {completedMeta?.competencyName || competencyTitle}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/80 pb-1.5">
                  <span className="text-gray-500">Total Questions:</span>
                  <span className="font-semibold text-ulm-dark">
                    {completedMeta?.questionCount || questions.length} Questions
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Submission Timestamp:</span>
                  <span className="font-medium text-gray-700">
                    {completedMeta?.completedAt
                      ? new Date(completedMeta.completedAt).toLocaleTimeString()
                      : 'Just now'}
                  </span>
                </div>
              </div>

              {/* Score Breakdown (Revealed only when Announced by Admin) */}
              {isAnnounced && announcedScore && (
                <div className="mt-8 rounded-2xl border border-green-200 bg-green-50/60 p-6 text-left">
                  <h3 className="text-base sm:text-lg font-bold text-green-950 flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-green-600" />
                    Official Score Breakdown
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-xl bg-white p-3 border border-green-200 text-center">
                      <p className="text-xs text-gray-500">Attempted</p>
                      <p className="text-xl font-bold text-ulm-dark">
                        {announcedScore.attempted}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-3 border border-green-200 text-center">
                      <p className="text-xs text-gray-500">Unanswered</p>
                      <p className="text-xl font-bold text-amber-700">
                        {announcedScore.unanswered}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-3 border border-green-200 text-center">
                      <p className="text-xs text-gray-500">Correct</p>
                      <p className="text-xl font-bold text-green-600">
                        {announcedScore.correct}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-3 border border-green-200 text-center">
                      <p className="text-xs text-gray-500">Incorrect</p>
                      <p className="text-xl font-bold text-red-600">
                        {announcedScore.incorrect}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-white p-4 border border-green-300">
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Aggregate Score</p>
                      <p className="text-2xl font-extrabold text-green-700">
                        {announcedScore.percentage}%
                      </p>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                      {announcedScore.percentage >= 50 ? 'PASSED' : 'NEEDS REVISION'}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                {!isAnnounced && (
                  <button
                    type="button"
                    disabled={statusLoading}
                    onClick={() => checkAnnouncement(attemptId, sessionToken)}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-ulm-purple px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-ulm-purple-dark transition disabled:opacity-60 cursor-pointer"
                  >
                    <RefreshCw className={`h-4 w-4 ${statusLoading ? 'animate-spin' : ''}`} />
                    <span>Check Announcement Status</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem(SESSION_STORAGE_KEY)
                    setStage('setup')
                    setStudentName('')
                    setIsAnnounced(false)
                    setAnnouncedScore(null)
                  }}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-ulm-dark hover:bg-gray-50 transition cursor-pointer"
                >
                  <span>Start New Live Quiz</span>
                </button>

                <Link
                  to="/"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-transparent px-4 py-3 text-sm font-semibold text-ulm-purple hover:underline"
                >
                  <span>Back to Home</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
