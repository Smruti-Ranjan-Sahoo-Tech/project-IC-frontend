import React, { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useCourseStore } from "../../store/useCourseStore";
import { toast } from "react-toastify";

const getSubjectName = (subject) => {
  if (typeof subject === "string") return subject;
  return subject?.name || "";
};

const isApprovedSubject = (subject) => {
  if (typeof subject === "string") return true;
  return subject?.status === "approve";
};

const createQuestionRow = () => ({
  questionType: "Interview",
  subject: "",
  question: ""
});

const AddUserReview = () => {
  const {
    addReview,
    getReview,
    pendingReviews,
    approvedReviews,
    reviewLoading,
    reviewHistoryLoading
  } = useUserStore();
  const { subjects, companies, fetchSubjectsForCourse, fetchCompanies, addCompany, companiesLoading } = useCourseStore();

  const [step, setStep] = useState(1);
  const [companyInfo, setCompanyInfo] = useState({
    companyType: "Other",
    company: "",
    location: ""
  });
  const [newCompany, setNewCompany] = useState("");
  const [questions, setQuestions] = useState([createQuestionRow()]);

  const selectableSubjects = useMemo(
    () =>
      subjects
        .filter((item) => isApprovedSubject(item))
        .map((item) => getSubjectName(item))
        .filter(Boolean),
    [subjects]
  );

  useEffect(() => {
    fetchSubjectsForCourse();
    fetchCompanies();
    getReview();
  }, [fetchSubjectsForCourse, fetchCompanies, getReview]);

  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;

    if (name === "companyType") {
      setCompanyInfo((prev) => ({ ...prev, companyType: value, company: "" }));
      fetchCompanies(value);
      return;
    }

    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const addQuestionRow = () => {
    setQuestions((prev) => [...prev, createQuestionRow()]);
  };

  const removeQuestionRow = (index) => {
    setQuestions((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const goNext = () => {
    const companyValue = companyInfo.company === "__new__" ? newCompany.trim() : companyInfo.company.trim();
    if (!companyValue || !companyInfo.location.trim()) {
      toast.error("Please fill company and location to continue.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyValue = companyInfo.company === "__new__" ? newCompany.trim() : companyInfo.company.trim();
    if (!companyValue || !companyInfo.location.trim()) {
      toast.error("Please fill company and location.");
      return;
    }

    const cleanedQuestions = questions.map((item) => ({
      questionType: item.questionType,
      subject: item.subject.trim(),
      question: item.question.trim()
    }));

    const hasInvalid = cleanedQuestions.some(
      (item) => !item.subject || !item.question || !item.questionType
    );
    if (hasInvalid) {
      toast.error("Please fill subject, question type, and question before submit.");
      return;
    }

    if (companyInfo.company === "__new__") {
      await addCompany(companyValue);
    }

    const result = await addReview({
      companyType: companyInfo.companyType,
      company: companyValue,
      location: companyInfo.location.trim(),
      questions: cleanedQuestions
    });

    if (result.length > 0) {
      setQuestions([createQuestionRow()]);
      setStep(1);
      setCompanyInfo({
        companyType: "Other",
        company: "",
        location: ""
      });
      setNewCompany("");
      fetchCompanies();
      getReview();
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Add Review</h1>
          <p className="text-slate-600 dark:text-slate-400">Step {step} of 2</p>
        </div>

        {step === 1 && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-700 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Company Information</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <select
                name="companyType"
                value={companyInfo.companyType}
                onChange={handleCompanyInfoChange}
                className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
              >
                <option value="MNC">MNC</option>
                <option value="Startup">Startup</option>
                <option value="Other">Other</option>
              </select>
              <select
                name="company"
                value={companyInfo.company}
                onChange={handleCompanyInfoChange}
                className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
              >
                <option value="">{companiesLoading ? "Loading companies..." : "Select company"}</option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
                <option value="__new__">+ Add new company</option>
              </select>
              <input
                name="location"
                value={companyInfo.location}
                onChange={handleCompanyInfoChange}
                placeholder="Location"
                className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
              />
            </div>

            {companyInfo.company === "__new__" && (
              <input
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="Enter new company name"
                className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
              />
            )}

            <div className="pt-2">
              <button onClick={goNext} className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg">
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-700 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Questions</h2>

            {questions.map((item, index) => (
              <div key={index} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Question {index + 1}</p>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestionRow(index)}
                      className="px-3 py-1 text-xs bg-rose-600 hover:bg-rose-700 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <select
                    value={item.questionType}
                    onChange={(e) => handleQuestionChange(index, "questionType", e.target.value)}
                    className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                  >
                    <option value="Interview">Interview</option>
                    <option value="Coding">Coding</option>
                    <option value="Subjective">Subjective</option>
                  </select>

                  <select
                    value={item.subject}
                    onChange={(e) => handleQuestionChange(index, "subject", e.target.value)}
                    className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                  >
                    <option value="">Select subject</option>
                    {selectableSubjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  value={item.question}
                  onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                  placeholder="Question"
                  rows={2}
                  className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                />
              </div>
            ))}

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={addQuestionRow} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                + Add Extra Question
              </button>
              <button type="button" onClick={() => setStep(1)} className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200">
                Back
              </button>
              <button type="submit" disabled={reviewLoading} className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg disabled:opacity-60">
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">My Request Status</h2>

          {reviewHistoryLoading ? (
            <p className="text-slate-500">Loading your requests...</p>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Pending / Rejected</h3>
                {pendingReviews.length === 0 ? (
                  <p className="text-slate-500">No pending requests</p>
                ) : (
                  <div className="space-y-2">
                    {pendingReviews.map((item) => (
                      <div key={item._id} className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 flex justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.question}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {item.company} ({item.companyType}) - {item.location}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full h-fit ${item.status === "rejected" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Approved</h3>
                {approvedReviews.length === 0 ? (
                  <p className="text-slate-500">No approved requests yet</p>
                ) : (
                  <div className="space-y-2">
                    {approvedReviews.map((item) => (
                      <div key={item._id} className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.question}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {item.company} ({item.companyType}) - {item.location}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full h-fit bg-emerald-100 text-emerald-700">
                          approved
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AddUserReview;
