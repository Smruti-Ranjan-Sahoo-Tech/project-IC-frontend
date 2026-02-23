import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminSidebar from '../components/DashboardSidebar/AdminSidebar'
import AdminMain from '../components/PrivateDashboardComponents/AdminMain'
import AllUser from '../components/PrivateDashboardComponents/AllUser'
import AddQuestion from '../components/PrivateDashboardComponents/AddQuestion'
import AllQuestions from '../components/PrivateDashboardComponents/AllQuestions'
import AdminProfile from '../components/PrivateDashboardComponents/AdminProfile'
import CourseSubject from '../components/PrivateDashboardComponents/CourseSubject'
import AdminEnquiries from '../components/PrivateDashboardComponents/AdminEnquiries'

const AdminDashboard = () => {
  return (
    <div className="flex h-full bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 h-full overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminMain />} />
          <Route path="/all-users" element={<AllUser />} />
          <Route path="/cource-subject" element={<CourseSubject />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/all-questions" element={<AllQuestions />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/enquiries" element={<AdminEnquiries />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default AdminDashboard
