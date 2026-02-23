import { X } from "lucide-react";

const EditQuestionModal = ({
  isOpen,
  onClose,
  onSubmit,
  editData,
  onEditChange,
  editNewCompany,
  onEditNewCompanyChange,
  companies,
  selectableSubjects,
  loadingSubjects,
  loading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Question</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <textarea
            name="question"
            value={editData.question}
            onChange={onEditChange}
            rows={3}
            className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
          <textarea
            name="answer"
            value={editData.answer}
            onChange={onEditChange}
            rows={6}
            className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              name="questionType"
              value={editData.questionType}
              onChange={onEditChange}
              className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="Interview">Interview</option>
              <option value="Coding">Coding</option>
              <option value="Subjective">Subjective</option>
            </select>
            <select
              name="subject"
              value={editData.subject}
              onChange={onEditChange}
              disabled={loadingSubjects}
              className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="">{loadingSubjects ? "Loading..." : "Select subject"}</option>
              {selectableSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              name="companyType"
              value={editData.companyType}
              onChange={onEditChange}
              className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="MNC">MNC</option>
              <option value="Startup">Startup</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="company"
              value={editData.company}
              onChange={onEditChange}
              className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="">Select company</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
              <option value="__new__">+ Add new company</option>
            </select>

            <input
              name="location"
              value={editData.location}
              onChange={onEditChange}
              placeholder="Location"
              className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          {editData.company === "__new__" && (
            <input
              value={editNewCompany}
              onChange={(e) => onEditNewCompanyChange(e.target.value)}
              placeholder="Enter new company name"
              className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          )}

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuestionModal;
