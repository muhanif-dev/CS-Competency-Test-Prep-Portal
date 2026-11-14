import { AlertCircle, CheckCircle2, Eye, EyeOff, GraduationCap, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function StudentRegister() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = typeof location.state?.from === 'string'
    ? location.state.from
    : (location.state?.from?.pathname
        ? `${location.state.from.pathname}${location.state.from.search || ''}`
        : '/dashboard')

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    university: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.fullName.trim() || !form.email.trim() || !form.university.trim() || !form.password) {
      setError('All fields are required.')
      return
    }

    if (form.fullName.trim().length < 2) {
      setError('Full name must be at least 2 characters.')
      return
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    setLoading(true)
    try {
      await register({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        university: form.university.trim(),
        password: form.password,
      })
      setSuccess(true)
      setTimeout(() => navigate(from, { replace: true }), 1500)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section className="mx-auto max-w-md px-4 py-16 sm:px-6 text-center">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-10 shadow-xs">
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-500 mb-4" />
          <h2 className="text-xl font-bold text-green-900">Account Created!</h2>
          <p className="mt-2 text-sm text-green-700">Redirecting to your dashboard...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10 sm:px-6 sm:py-14">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ulm-lavender text-ulm-purple">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-ulm-dark">Create Your Account</h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Join TestPrepHub to track scores and compete on the leaderboard.
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-ulm-lavender bg-white p-6 sm:p-8 shadow-xs">
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
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-ulm-dark">
              Full Name <span className="text-ulm-purple">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              placeholder="e.g. Muhammad Hanif"
              value={form.fullName}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-ulm-dark placeholder-gray-400 focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ulm-dark">
              Email Address <span className="text-ulm-purple">*</span>
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

          {/* University */}
          <div>
            <label htmlFor="university" className="mb-1.5 block text-sm font-semibold text-ulm-dark">
              University Name <span className="text-ulm-purple">*</span>
            </label>
            <input
              id="university"
              name="university"
              type="text"
              required
              placeholder="e.g. University of Lahore"
              value={form.university}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-ulm-dark placeholder-gray-400 focus:border-ulm-purple focus:outline-none focus:ring-2 focus:ring-ulm-purple/20 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ulm-dark">
              Password <span className="text-ulm-purple">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                placeholder="At least 8 characters"
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
            <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters.</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-ulm-purple py-3 text-sm font-bold text-white shadow-xs hover:bg-ulm-purple-dark focus:outline-none focus:ring-2 focus:ring-ulm-purple/30 transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" state={{ from }} className="font-semibold text-ulm-purple hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </section>
  )
}
