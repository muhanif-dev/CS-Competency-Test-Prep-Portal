import express from 'express'
import cors from 'cors'
import questionsRouter from './routes/questions.routes.js'

// Allowed frontend origins for CORS. Comma-separated list via env var, e.g.
// CLIENT_ORIGIN="http://localhost:5173,https://your-frontend.vercel.app"
// If not set, all origins are allowed (fine for this public, read-only quiz API).
const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

const corsOptions = {
  origin(origin, callback) {
    // No Origin header (curl, server-to-server, some mobile clients) — allow.
    if (!origin) return callback(null, true)
    // No whitelist configured — allow any origin.
    if (allowedOrigins.length === 0) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error(`Origin ${origin} not allowed by CORS`))
  },
}

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/questions', questionsRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' })
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error.' })
})

export default app