const getSubjectName = (subject) => {
  if (typeof subject === "string") return subject;
  return subject?.name || "";
};

const FiltersPanel = ({
  filters,
  setFilters,
  subjects,
  subjectLoading,
  companies,
  companiesLoading,
  locations,
  locationsLoading,
  onSearch
}) => {
  const questionTypes = ["Interview", "Coding", "Subjective"];

  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 md:p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col min-w-[200px]">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Subject
          </label>
          <select
            value={filters.subject}
            onChange={(e) => setFilters({ subject: e.target.value })}
            disabled={subjectLoading}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-50"
          >
            <option value="">
              {subjectLoading ? "Loading..." : "All Subjects"}
            </option>
            {subjects.map((subj, index) => {
              const subjectName = getSubjectName(subj);
              if (!subjectName) return null;
              return (
                <option key={`${subjectName}-${index}`} value={subjectName}>
                  {subjectName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col min-w-[200px]">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Question Type
          </label>
          <select
            value={filters.questionType}
            onChange={(e) => setFilters({ questionType: e.target.value })}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <option value="">All Types</option>
            {questionTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col min-w-[200px]">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Company Type
          </label>
          <select
            value={filters.companyType}
            onChange={(e) =>
              setFilters({
                companyType: e.target.value,
                company: "all",
                location: "all"
              })
            }
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <option value="all">All Company Types</option>
            <option value="MNC">MNC</option>
            <option value="Startup">Startup</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col min-w-[200px]">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Company
          </label>
          <select
            value={filters.company}
            onChange={(e) => setFilters({ company: e.target.value, location: "all" })}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <option value="all">{companiesLoading ? "Loading..." : "All Companies"}</option>
            {companies.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col min-w-[200px]">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ location: e.target.value })}
            disabled={filters.company === "all" || locationsLoading}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-50"
          >
            <option value="all">{locationsLoading ? "Loading..." : "All Locations"}</option>
            {locations.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <button
          onClick={onSearch}
          className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default FiltersPanel;
