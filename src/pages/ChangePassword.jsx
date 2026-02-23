import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Lock, Eye, EyeOff, Check, X } from 'lucide-react'

const ChangePassword = () => {
  const navigate = useNavigate()
  const { changePassword, loading, user, isInitializing } = useAuthStore()
  
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!isInitializing && !user) {
      navigate('/login')
    }
  }, [user, isInitializing, navigate])

  // Validate password strength in real-time
  useEffect(() => {
    if (newPassword) {
      setPasswordStrength({
        length: newPassword.length >= 8,
        uppercase: /[A-Z]/.test(newPassword),
        number: /[0-9]/.test(newPassword),
        special: /[!@#$%^&*]/.test(newPassword)
      })
    } else {
      setPasswordStrength({
        length: false,
        uppercase: false,
        number: false,
        special: false
      })
    }
  }, [newPassword])

  // Clear error for field when user starts typing
  const handleFieldChange = (field) => {
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate old password
    if (!oldPassword.trim()) {
      newErrors.oldPassword = 'Current password is required'
    }

    // Validate new password
    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required'
    } else {
      if (newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters'
      } else if (!/[A-Z]/.test(newPassword)) {
        newErrors.newPassword = 'Must contain at least one uppercase letter'
      } else if (!/[0-9]/.test(newPassword)) {
        newErrors.newPassword = 'Must contain at least one number'
      } else if (!/[!@#$%^&*]/.test(newPassword)) {
        newErrors.newPassword = 'Must contain at least one special character (!@#$%^&*)'
      }
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Check if passwords are same
    if (oldPassword === newPassword) {
      newErrors.newPassword = 'New password must be different from current password'
    }

    return newErrors
  }

  const submit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await changePassword(oldPassword, newPassword)
      // Clear form
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setErrors({})
      toast.success('Password changed successfully!')
      setTimeout(() => {
        navigate('/profile')
      }, 2000)
    } catch (error) {
      // Error handling is in store (toast.error)
      // But we can also check for specific error messages
      if (error?.response?.status === 401) {
        setErrors({ oldPassword: 'Current password is incorrect' })
      }
    }
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    )
  }

  const isPasswordStrong = passwordStrength.length && passwordStrength.uppercase && passwordStrength.number && passwordStrength.special
  const isPasswordsMatch = newPassword && confirmPassword && newPassword === confirmPassword

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 md:p-10 shadow-lg transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mx-auto mb-6">
            <Lock className="text-indigo-600 dark:text-indigo-400" size={24} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 text-center">
            Change Password
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            Update your account password securely
          </p>

          <form onSubmit={submit} className="space-y-5">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value)
                    handleFieldChange('oldPassword')
                  }}
                  placeholder="Enter current password"
                  className={`w-full px-4 py-3 border ${
                    errors.oldPassword ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  } rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                    errors.oldPassword ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
                  } transition-all duration-300 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X size={14} /> {errors.oldPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                    handleFieldChange('newPassword')
                  }}
                  placeholder="Enter new password"
                  className={`w-full px-4 py-3 border ${
                    errors.newPassword ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  } rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                    errors.newPassword ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
                  } transition-all duration-300 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X size={14} /> {errors.newPassword}
                </p>
              )}

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-2">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Password Requirements:</p>
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center gap-2 ${passwordStrength.length ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                      {passwordStrength.length ? <Check size={14} /> : <X size={14} />}
                      At least 8 characters
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.uppercase ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                      {passwordStrength.uppercase ? <Check size={14} /> : <X size={14} />}
                      One uppercase letter (A-Z)
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.number ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                      {passwordStrength.number ? <Check size={14} /> : <X size={14} />}
                      One number (0-9)
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.special ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                      {passwordStrength.special ? <Check size={14} /> : <X size={14} />}
                      One special character (!@#$%^&*)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    handleFieldChange('confirmPassword')
                  }}
                  placeholder="Confirm new password"
                  className={`w-full px-4 py-3 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  } rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
                  } transition-all duration-300 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <X size={14} /> {errors.confirmPassword}
                </p>
              )}
              {isPasswordsMatch && !errors.confirmPassword && (
                <p className="text-green-600 dark:text-green-400 text-sm mt-1 flex items-center gap-1">
                  <Check size={14} /> Passwords match
                </p>
              )}
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading || !isPasswordStrong || !isPasswordsMatch}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:-translate-y-0"
              >
                {loading ? '⏳ Updating...' : '✓ Change Password'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex-1 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              💡 <strong>Tip:</strong> Make your password strong to protect your account. Use a combination of letters, numbers, and special characters.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
