import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { QuizProvider } from './context/QuizContext'
import About from './pages/About'
import AIQuiz from './pages/AIQuiz'
import Competencies from './pages/Competencies'
import CompetencyDetail from './pages/CompetencyDetail'
import DBQuiz from './pages/DBQuiz'
import Home from './pages/Home'
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
            <Route path="competencies" element={<Competencies />} />
            <Route path="competencies/:competencyId" element={<CompetencyDetail />} />
            <Route path="quiz/setup" element={<QuizSetup />} />
            <Route path="quiz/ai" element={<AIQuiz />} />
            <Route path="quiz/db" element={<DBQuiz />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="result" element={<Result />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            
          </Route>
        </Routes>
      </QuizProvider>
    </BrowserRouter>
  )
}
