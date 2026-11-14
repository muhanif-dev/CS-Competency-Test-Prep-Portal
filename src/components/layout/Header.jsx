import { Award, BarChart3, LogOut, Menu, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/live-quiz', label: 'Live Quiz', isLive: true },
  { to: '/practice/setup?competency=all', label: 'Full Mock Test', isSpecial: true },
  { to: '/quiz/setup', label: 'AI Quiz' },
  { to: '/leaderboard', label: 'Leaderboard', isLeaderboard: true },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About Us' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, student, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  // Close mobile menu on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    if (open) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-ulm-lavender/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:px-6 sm:py-3">
        {/* Brand / Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <img
            src="/logo.png"
            alt="TestPrepHub Logo"
            className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 object-contain"
          />
          <div className="min-w-0">
            <p className="truncate text-sm sm:text-base font-bold text-ulm-dark tracking-tight">
              CS Competency Portal
            </p>
            <p className="hidden text-[11px] text-gray-500 xl:block leading-tight">
              TestPrepHub · Test Preparation
            </p>
          </div>
        </Link>

        {/* Desktop Navigation (visible on lg: 1024px and up) */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-1.5" aria-label="Main">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => {
                if (item.isLive) {
                  return `inline-flex items-center gap-1.5 rounded-lg px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-ulm-purple text-white shadow-xs'
                      : 'border border-ulm-purple/30 bg-ulm-lavender/50 text-ulm-purple hover:bg-ulm-purple hover:text-white'
                  }`
                }
                if (item.isSpecial) {
                  return `inline-flex items-center gap-1.5 rounded-lg px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-ulm-purple text-white shadow-xs'
                      : 'border border-ulm-purple/30 bg-ulm-lavender/40 text-ulm-purple hover:bg-ulm-purple hover:text-white'
                  }`
                }
                if (item.isLeaderboard) {
                  return `inline-flex items-center gap-1.5 rounded-lg px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-ulm-purple text-white shadow-xs'
                      : 'border border-emerald-500/30 bg-emerald-50/60 text-emerald-800 hover:bg-ulm-purple hover:text-white'
                  }`
                }
                return `rounded-lg px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-ulm-purple text-white shadow-xs'
                    : 'text-ulm-dark hover:bg-ulm-lavender hover:text-ulm-purple'
                }`
              }}
              end={item.to === '/'}
            >
              {({ isActive }) => (
                <>
                  {item.isLive && (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                          isActive ? 'bg-emerald-300' : 'bg-rose-400'
                        } opacity-75`}
                      ></span>
                      <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${
                          isActive ? 'bg-emerald-400' : 'bg-rose-600'
                        }`}
                      ></span>
                    </span>
                  )}
                  {item.isLeaderboard && (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                          isActive ? 'bg-emerald-300' : 'bg-emerald-400'
                        } opacity-75`}
                      ></span>
                      <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${
                          isActive ? 'bg-emerald-400' : 'bg-emerald-600'
                        }`}
                      ></span>
                    </span>
                  )}
                  {item.isSpecial && <Award className="h-3.5 w-3.5 xl:h-4 xl:w-4 shrink-0" />}
                  {item.isLeaderboard && <BarChart3 className="h-3.5 w-3.5 xl:h-4 xl:w-4 shrink-0" />}
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}

          {/* Desktop Auth Section */}
          {isAuthenticated ? (
            <div className="ml-1.5 flex items-center gap-1.5 shrink-0">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs xl:text-sm font-semibold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-ulm-purple text-white shadow-xs'
                      : 'border border-ulm-purple/30 bg-ulm-lavender/40 text-ulm-purple hover:bg-ulm-purple hover:text-white'
                  }`
                }
              >
                <User className="h-3.5 w-3.5" />
                <span className="max-w-[70px] xl:max-w-[100px] truncate">
                  {student?.fullName?.split(' ')[0]}
                </span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-lg p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="ml-1.5 flex items-center gap-1.5 shrink-0">
              <NavLink
                to="/login"
                className="rounded-lg px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-ulm-dark hover:bg-ulm-lavender transition whitespace-nowrap"
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="inline-flex items-center rounded-lg bg-ulm-purple px-3 py-1.5 text-xs xl:text-sm font-bold text-white hover:bg-ulm-purple-dark transition shadow-xs whitespace-nowrap"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </nav>

        {/* Mobile/Tablet Menu Button (visible on screens below lg: 1024px) */}
        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-ulm-dark hover:bg-ulm-lavender focus:outline-none focus:ring-2 focus:ring-ulm-purple/30 lg:hidden cursor-pointer"
          aria-expanded={open}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile/Tablet Drawer Menu */}
      {open && (
        <nav
          className="border-t border-ulm-lavender bg-white px-4 py-3.5 shadow-xl lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          aria-label="Mobile Navigation"
        >
          {/* User profile card in mobile drawer if logged in */}
          {isAuthenticated && (
            <div className="mb-3 flex items-center justify-between rounded-xl bg-ulm-lavender/40 p-3 border border-ulm-lavender/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ulm-purple text-white font-bold text-xs">
                  {student?.fullName?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ulm-dark leading-tight">
                    {student?.fullName}
                  </p>
                  <p className="truncate text-xs text-gray-500 mt-0.5">
                    {student?.university}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}

          <ul className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => {
                    if (item.isLive) {
                      return `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                        isActive
                          ? 'bg-ulm-purple text-white shadow-xs'
                          : 'bg-ulm-lavender/50 text-ulm-purple hover:bg-ulm-lavender'
                      }`
                    }
                    if (item.isSpecial) {
                      return `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                        isActive
                          ? 'bg-ulm-purple text-white shadow-xs'
                          : 'bg-ulm-lavender/50 text-ulm-purple hover:bg-ulm-lavender'
                      }`
                    }
                    if (item.isLeaderboard) {
                      return `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                        isActive
                          ? 'bg-ulm-purple text-white shadow-xs'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`
                    }
                    return `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-ulm-purple text-white shadow-xs'
                        : 'text-ulm-dark hover:bg-ulm-lavender hover:text-ulm-purple'
                    }`
                  }}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      {item.isLive && (
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                              isActive ? 'bg-emerald-300' : 'bg-rose-400'
                            } opacity-75`}
                          ></span>
                          <span
                            className={`relative inline-flex rounded-full h-2 w-2 ${
                              isActive ? 'bg-emerald-400' : 'bg-rose-600'
                            }`}
                          ></span>
                        </span>
                      )}
                      {item.isLeaderboard && (
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                              isActive ? 'bg-emerald-300' : 'bg-emerald-400'
                            } opacity-75`}
                          ></span>
                          <span
                            className={`relative inline-flex rounded-full h-2 w-2 ${
                              isActive ? 'bg-emerald-400' : 'bg-emerald-600'
                            }`}
                          ></span>
                        </span>
                      )}
                      {item.isSpecial && <Award className="h-4 w-4 shrink-0" />}
                      {item.isLeaderboard && <BarChart3 className="h-4 w-4 shrink-0" />}
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}

            {/* Mobile Auth actions */}
            <li className="mt-2 border-t border-gray-100 pt-3">
              {isAuthenticated ? (
                <NavLink
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-ulm-purple px-4 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-ulm-purple-dark transition"
                >
                  <User className="h-4 w-4" />
                  <span>Open My Dashboard</span>
                </NavLink>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-xl border border-ulm-purple/30 bg-ulm-lavender/30 px-3 py-2.5 text-sm font-semibold text-ulm-purple hover:bg-ulm-lavender transition"
                  >
                    Log In
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-ulm-purple px-3 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-ulm-purple-dark transition"
                  >
                    Sign Up Free
                  </NavLink>
                </div>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
