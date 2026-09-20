import 'dotenv/config'
import app from './src/app.js'
import connectDB from './src/config/db.js'

// Local development entry point only. On Vercel, api/index.js is used
// instead (serverless functions don't call .listen()).
const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ Failed to start server:', err.message)
    process.exit(1)
  })