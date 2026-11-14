import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

/**
 * Express middleware: Verifies student JWT and attaches studentId to req.
 * Usage: router.get('/protected', requireStudent, handler)
 */
export function requireStudent(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : null

  if (!token) {
    return res.status(401).json({
      error: 'Authentication required. Please log in to continue.',
    })
  }

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not configured on the server.')
    return res.status(500).json({ error: 'Server configuration error.' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)

    if (payload.role !== 'student') {
      return res.status(403).json({
        error: 'Forbidden. This endpoint is for students only.',
      })
    }

    req.studentId = payload.sub
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Your session has expired. Please log in again.',
      })
    }
    return res.status(401).json({
      error: 'Invalid authentication token. Please log in again.',
    })
  }
}
