import app from '../src/app.js'
import connectDB from '../src/config/db.js'

// Vercel serverless function entry point. Every request (see backend's
// vercel.json rewrite rule) lands here; we make sure MongoDB is connected
// (reusing the cached connection on warm invocations) and then hand the
// request off to the Express app to route as normal.
export default async function handler(req, res) {
  try {
    await connectDB()
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed.' })
    return
  }

  return app(req, res)
}