import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { useTheme } from '../../context/ThemeContext'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'

const Navbar = ({ mobileMenuOpen, toggleMenu }) => {
  const { isLoggedIn, role, user } = useAuthStore()
  const { isDark, toggleTheme } = useTheme()

  const getInitial = () => {
    return user?.username ? user.username.charAt(0).toUpperCase() : '?'
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm transition-all duration-300 dark:bg-slate-950 dark:border-slate-800">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 gap-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold text-slate-800 hover:text-blue-700 transition-colors duration-300 whitespace-nowrap dark:text-white dark:hover:text-teal-300"
          >
            LC
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 font-medium hover:text-blue-700 transition-colors duration-300 relative group dark:text-slate-300 dark:hover:text-teal-300">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300 dark:bg-teal-300"></span>
            </Link>
            <Link to="/services" className="text-gray-700 font-medium hover:text-blue-700 transition-colors duration-300 relative group dark:text-slate-300 dark:hover:text-teal-300">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300 dark:bg-teal-300"></span>
            </Link>
            <Link to="/about" className="text-gray-700 font-medium hover:text-blue-700 transition-colors duration-300 relative group dark:text-slate-300 dark:hover:text-teal-300">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300 dark:bg-teal-300"></span>
            </Link>
            <Link to="/contact" className="text-gray-700 font-medium hover:text-blue-700 transition-colors duration-300 relative group dark:text-slate-300 dark:hover:text-teal-300">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300 dark:bg-teal-300"></span>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex items-center gap-3 px-3 py-2 rounded-full border border-slate-300 bg-white text-slate-700 hover:border-blue-700 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700 dark:hover:border-teal-300"
          >
            <span className="text-xs font-semibold uppercase tracking-wide">{isDark ? 'Black' : 'White'}</span>
            <span className={`relative inline-flex h-6 w-11 items-center rounded-full border ${
              isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-300 bg-slate-100'
            }`}>
              <span
                className={`inline-block h-5 w-5 rounded-full shadow-sm transition-transform ${
                  isDark ? 'translate-x-5 bg-teal-300' : 'translate-x-1 bg-white'
                }`}
              />
            </span>
          </button>

          {isLoggedIn ? (
            <>
              <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 uppercase tracking-wider border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800">
                {role?.toUpperCase()}
              </span>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg shadow-sm transition-all duration-300 cursor-pointer dark:bg-slate-700">
                {getInitial()}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-slate-700 font-semibold rounded-lg border border-slate-300 hover:border-blue-700 hover:text-blue-700 transition-colors duration-300 dark:text-slate-200 dark:border-slate-700 dark:hover:border-teal-300 dark:hover:text-teal-200">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-300 dark:bg-teal-600 dark:hover:bg-teal-700">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex items-center justify-center w-12 h-10 rounded-full border border-slate-300 bg-white text-slate-700 hover:border-blue-700 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700 dark:hover:border-teal-300"
          >
            <span className={`relative inline-flex h-5 w-9 items-center rounded-full border ${
              isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-300 bg-slate-100'
            }`}>
              <span
                className={`inline-block h-4 w-4 rounded-full shadow-sm transition-transform ${
                  isDark ? 'translate-x-4 bg-teal-300' : 'translate-x-1 bg-white'
                }`}
              />
            </span>
          </button>
          <HamburgerMenu
            isOpen={mobileMenuOpen}
            toggleMenu={toggleMenu}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
