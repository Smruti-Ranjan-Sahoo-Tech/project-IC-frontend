import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useAuthStore(state => state.login)
  const loading = useAuthStore(state => state.loading)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    await login({ email, password }, navigate)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 md:p-10 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 text-center">
          Login
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
          Welcome back to <span className="text-amber-500 font-semibold">Project-IC</span>
        </p>

        <form onSubmit={submit} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/40 transition-all duration-300"
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/40 transition-all duration-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="space-y-4 mt-8">
          <Link
            to="/forgotpassword"
            className="block text-center text-teal-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-200 font-semibold transition-colors duration-300"
          >
            Forgot Password?
          </Link>
          <p className="text-center text-slate-700 dark:text-slate-300">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-500 hover:text-amber-600 font-semibold transition-colors duration-300">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
