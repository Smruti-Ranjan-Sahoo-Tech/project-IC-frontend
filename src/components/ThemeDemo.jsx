import { useTheme } from '@/context/ThemeContext'
import { createThemeClass } from '@/utils/themeUtils'

/**
 * Theme Demo Component
 * Shows all theme transition examples
 * Use this to verify theme switching is working correctly
 */
export function ThemeDemo() {
  const { isDark, toggleTheme } = useTheme()

  const examples = [
    { title: 'Background Transition', class: 'bg-white dark:bg-slate-900' },
    { title: 'Text Color Transition', class: 'text-gray-900 dark:text-white' },
    { title: 'Border Color Transition', class: 'border-2 border-blue-500 dark:border-teal-400' },
    { title: 'Shadow Transition', class: 'shadow-lg dark:shadow-xl' },
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 mb-6">
        🎨 Theme System Demo
      </h1>

      <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg transition-colors duration-300 mb-8">
        <p className="text-gray-700 dark:text-gray-200 transition-colors duration-300 mb-4">
          Current Mode: <strong>{isDark ? '🌙 Dark' : '☀️ Light'}</strong>
        </p>
        <button
          onClick={toggleTheme}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-300"
        >
          Toggle Theme
        </button>
      </div>

      <div className="grid gap-4">
        {examples.map((example) => (
          <div
            key={example.title}
            className={`p-6 rounded-lg transition-all duration-300 ${example.class}`}
          >
            <h3 className="font-semibold text-lg">{example.title}</h3>
            <p className="text-sm opacity-75 mt-2">
              This element smoothly transitions when you toggle theme
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg transition-all duration-300">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300 mb-4">
          Theme Transition Timing
        </h3>
        <pre className="bg-gray-100 dark:bg-slate-800 p-4 rounded text-sm overflow-x-auto transition-colors duration-300">
{`/* All elements transition over 300ms */
* {
  transition: background-color 0.3s ease, 
              color 0.3s ease, 
              border-color 0.3s ease, 
              box-shadow 0.3s ease;
}`}
        </pre>
      </div>
    </div>
  )
}

export default ThemeDemo
