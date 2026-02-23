import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import Services from '../pages/Services'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import ChangePassword from '../pages/ChangePassword'
import UpdateProfile from '../pages/UpdateProfile'
import Profile from '../pages/Profile'
import AdminDashboard from '../pages/AdminDashboard'
import UserDashboard from '../pages/UserDashboard'
import AdminRoute from './AdminRoute'
import UserRoute from './UserRoute'
import { useAuthStore } from '../store/useAuthStore'

const Router = () => {
  const { isLoggedIn, role } = useAuthStore()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<ContactUs />} />

      {/* Auth Routes */}
      <Route path="/login" element={isLoggedIn ? <Navigate to={role === 'admin' ? '/admin' : '/user'} replace /> : <Login />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to={role === 'admin' ? '/admin' : '/user'} replace /> : <Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/profile" element={<Profile />} />

      {/* Dashboard Routes with Nested Routing */}
      <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/user/*" element={<UserRoute><UserDashboard /></UserRoute>} />

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default Router
