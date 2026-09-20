import app from '../src/app.js'
import connectDB from '../src/config/db.js'

export default async function handler(req, res) {
  try {
    await connectDB()
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed.' })
    return
  }

  return app(req, res)
}