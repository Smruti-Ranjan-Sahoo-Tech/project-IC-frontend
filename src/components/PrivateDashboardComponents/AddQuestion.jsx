import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useCourseStore } from "../../store/useCourseStore";
import { PlusCircle, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";

const initialFormState = {
  question: "",
  answer: "",
  questionType: "Interview",
  subject: "",
  companyType: "Other",
  company: "",
  location: ""
};

const getSubjectName = (subject) => {
  if (typeof subject === "string") return subject;
  return subject?.name || "";
};

const isApprovedSubject = (subject) => {
  if (typeof subject === "string") return true;
  return subject?.status === "approve";
};

const AddQuestion = () => {
  const { createPost, loading } = useAdminStore();
  const {
    subjects,
    companies,
    fetchSubjectsForCourse,
    fetchCompanies,
    addCompany,
    loading: loadingSubjects,
    companiesLoading
  } = useCourseStore();

  const [formData, setFormData] = useState(initialFormState);
  const [newCompany, setNewCompany] = useState("");
  const selectableSubjects = subjects
    .filter((subject) => isApprovedSubject(subject))
    .map((subject) => getSubjectName(subject))
    .filter(Boolean);

  useEffect(() => {
    fetchSubjectsForCourse();
    fetchCompanies();
  }, [fetchSubjectsForCourse, fetchCompanies]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "companyType") {
      setFormData((prev) => ({
        ...prev,
        companyType: value,
        company: ""
      }));
      fetchCompanies(value);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.question.trim() ||
      !formData.answer.trim() ||
      !formData.subject.trim()
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    const companyValue =
      formData.company === "__new__"
        ? newCompany.trim()
        : formData.company.trim();

    if (!companyValue) {
      toast.error("Please select or add a company.");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Please enter location.");
      return;
    }

    if (formData.company === "__new__") {
      await addCompany(companyValue);
    }

    const createdPost = await createPost({
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      questionType: formData.questionType,
      subject: formData.subject,
      companyType: formData.companyType,
      company: companyValue,
      location: formData.location.trim()
    });

    if (createdPost) {
      setFormData(initialFormState);
      setNewCompany("");
      fetchCompanies();
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-teal-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 md:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
                <PlusCircle size={22} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Add Question
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Create a new question for your course and subject.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Enter question..."
                rows={4}
                className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />

              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                placeholder="Enter answer..."
                rows={6}
                className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="questionType"
                  value={formData.questionType}
                  onChange={handleChange}
                  className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <option value="Interview">Interview</option>
                  <option value="Coding">Coding</option>
                  <option value="Subjective">Subjective</option>
                </select>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={loadingSubjects}
                  className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-60"
                >
                  <option value="">
                    {loadingSubjects ? "Loading subjects..." : "Select subject"}
                  </option>
                  {selectableSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                  className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <option value="MNC">MNC</option>
                  <option value="Startup">Startup</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <option value="">
                    {companiesLoading ? "Loading companies..." : "Select company"}
                  </option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                  <option value="__new__">+ Add new company</option>
                </select>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location (e.g. Bengaluru)"
                  className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>

              {formData.company === "__new__" && (
                <input
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Enter new company name"
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Add Question"
                )}
              </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
