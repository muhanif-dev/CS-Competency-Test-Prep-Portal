import mongoose from 'mongoose'

let cached = global._mongooseConn

if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null }
}

export default async function connectDB() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn
  }

  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.warn('⚠️ MONGODB_URI is not set. Running in fallback question store mode.')
    return null
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 4000, // 4-second timeout to avoid hanging when IP is not whitelisted
      })
      .then((mongooseInstance) => {
        console.log('✅ MongoDB Atlas connected successfully!')
        return mongooseInstance
      })
      .catch((err) => {
        cached.promise = null
        console.warn('⚠️ MongoDB Atlas connection error (non-fatal):', err.message)
        console.warn('⚡ Fallback data engine enabled: questions and live quiz will function seamlessly using local seed data store.')
        return null
      })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch {
    return null
  }
}
