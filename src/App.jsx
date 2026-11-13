import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { QuizProvider } from './context/QuizContext'
import About from './pages/About'
import AdminLiveQuiz from './pages/AdminLiveQuiz'
import AIQuiz from './pages/AIQuiz'
import CompetencyDetail from './pages/CompetencyDetail'
import DBQuiz from './pages/DBQuiz'
import Home from './pages/Home'
import LiveQuiz from './pages/LiveQuiz'
import PracticeSetup from './pages/PracticeSetup'
import Projects from './pages/Projects'
import QuizPage from './pages/Quiz'
import QuizSetup from './pages/QuizSetup'
import Result from './pages/Result'

export default function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="competencies" element={<Navigate to="/" replace />} />
            <Route path="competencies/:competencyId" element={<CompetencyDetail />} />
            <Route path="live-quiz" element={<LiveQuiz />} />
            <Route path="admin" element={<AdminLiveQuiz />} />
            <Route path="admin/live-quiz" element={<AdminLiveQuiz />} />
            <Route path="quiz/setup" element={<QuizSetup />} />
            <Route path="practice/setup" element={<PracticeSetup />} />
            <Route path="quiz/ai" element={<AIQuiz />} />
            <Route path="quiz/db" element={<DBQuiz />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="result" element={<Result />} />
            <Route path="projects" element={<Projects />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </QuizProvider>
    </BrowserRouter>
  )
}
