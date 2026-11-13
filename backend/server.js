import 'dotenv/config'
import app from './src/app.js'
import connectDB from './src/config/db.js'

const PORT = process.env.PORT || 5000

// Start HTTP server immediately so frontend can ALWAYS connect without nodemon crashing
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})

// Attempt MongoDB Atlas connection in background
connectDB()
  .then((conn) => {
    if (conn) {
      console.log('✅ Database connected and ready')
    }
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB Atlas connection error (non-fatal):', err.message)
  })
