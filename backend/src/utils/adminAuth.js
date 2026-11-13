import crypto from 'crypto'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET

function assertAdminConfiguration() {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !ADMIN_JWT_SECRET) {
    throw new Error(
      'ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_JWT_SECRET must be configured.',
    )
  }
}

/**
 * Secure constant-time comparison of admin credentials.
 */
export function verifyAdminCredentials(username, password) {
  assertAdminConfiguration()
  if (!username || !password) return false

  const userBuf = Buffer.from(String(username))
  const expectedUserBuf = Buffer.from(ADMIN_USERNAME)
  const passBuf = Buffer.from(String(password))
  const expectedPassBuf = Buffer.from(ADMIN_PASSWORD)

  const userMatch =
    userBuf.length === expectedUserBuf.length &&
    crypto.timingSafeEqual(userBuf, expectedUserBuf)

  const passMatch =
    passBuf.length === expectedPassBuf.length &&
    crypto.timingSafeEqual(passBuf, expectedPassBuf)

  return userMatch && passMatch
}

/**
 * Signs an HMAC-SHA256 bearer token for authenticated admin sessions.
 */
export function signAdminToken(extra = {}) {
  assertAdminConfiguration()
  const payload = {
    ...extra,
    sub: ADMIN_USERNAME,
    role: 'admin',
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto
    .createHmac('sha256', ADMIN_JWT_SECRET)
    .update(encodedPayload)
    .digest('base64url')

  return `${encodedPayload}.${signature}`
}

/**
 * Verifies and decodes an HMAC-SHA256 bearer token.
 */
export function verifyAdminToken(token) {
  assertAdminConfiguration()
  if (!token || typeof token !== 'string') return null

  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [encodedPayload, signature] = parts
  const expectedSignature = crypto
    .createHmac('sha256', ADMIN_JWT_SECRET)
    .update(encodedPayload)
    .digest('base64url')

  const sigBuf = Buffer.from(signature)
  const expSigBuf = Buffer.from(expectedSignature)

  if (sigBuf.length !== expSigBuf.length) return null
  if (!crypto.timingSafeEqual(sigBuf, expSigBuf)) return null

  try {
    const data = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'))
    if (!data.exp || data.exp < Date.now()) return null
    return data
  } catch {
    return null
  }
}

/**
 * Express middleware to enforce admin authentication.
 */
export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : null

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized. Admin authentication token is required.',
    })
  }

  const payload = verifyAdminToken(token)
  if (!payload) {
    return res.status(403).json({
      error: 'Forbidden. Invalid or expired admin credentials.',
    })
  }

  req.admin = payload
  next()
}
