import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return false
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark') return true
      if (stored === 'light') return false
    } catch (e) {
      // ignore localStorage errors in non-browser environments
    }
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? true
      : false
  }

  const [isDark, setIsDark] = useState(getInitialTheme)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    
    // Trigger transition state for smooth animation
    setIsTransitioning(true)
    
    if (isDark) {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
    
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch (e) {
      // ignore localStorage errors in non-browser environments
    }
    
    // End transition state after CSS transition duration (300ms)
    const timer = setTimeout(() => setIsTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [isDark])

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev)
  }, [])

  const setDarkMode = useCallback((value) => {
    setIsDark(value)
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setDarkMode, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  )
}
