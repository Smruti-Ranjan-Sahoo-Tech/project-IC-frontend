import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useCourseStore } from "../../store/useCourseStore";
import DashboardHero from "./UserMainParts/DashboardHero";
import FiltersPanel from "./UserMainParts/FiltersPanel";
import QuestionCard from "./UserMainParts/QuestionCard";
import PaginationBar from "./UserMainParts/PaginationBar";

const UserMain = () => {
  const {
    posts,
    subjects,
    loading,
    subjectLoading,
    pagination,
    getSubjectsByCourse,
    clearPosts,
    userDashboardFilters,
    setUserDashboardFilters,
    fetchUserDashboardPosts
  } = useUserStore();

  const {
    companies,
    companiesLoading,
    locations,
    locationsLoading,
    fetchCompanies,
    fetchCompanyLocations
  } = useCourseStore();

  const [openQuestionId, setOpenQuestionId] = useState(null);

  useEffect(() => {
    getSubjectsByCourse();
    clearPosts();
  }, [getSubjectsByCourse, clearPosts]);

  useEffect(() => {
    fetchCompanies(userDashboardFilters.companyType === "all" ? "" : userDashboardFilters.companyType);
  }, [userDashboardFilters.companyType, fetchCompanies]);

  useEffect(() => {
    fetchCompanyLocations(userDashboardFilters.company, userDashboardFilters.companyType);
  }, [userDashboardFilters.company, userDashboardFilters.companyType, fetchCompanyLocations]);

  useEffect(() => {
    fetchUserDashboardPosts({ page: 1, limit: 10 });
  }, [fetchUserDashboardPosts]);

  const handleFetch = async () => {
    await fetchUserDashboardPosts({ page: 1, limit: 10 });
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    fetchUserDashboardPosts({ page, limit: 10 });
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-teal-50 via-slate-100 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6 md:p-8">
      <DashboardHero totalResults={posts?.length || 0} />

      <FiltersPanel
        filters={userDashboardFilters}
        setFilters={setUserDashboardFilters}
        subjects={subjects}
        subjectLoading={subjectLoading}
        companies={companies}
        companiesLoading={companiesLoading}
        locations={locations}
        locationsLoading={locationsLoading}
        onSearch={handleFetch}
      />

      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Questions ({posts?.length || 0})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">
            <p>Loading questions...</p>
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            <div className="p-4 md:p-6 space-y-4">
              {posts.map((post) => {
                const isOpen = openQuestionId === post._id;
                return (
                  <QuestionCard
                    key={post._id}
                    post={post}
                    isOpen={isOpen}
                    onToggle={() => setOpenQuestionId(isOpen ? null : post._id)}
                  />
                );
              })}
            </div>

            <PaginationBar pagination={pagination} onPageChange={handlePageChange} />
          </>
        ) : (
          <div className="p-8 text-center text-slate-500">
            <p>No questions found for selected filters.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserMain;
