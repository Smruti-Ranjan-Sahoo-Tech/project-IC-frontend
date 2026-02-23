import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const UserRoute = ({ children }) => {
  const { isLoggedIn, role } = useAuthStore()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (role !== 'user') return <Navigate to="/" replace />
  return children
}

export default UserRoute
