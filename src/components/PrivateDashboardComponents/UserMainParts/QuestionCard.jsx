const QuestionCard = ({ post, isOpen, onToggle }) => {
  const authorRole = post?.writtenBy?.role?.toLowerCase();
  const authorRoleLabel = authorRole === "user" ? "Student" : "Trainer";

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-400"></div>
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <h3 className="font-semibold text-slate-900 dark:text-white text-lg flex-1">
            {post.question}
          </h3>

          <div className="sm:text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Added by:{" "}
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {post?.writtenBy?.username || "Admin"}
              </span>
            </p>
            <span className="mt-1 inline-flex items-center rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              {authorRoleLabel}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors"
          >
            {isOpen ? "Hide Ans" : "View Ans"}
          </button>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200">
              {post.subject}
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-slate-200 dark:border-slate-700">
          <p className="pt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
            {post.answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
