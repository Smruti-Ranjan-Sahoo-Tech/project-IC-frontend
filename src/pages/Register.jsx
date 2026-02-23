import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    cource: '',
    passoutYear: '',
    role: 'user'
  })

  const register = useAuthStore(state => state.register)
  const loading = useAuthStore(state => state.loading)
  const navigate = useNavigate()

  const courses = ['MERN', 'JAVA', 'PYTHON', 'TESTING']
  const currentYear = new Date().getFullYear()
  const passoutYears = Array.from({ length: 40 }, (_, i) => (currentYear + 5 - i).toString())

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const selectRole = (role) => {
    setFormData(prev => ({
      ...prev,
      role,
      password: role === 'admin' ? '' : prev.password,
      passoutYear: role === 'admin' ? '' : prev.passoutYear
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = { ...formData }
    if (formData.role === 'admin') {
      delete submitData.password
      delete submitData.passoutYear
    } else if (formData.passoutYear) {
      submitData.passoutYear = `${formData.passoutYear}-01-01`
    }

    await register(submitData, navigate)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 md:p-10 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 text-center">
          Create Account
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
          Join <span className="text-amber-500 font-semibold">Project-IC</span>
        </p>

        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => selectRole('user')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
              formData.role === 'user'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => selectRole('admin')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
              formData.role === 'admin'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/40 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/40 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/40 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Course</label>
            <select
              name="cource"
              value={formData.cource}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/40 transition-all duration-300"
            >
              <option value="">Select Course</option>
              {courses.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {formData.role === 'user' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/40 transition-all duration-300"
              />
            </div>
          )}

          {formData.role === 'user' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Passout Year</label>
              <select
                name="passoutYear"
                value={formData.passoutYear}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/40 transition-all duration-300"
              >
                <option value="">Select Passout Year</option>
                {passoutYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Registering...' : `Register as ${formData.role}`}
          </button>
        </form>

        <p className="text-center text-slate-700 dark:text-slate-300 mt-6">
          Already have account?
          <Link to="/login" className="text-amber-500 hover:text-amber-600 ml-2 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
