import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <div className="text-2xl font-extrabold text-slate-800 dark:text-white transition-colors duration-300">LC</div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
            Learning Club for developers.
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm font-semibold">
          <Link to="/" className="text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300 transition-colors duration-300">
            Home
          </Link>
          <Link to="/services" className="text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300 transition-colors duration-300">
            Services
          </Link>
          <Link to="/about" className="text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300 transition-colors duration-300">
            About
          </Link>
          <Link to="/contact" className="text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-300 transition-colors duration-300">
            Contact
          </Link>
        </nav>

        <div className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
          © {new Date().getFullYear()} Learning Club. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
