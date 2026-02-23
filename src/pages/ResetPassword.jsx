import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const resetPassword = useAuthStore(state => state.resetPassword)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/forgotpassword')
    }
  }, [token, navigate])

  const submit = async (e) => {
    e.preventDefault()
    await resetPassword(token, password, navigate)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 md:p-10 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 text-center">
          Reset Password
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
          Enter your new password.
        </p>

        <form onSubmit={submit} className="space-y-5">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New password"
            required
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/40 transition-all duration-300"
          />

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
