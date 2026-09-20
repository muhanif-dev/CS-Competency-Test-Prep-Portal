import mongoose from 'mongoose'

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
    throw new Error('MONGODB_URI is missing. Add it in your environment variables.')
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { bufferCommands: false })
      .then((mongooseInstance) => {
        console.log('MongoDB connected')
        return mongooseInstance
      })
      .catch((err) => {
        cached.promise = null
        console.error('MongoDB connection error:', err.message)
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}