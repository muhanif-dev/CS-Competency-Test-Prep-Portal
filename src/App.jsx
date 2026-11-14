import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { QuizProvider } from './context/QuizContext'
import About from './pages/About'
import AdminRoute from './pages/AdminRoute'
import AIQuiz from './pages/AIQuiz'
import CompetencyDetail from './pages/CompetencyDetail'
import DBQuiz from './pages/DBQuiz'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import LiveQuiz from './pages/LiveQuiz'
import PracticeSetup from './pages/PracticeSetup'
import Projects from './pages/Projects'
import QuizPage from './pages/Quiz'
import QuizSetup from './pages/QuizSetup'
import Result from './pages/Result'
import StudentDashboard from './pages/StudentDashboard'
import StudentLogin from './pages/StudentLogin'
import StudentRegister from './pages/StudentRegister'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="competencies" element={<Navigate to="/" replace />} />
              <Route path="competencies/:competencyId" element={<CompetencyDetail />} />
              <Route path="live-quiz" element={<LiveQuiz />} />

              {/* Admin — no nav link; self-manages auth internally */}
              <Route path="admin" element={<AdminRoute />} />
              <Route path="admin/live-quiz" element={<AdminRoute />} />

              {/* Quiz flows */}
              <Route path="quiz/setup" element={<QuizSetup />} />
              <Route path="practice/setup" element={<PracticeSetup />} />
              <Route path="quiz/ai" element={<AIQuiz />} />
              <Route path="quiz/db" element={<DBQuiz />} />
              <Route path="quiz" element={<QuizPage />} />
              <Route path="result" element={<Result />} />

              {/* Public pages */}
              <Route path="projects" element={<Projects />} />
              <Route path="about" element={<About />} />
              <Route path="leaderboard" element={<Leaderboard />} />

              {/* Auth pages */}
              <Route path="login" element={<StudentLogin />} />
              <Route path="register" element={<StudentRegister />} />

              {/* Protected student pages */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
