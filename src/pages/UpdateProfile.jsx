import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateProfile = () => {
  const navigate = useNavigate()
  const { user, updateProfile, loading, isInitializing } = useAuthStore()
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    cource: '',
    passoutYear: ''
  })
  const [successMsg, setSuccessMsg] = useState('')

  const courses = ['MERN', 'PYTHON', 'JAVA', 'TESTING']

  // Populate form with user data
  useEffect(() => {
    if (!isInitializing && user) {
      setFormData({
        username: user.username || '',
        phone: user.phone || '',
        cource: user.cource || '',
        passoutYear: user.passoutYear ? new Date(user.passoutYear).toISOString().split('T')[0] : ''
      })
    }

    if (!isInitializing && !user) {
      navigate('/login')
    }
  }, [user, isInitializing, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const submit = async (e) => {
    e.preventDefault()
    
    if (!formData.username || !formData.phone || !formData.cource) {
      toast.error('Please fill all required fields')
      return
    }

    try {
      const payload = {
        ...formData,
        username: formData.username.trim(),
        phone: String(formData.phone).trim(),
        cource: formData.cource.trim(),
        passoutYear: formData.passoutYear || undefined
      }

      await updateProfile(payload)
      setSuccessMsg('Profile updated successfully!')
      setTimeout(() => {
        setSuccessMsg('')
        navigate('/profile')
      }, 2000)
    } catch (error) {
      // error toast is already handled in store
    }
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 flex items-center justify-center p-4">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-200 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 flex items-center justify-center p-4 transition-colors duration-300 overflow-hidden py-10">
      
      {/* Animated Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-1"></div>

      {/* Form Card */}
      <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-2xl p-8 md:p-12 w-full max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          ✏️ Update Profile
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Update your account information
        </p>

        {successMsg && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 rounded-lg">
            <p className="text-green-700 dark:text-green-300 font-semibold text-center">
              ✓ {successMsg}
            </p>
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Course
            </label>
            <select
              name="cource"
              value={formData.cource}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
              required
            >
              <option value="">-- Select Course --</option>
              {courses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Passout Year
            </label>
            <input
              type="date"
              name="passoutYear"
              value={formData.passoutYear}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-300"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Updating...' : '✓ Update Profile'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 py-3 bg-gradient-to-r from-slate-400 to-slate-500 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
