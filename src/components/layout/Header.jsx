import { Award, Menu, ShieldCheck, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/live-quiz', label: 'Live Quiz', isLive: true },
  { to: '/practice/setup?competency=all', label: 'Full Mock Test', isSpecial: true },
  { to: '/quiz/setup', label: 'AI Quiz' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About Us' },
  { to: '/admin', label: 'Admin', isAdmin: true },
]

function linkClass({ isActive }) {
  return [
    'rounded-md px-2 lg:px-2.5 py-1.5 lg:py-2 text-xs lg:text-sm font-medium transition-colors whitespace-nowrap',
    isActive
      ? 'bg-ulm-purple text-white shadow-xs'
      : 'text-ulm-dark hover:bg-ulm-lavender hover:text-ulm-purple',
  ].join(' ')
}

export default function Header() {
  const [open, setOpen] = useState(false)

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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <img
            src="/logo.png"
            alt="TestPrepHub Logo"
            className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 object-contain"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ulm-dark sm:text-base tracking-tight">
              CS Competency Portal
            </p>
            <p className="hidden text-xs text-gray-500 sm:block leading-tight">
              TestPrepHub · Test Preparation
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex lg:gap-1.5" aria-label="Main">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => {
                if (item.isLive) {
                  return `inline-flex items-center gap-1.5 rounded-lg px-2.5 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold transition ${
                    isActive
                      ? 'bg-ulm-purple text-white shadow-xs'
                      : 'border border-ulm-purple/30 bg-ulm-lavender/50 text-ulm-purple hover:bg-ulm-purple hover:text-white'
                  }`
                }
                if (item.isSpecial) {
                  return `inline-flex items-center gap-1.5 rounded-lg px-2.5 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold transition ${
                    isActive
                      ? 'bg-ulm-purple text-white shadow-xs'
                      : 'border border-ulm-purple/30 bg-ulm-lavender/40 text-ulm-purple hover:bg-ulm-purple hover:text-white'
                  }`
                }
                if (item.isAdmin) {
                  return `inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-gray-500 hover:text-ulm-purple hover:bg-ulm-lavender/50 transition ${
                    isActive ? 'bg-ulm-lavender text-ulm-purple font-semibold' : ''
                  }`
                }
                return linkClass({ isActive })
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
                  {item.isSpecial && <Award className="h-3.5 w-3.5 lg:h-4 lg:w-4" />}
                  {item.isAdmin && <ShieldCheck className="h-3.5 w-3.5" />}
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex rounded-md p-2 text-ulm-dark hover:bg-ulm-lavender focus:outline-none focus:ring-2 focus:ring-ulm-purple/30 md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-ulm-lavender bg-white px-4 py-3 shadow-lg md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => {
                    if (item.isLive) {
                      return `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                        isActive
                          ? 'bg-ulm-purple text-white'
                          : 'bg-ulm-lavender/50 text-ulm-purple hover:bg-ulm-lavender'
                      }`
                    }
                    if (item.isSpecial) {
                      return `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                        isActive
                          ? 'bg-ulm-purple text-white'
                          : 'bg-ulm-lavender/50 text-ulm-purple hover:bg-ulm-lavender'
                      }`
                    }
                    return [
                      'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-ulm-purple text-white'
                        : 'text-ulm-dark hover:bg-ulm-lavender hover:text-ulm-purple',
                    ].join(' ')
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
                      {item.isSpecial && <Award className="h-4 w-4" />}
                      {item.isAdmin && <ShieldCheck className="h-4 w-4 text-gray-500" />}
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
