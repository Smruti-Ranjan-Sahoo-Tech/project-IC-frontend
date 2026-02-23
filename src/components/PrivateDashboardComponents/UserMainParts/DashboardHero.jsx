const DashboardHero = ({ totalResults }) => {
  return (
    <section className="rounded-2xl border border-teal-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-sm p-6 md:p-8 mb-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-teal-700 dark:text-teal-300">Learner Space</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Question Practice Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Filter by subject, company, and location to find the right questions quickly.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 font-semibold text-sm">
          Total Results: {totalResults}
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
