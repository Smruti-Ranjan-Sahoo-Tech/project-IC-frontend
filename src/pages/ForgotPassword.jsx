import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const forgotPassword = useAuthStore(state => state.forgotPassword)

  const submit = async (e) => {
    e.preventDefault()
    await forgotPassword(email)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 md:p-10 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 text-center">
          Forgot Password
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
          Enter your email and we will send a reset link.
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

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
