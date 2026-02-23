import { Routes, Route, Navigate } from 'react-router-dom'
import UserSidebar from '../components/DashboardSidebar/UserSidebar'
import UserMain from '../components/PrivateDashboardComponents/UserMain'
import UserProfile from '../components/PrivateDashboardComponents/UserProfile'
import MyQuestions from '../components/PrivateDashboardComponents/MyQuestions'
import AddUserReview from '../components/PrivateDashboardComponents/AddUserReview'
import AllUserReviews from '../components/PrivateDashboardComponents/AllUserReviews'

const UserDashboard = () => {
  return (
    <div className="flex h-full bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">
        <Routes>
          <Route path="/" element={<UserMain />} />
          <Route path="/my-questions" element={<MyQuestions />} />
          <Route path="/review/add" element={<AddUserReview />} />
          <Route path="/review/all" element={<AllUserReviews />} />
          <Route path="/review" element={<Navigate to="/user/review/add" replace />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/user" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default UserDashboard

