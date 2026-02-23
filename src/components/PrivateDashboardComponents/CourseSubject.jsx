import React, { useEffect, useState } from "react";
import { useCourseStore } from "../../store/useCourseStore";

const getSubjectName = (subject) => {
  if (typeof subject === "string") return subject;
  return subject?.name || "";
};

const getSubjectStatus = (subject) => {
  if (typeof subject === "string") return "approve";
  return subject?.status || "pending";
};

const statusClassMap = {
  approve: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-rose-100 text-rose-700",
  delete_pending: "bg-blue-100 text-blue-700"
};

const CourseSubject = () => {
  const {
    subjects,
    loading,
    fetchSubjects,
    addSubject,
    deleteSubject
  } = useCourseStore();

  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;
    addSubject(newSubject.trim());
    setNewSubject("");
  };

  const handleDeleteSubject = (subject) => {
    deleteSubject(getSubjectName(subject));
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Course Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage subjects for your course</p>
      </div>

      <div className="mb-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-teal-100 dark:border-slate-800">
          <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Add New Subject</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Enter subject name"
              className="flex-1 px-4 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <button
              onClick={handleAddSubject}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-1 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-teal-100 dark:border-slate-800">
          <div className="p-6 border-b dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">All Subjects</h2>
          </div>

          {loading && <p className="p-6 text-center text-slate-500">Loading subjects...</p>}

          {!loading && subjects.length === 0 && (
            <p className="p-6 text-center text-slate-500">No subjects found</p>
          )}

          {!loading && subjects.length > 0 && (
            <div className="p-6 grid md:grid-cols-1 gap-3">
              {subjects.map((subject, index) => {
                const name = getSubjectName(subject);
                const status = getSubjectStatus(subject);

                return (
                  <div
                    key={`${name}-${index}`}
                    className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 p-4 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-800 dark:text-white">{name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          statusClassMap[status] || "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteSubject(subject)}
                      disabled={status === "pending" || status === "delete_pending"}
                      className={`px-3 py-1 text-white text-xs rounded-lg transition ${
                        status === "pending" || status === "delete_pending"
                          ? "bg-slate-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {status === "delete_pending" ? "Delete Requested" : "Delete"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSubject;
