const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="flex flex-col items-center gap-8 text-center">

        <div className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-[0_10px_40px_rgba(15,23,42,0.18)] border border-teal-100 dark:border-slate-700">
          <span className="bg-gradient-to-br from-teal-600 to-amber-500 bg-clip-text text-4xl font-bold text-transparent">
            LH
          </span>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Learning Club
        </h2>

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-200 dark:border-slate-700 border-t-teal-600 dark:border-t-teal-300" />

        <p className="text-base text-slate-600 dark:text-slate-300">
          Verifying your session...
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen

