import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useCourseStore } from "../../store/useCourseStore";

const getSubjectName = (subject) => {
  if (typeof subject === "string") return subject;
  return subject?.name || "";
};

const AllUserReviews = () => {
  const {
    subjects,
    subjectLoading,
    getSubjectsByCourse,
    allUserReviews,
    allUserReviewLoading,
    allUserReviewsPagination,
    getAllUserReviews
  } = useUserStore();
  const {
    companies,
    companiesLoading,
    locations,
    locationsLoading,
    fetchCompanies,
    fetchCompanyLocations
  } = useCourseStore();

  const [subject, setSubject] = useState("all");
  const [questionType, setQuestionType] = useState("all");
  const [companyType, setCompanyType] = useState("all");
  const [company, setCompany] = useState("all");
  const [location, setLocation] = useState("all");

  const questionTypes = ["Interview", "Coding", "Subjective"];

  useEffect(() => {
    getSubjectsByCourse();
    setSubject("all");
  }, [getSubjectsByCourse]);

  useEffect(() => {
    fetchCompanies(companyType === "all" ? "" : companyType);
    setCompany("all");
    setLocation("all");
  }, [companyType, fetchCompanies]);

  useEffect(() => {
    fetchCompanyLocations(company, companyType);
    setLocation("all");
  }, [company, companyType, fetchCompanyLocations]);

  const handleSearch = () => {
    getAllUserReviews({
      subject,
      questionType,
      companyType,
      company,
      location,
      page: 1,
      limit: 10
    });
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > (allUserReviewsPagination.totalPages || 1)) return;
    getAllUserReviews({
      subject,
      questionType,
      companyType,
      company,
      location,
      page,
      limit: 10
    });
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">All User Reviews</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">See verified reviews submitted by users</p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={subjectLoading}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
            >
              <option value="all">{subjectLoading ? "Loading..." : "All Subjects"}</option>
              {subjects.map((subj, index) => {
                const name = getSubjectName(subj);
                if (!name) return null;
                return (
                  <option key={`${name}-${index}`} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Question Type</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg"
            >
              <option value="all">All Types</option>
              {questionTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Company Type</label>
            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg"
            >
              <option value="all">All Company Types</option>
              <option value="MNC">MNC</option>
              <option value="Startup">Startup</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Company</label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg"
            >
              <option value="all">{companiesLoading ? "Loading..." : "All Companies"}</option>
              {companies.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col min-w-[200px]">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={company === "all" || locationsLoading}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
            >
              <option value="all">{locationsLoading ? "Loading..." : "All Locations"}</option>
              {locations.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white font-semibold rounded-lg"
          >
            Search
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Reviews ({allUserReviews?.length || 0})
          </h2>
        </div>

        {allUserReviewLoading ? (
          <div className="p-8 text-center text-slate-500">Loading reviews...</div>
        ) : allUserReviews.length > 0 ? (
          <>
            <div className="p-6 space-y-4">
              {allUserReviews.map((item) => (
                <div key={item._id} className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 p-5">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{item.question}</h3>
                  {item.answer ? (
                    <p className="mt-2 text-slate-700 dark:text-slate-300">{item.answer}</p>
                  ) : (
                    <p className="mt-2 text-slate-500 italic">No answer provided</p>
                  )}
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    By: {item?.writtenBy?.username || "User"} ({item?.writtenBy?.email || "N/A"})
                    <span className="ml-2 inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                      {item?.writtenBy?.role || "user"}
                    </span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">{item.subject}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">{item.cource}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">{item.company}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700">{item.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-center gap-2">
              <button
                onClick={() => handlePageChange((allUserReviewsPagination.currentPage || 1) - 1)}
                disabled={(allUserReviewsPagination.currentPage || 1) === 1}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-slate-900 dark:text-white">
                Page {allUserReviewsPagination.currentPage || 1} of {allUserReviewsPagination.totalPages || 1}
              </span>
              <button
                onClick={() => handlePageChange((allUserReviewsPagination.currentPage || 1) + 1)}
                disabled={(allUserReviewsPagination.currentPage || 1) >= (allUserReviewsPagination.totalPages || 1)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-slate-500">
            <p>No user reviews found for selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUserReviews;
