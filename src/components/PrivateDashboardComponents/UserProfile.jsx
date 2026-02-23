import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

const UserProfile = () => {
  const navigate = useNavigate()
  const { user, role, updateProfile, loading } = useAuthStore()
  const courses = ['MERN', 'PYTHON', 'JAVA', 'TESTING']
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cource: user?.cource || ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        cource: user.cource || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        username: formData.username.trim(),
        phone: String(formData.phone || '').trim(),
        cource: String(formData.cource || '').trim()
      }
      await updateProfile(payload)
      setIsEditing(false)
    } catch (error) {
      // errors handled in store
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">View and manage your profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-teal-100 dark:border-slate-800">
            <div className="h-40 bg-gradient-to-r from-teal-700 via-teal-600 to-amber-500 px-6 py-5 flex items-start justify-between">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-teal-100 font-semibold">Profile</p>
                <p className="text-sm text-teal-50/90 mt-1">Personal account overview</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{user?.username || 'N/A'}</h2>
                <span className="inline-flex mt-2 items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {role || 'user'}
                </span>
              </div>
            </div>

            <div className="px-6 py-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-amber-500 flex items-center justify-center text-white text-3xl font-bold -mt-14 sm:-mt-16 border-4 border-white dark:border-slate-800 shadow-lg">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.email || 'N/A'}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.phone || 'N/A'}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Course</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.cource || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-600 text-slate-900 dark:text-white rounded-lg opacity-60 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Course</label>
                    <select
                      name="cource"
                      value={formData.cource}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                    >
                      <option value="">Select course</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Updating...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-6 py-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 text-slate-900 dark:text-white font-semibold rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-6 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-teal-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Security</h3>
            <button
              type="button"
              onClick={() => navigate('/change-password')}
              className="w-full mb-3 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-lg"
            >
              Change Password
            </button>
            <button className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg">
              View Activity
            </button>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-green-900 dark:text-green-200 mb-3">Account Info</h3>
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>Role:</strong> Learner
            </p>
            <p className="text-sm text-green-800 dark:text-green-300 mt-2">
              <strong>Member Since:</strong> {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
