import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { role } = useAuthStore()
  const location = useLocation()

  const publicLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/services', label: 'Services', icon: '⚙️' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📧' }
  ]

  const protectedLinks = [
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/change-password', label: 'Change Password', icon: '🔐' },
    { path: '/update-profile', label: 'Update Profile', icon: '✏️' }
  ]

  const adminLinks = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    ...protectedLinks
  ]

  const userLinks = [
    { path: '/user', label: 'Dashboard', icon: '📊' },
    ...protectedLinks
  ]

  const isActive = (path) => location.pathname === path

  const links = role === 'admin' ? adminLinks : role === 'user' ? userLinks : publicLinks

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-39 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <nav className={`fixed left-0 top-20 w-3/4 md:w-72 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg dark:shadow-2xl`}>

        {/* Sidebar Header */}
        <div className="sticky top-0 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-between items-center gap-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Navigation</h3>
          <div className="flex gap-2">
            <button
              className="text-2xl text-gray-500 hover:text-gray-800 transition-colors duration-300"
              onClick={toggleSidebar}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Sidebar Menu */}
        <ul className="px-0 py-4 space-y-1">
          {links.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-4 px-6 py-3 transition-all duration-300 border-l-4 ${
                  isActive(link.path)
                    ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-l-blue-600 dark:border-l-blue-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 border-l-transparent hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-l-blue-600 dark:hover:border-l-blue-400'
                }`}
                onClick={toggleSidebar}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-base">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Sidebar
