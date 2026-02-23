import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LogOut, Trash2, Edit2, Lock } from 'lucide-react'
import { toast } from 'react-toastify'

const Profile = () => {
  const { user, logout, deleteProfile, isInitializing, changePassword, loading } = useAuthStore()
  const navigate = useNavigate()

  // State for password change form
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordErrors, setPasswordErrors] = useState({})

  useEffect(() => {
    if (!isInitializing && !user) {
      navigate('/login')
    }
  }, [user, isInitializing, navigate])

  // Validate password requirements
  const validatePassword = (password) => {
    const errors = {}
    if (password.length < 8) {
      errors.length = 'Password must be at least 8 characters'
    }
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = 'Password must contain at least one uppercase letter'
    }
    if (!/[0-9]/.test(password)) {
      errors.number = 'Password must contain at least one number'
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.special = 'Password must contain at least one special character (!@#$%^&*)'
    }
    return errors
  }

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault()
    const errors = {}

    // Validate inputs
    if (!passwordData.oldPassword.trim()) {
      errors.oldPassword = 'Current password is required'
    }
    if (!passwordData.newPassword.trim()) {
      errors.newPassword = 'New password is required'
    } else {
      const pwErrors = validatePassword(passwordData.newPassword)
      if (Object.keys(pwErrors).length > 0) {
        Object.assign(errors, pwErrors)
      }
    }
    if (!passwordData.confirmPassword.trim()) {
      errors.confirmPassword = 'Please confirm your new password'
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors)
      return
    }

    // Check if new password is same as old password
    if (passwordData.oldPassword === passwordData.newPassword) {
      setPasswordErrors({ newPassword: 'New password must be different from current password' })
      return
    }

    try {
      await changePassword(passwordData.oldPassword, passwordData.newPassword)
      // Clear form and close
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setPasswordErrors({})
      setShowPasswordForm(false)
      toast.success('Password changed successfully!')
    } catch (error) {
      // Error is handled in store
    }
  }

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you absolutely sure? This action cannot be undone.')) {
      await deleteProfile()
      navigate('/')
    }
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            👤 My Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            View and manage your account settings
          </p>
        </div>

        {user && (
          <>
            {/* Profile Information Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700">
              <div className="space-y-6">
                
                {/* Username */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Username
                  </label>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                    {user.username}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Email
                  </label>
                  <p className="text-lg text-slate-900 dark:text-white mt-2">
                    {user.email}
                  </p>
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Role
                  </label>
                  <span className="inline-block mt-2 px-4 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-600 dark:to-blue-700 text-blue-700 dark:text-blue-100 uppercase">
                    {user.role}
                  </span>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Phone
                  </label>
                  <p className="text-lg text-slate-900 dark:text-white mt-2">
                    {user.phone || 'Not provided'}
                  </p>
                </div>

                {/* Course */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Course
                  </label>
                  <p className="text-lg text-slate-900 dark:text-white mt-2">
                    {user.cource || 'Not specified'}
                  </p>
                </div>

                {/* Passout Year */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Passout Year
                  </label>
                  <p className="text-lg text-slate-900 dark:text-white mt-2">
                    {user.passoutYear ? new Date(user.passoutYear).getFullYear() : 'Not specified'}
                  </p>
                </div>

                {/* Account Status */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    Account Status
                  </label>
                  <span className={`inline-block mt-2 px-4 py-1.5 text-sm font-bold rounded-full uppercase ${
                    user.isBlocked
                      ? 'bg-red-200 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      : 'bg-green-200 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Change Password Form */}
            {showPasswordForm && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-6 border border-slate-200 dark:border-slate-700 transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Lock size={24} />
                  Change Password
                </h3>
                
                <form onSubmit={handleChangePassword} className="space-y-5">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Current Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="Enter your current password"
                      className={`w-full px-4 py-3 border ${
                        passwordErrors.oldPassword ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 ${
                        passwordErrors.oldPassword ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                      } transition-all duration-300`}
                    />
                    {passwordErrors.oldPassword && (
                      <p className="text-red-500 text-sm mt-1">{passwordErrors.oldPassword}</p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="Enter new password"
                      className={`w-full px-4 py-3 border ${
                        passwordErrors.length || passwordErrors.uppercase || passwordErrors.number || passwordErrors.special || passwordErrors.newPassword 
                          ? 'border-red-500' 
                          : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 ${
                        passwordErrors.length || passwordErrors.uppercase || passwordErrors.number || passwordErrors.special || passwordErrors.newPassword
                          ? 'focus:ring-red-500' 
                          : 'focus:ring-blue-500'
                      } transition-all duration-300`}
                    />
                    {(passwordErrors.length || passwordErrors.uppercase || passwordErrors.number || passwordErrors.special || passwordErrors.newPassword) && (
                      <div className="text-red-500 text-sm mt-1 space-y-1">
                        {passwordErrors.length && <p>• {passwordErrors.length}</p>}
                        {passwordErrors.uppercase && <p>• {passwordErrors.uppercase}</p>}
                        {passwordErrors.number && <p>• {passwordErrors.number}</p>}
                        {passwordErrors.special && <p>• {passwordErrors.special}</p>}
                        {passwordErrors.newPassword && <p>• {passwordErrors.newPassword}</p>}
                      </div>
                    )}
                    {passwordData.newPassword && !passwordErrors.newPassword && !passwordErrors.length && !passwordErrors.uppercase && !passwordErrors.number && !passwordErrors.special && (
                      <p className="text-green-500 text-sm mt-1">✓ Password is strong</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Confirm New Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="Confirm new password"
                      className={`w-full px-4 py-3 border ${
                        passwordErrors.confirmPassword ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 ${
                        passwordErrors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                      } transition-all duration-300`}
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmPassword}</p>
                    )}
                    {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword && !passwordErrors.confirmPassword && (
                      <p className="text-green-500 text-sm mt-1">✓ Passwords match</p>
                    )}
                  </div>

                  {/* Password Requirements Info */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Password Requirements:</p>
                    <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                      <li>• At least 8 characters</li>
                      <li>• One uppercase letter (A-Z)</li>
                      <li>• One number (0-9)</li>
                      <li>• One special character (!@#$%^&*)</li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed"
                    >
                      {loading ? '⏳ Updating...' : '✓ Update Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false)
                        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
                        setPasswordErrors({})
                      }}
                      className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Edit Profile Button */}
              <button
                onClick={() => navigate('/update-profile')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <Edit2 size={20} />
                Edit Profile
              </button>

              {/* Change Password Button */}
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Lock size={20} />
                {showPasswordForm ? 'Cancel' : 'Change Password'}
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <LogOut size={20} />
                Logout
              </button>

              {/* Delete Account Button */}
              <button
                onClick={handleDeleteProfile}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <Trash2 size={20} />
                Delete Account
              </button>
            </div>

            {/* Warning */}
            <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-700 dark:text-red-300">
                ⚠️ <strong>Warning:</strong> Deleting your account is permanent and cannot be recovered. All your data will be permanently deleted.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
