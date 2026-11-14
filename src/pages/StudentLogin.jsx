import { AlertCircle, Eye, EyeOff, GraduationCap, LogIn } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function StudentLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = typeof location.state?.from === 'string'
    ? location.state.from
    : (location.state?.from?.pathname
        ? `${location.state.from.pathname}${location.state.from.search || ''}`
        : '/dashboard')
  const redirectNotice = location.state?.message || ''

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.email.trim() || !form.password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    try {
      await login({ email: form.email.trim(), password: form.password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10 sm:px-6 sm:py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ulm-lavender text-ulm-purple">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-ulm-dark">Welcome Back</h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Log in to track your progress and access quizzes.
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-ulm-lavender bg-white p-6 sm:p-8 shadow-xs">
        {redirectNotice && !error && (
          <div className="mb-5 rounded-xl border border-ulm-purple/20 bg-ulm-lavender/50 p-3.5 text-xs sm:text-sm font-medium text-ulm-purple">
            {redirectNotice}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ulm-dark">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-ulm-dark placeholder-gray-400 focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ulm-dark">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm text-ulm-dark placeholder-gray-400 focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-ulm-purple transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-ulm-purple py-3 text-sm font-bold text-white shadow-xs hover:bg-ulm-purple-dark focus:outline-none focus:ring-2 focus:ring-ulm-purple/30 transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <span>Logging in...</span>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" state={{ from }} className="font-semibold text-ulm-purple hover:underline">
            Create one for free
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        Admin?{' '}
        <Link to="/admin" className="text-gray-500 hover:text-ulm-purple hover:underline">
          Go to Admin Login
        </Link>
      </p>
    </section>
  )
}
