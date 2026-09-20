import mongoose from 'mongoose'

// Serverless (Vercel) environments reuse the same warm process across
// invocations, so we cache the connection promise on `global` instead of
// reconnecting on every request — this avoids exhausting MongoDB Atlas'
// connection limit. Locally (via `npm run dev`) this simply connects once.
let cached = global._mongooseConn

if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null }
}

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  const uri = process.env.MONGODB_URI

  if (!uri) {
    // Never call process.exit() here: on Vercel that would crash the whole
    // function process for every concurrent request, not just this one.
    throw new Error('MONGODB_URI is missing. Add it in your environment variables.')
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { bufferCommands: false })
      .then((mongooseInstance) => {
        console.log('✅ MongoDB connected')
        return mongooseInstance
      })
      .catch((err) => {
        cached.promise = null
        console.error('❌ MongoDB connection error:', err.message)
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}