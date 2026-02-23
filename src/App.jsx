import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import Router from './Routes/Router'
import { useAuthStore } from './store/useAuthStore'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import Navbar from './components/NavBar/Navbar'
import Sidebar from './components/sidebar/Sidebar'

const App = () => {
  const { isInitializing, checkAuthStatus } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isDashboardRoute =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/user')

  useEffect(() => {
    checkAuthStatus()
  }, [])

  if (isInitializing) {
    return <LoadingScreen />
  }

  return (
    <>
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        toggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <Sidebar
        isOpen={mobileMenuOpen}
        toggleSidebar={() => setMobileMenuOpen(false)}
      />
      <main
        className={`bg-gray-50 dark:bg-slate-950 transition-colors duration-300 animate-fadeIn ${
          isDashboardRoute ? 'h-[calc(100vh-80px)] overflow-hidden' : 'min-h-screen pb-12'
        }`}
      >
        <Router />
      </main>
      <ToastContainer />
    </>
  )
}

export default App
