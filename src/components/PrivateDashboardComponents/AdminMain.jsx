import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdminStore } from "../../store/useAdminStore";
import {
  Users,
  GraduationCap,
  UserX,
  UserPlus,
  ArrowRight,
  PlusCircle,
  List
} from "lucide-react";

const AdminMain = () => {
  const { dashBoardData, getDashboardData } = useAdminStore();

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  const stats = [
    {
      label: "Total Users",
      value: dashBoardData?.totalUsers || 0,
      icon: Users,
      tone: "teal"
    },
    {
      label: "Course Enrollment",
      value: dashBoardData?.totalCourceUsers || 0,
      icon: GraduationCap,
      tone: "amber"
    },
    {
      label: "Blocked Accounts",
      value: dashBoardData?.inactiveUsers || 0,
      icon: UserX,
      tone: "rose"
    },
    {
      label: "New Registrations",
      value: dashBoardData?.lastMonthRegistrations || 0,
      icon: UserPlus,
      tone: "sky"
    }
  ];

  return (
    <div className="min-h-full p-4 sm:p-6 md:p-10 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <section className="rounded-2xl border border-teal-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-6 md:mb-8">
          <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-teal-700 dark:text-teal-300 text-sm uppercase tracking-widest font-semibold mb-2">Admin Dashboard</p>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-slate-900 dark:text-white">
                Admin management panel for daily operations
              </h1>
              <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl">
                Add new questions, maintain your question bank, and monitor learner activity from one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/add-question"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold"
              >
                <PlusCircle size={18} />
                Add Question
              </Link>
              <Link
                to="/admin/all-questions"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-semibold"
              >
                <List size={18} />
                All Questions
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article key={stat.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                    <p className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{stat.value}</p>
                  </div>
                  <span className={`p-2 rounded-lg ${
                    stat.tone === "teal"
                      ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                      : stat.tone === "amber"
                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                      : stat.tone === "rose"
                      ? "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
                      : "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300"
                  }`}>
                    <Icon size={20} />
                  </span>
                </div>
              </article>
            );
          })}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Focus This Week</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Keep your course fresh by adding interview and coding questions regularly.
            </p>
            <Link
              to="/admin/add-question"
              className="inline-flex items-center gap-2 font-semibold text-teal-700 dark:text-teal-300 hover:underline"
            >
              Add new content
              <ArrowRight size={16} />
            </Link>
          </article>

          <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Question Bank</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Edit existing questions and remove outdated entries with one click.
            </p>
            <Link
              to="/admin/all-questions"
              className="inline-flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-300 hover:underline"
            >
              Open all questions
              <ArrowRight size={16} />
            </Link>
          </article>
        </section>
      </div>
    </div>
  );
};

export default AdminMain;
