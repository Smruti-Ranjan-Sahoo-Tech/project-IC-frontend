/**
 * Theme utility functions for consistent dark/light mode styling
 * Use these helpers to ensure all components transition smoothly
 */

export const getThemeStyles = (lightClass, darkClass) => {
  return `${lightClass} dark:${darkClass}`
}

export const themeTransition = {
  default: 'transition-all duration-300 ease-in-out',
  fast: 'transition-all duration-150 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
}

/**
 * Common theme color mappings
 */
export const themeColors = {
  bg: {
    primary: 'bg-white dark:bg-slate-950',
    secondary: 'bg-gray-50 dark:bg-slate-900',
    tertiary: 'bg-gray-100 dark:bg-slate-800',
    hover: 'hover:bg-gray-100 dark:hover:bg-slate-800',
  },
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    tertiary: 'text-gray-500 dark:text-gray-400',
  },
  border: {
    primary: 'border-gray-200 dark:border-slate-700',
    secondary: 'border-gray-300 dark:border-slate-600',
  },
  shadow: {
    sm: 'shadow-sm dark:shadow-sm',
    md: 'shadow-md dark:shadow-md',
    lg: 'shadow-lg dark:shadow-lg',
  },
}

/**
 * Apply theme colors with transitions
 */
export const createThemeClass = (config) => {
  const classes = [themeTransition.default]
  
  if (config.bg) classes.push(themeColors.bg[config.bg])
  if (config.text) classes.push(themeColors.text[config.text])
  if (config.border) classes.push(themeColors.border[config.border])
  if (config.shadow) classes.push(themeColors.shadow[config.shadow])
  if (config.custom) classes.push(config.custom)
  
  return classes.join(' ')
}

/**
 * Get inline styles for dynamic theme colors (if needed)
 * Falls back to CSS variables set in ThemeContext
 */
export const getThemeInlineStyles = (isDark) => ({
  backgroundColor: isDark ? 'var(--bg-primary)' : 'var(--bg-primary)',
  color: isDark ? 'var(--text-primary)' : 'var(--text-primary)',
  borderColor: isDark ? 'var(--border-primary)' : 'var(--border-primary)',
})
