import { ChevronLeft, ChevronRight } from "lucide-react";

const QuestionsPagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }).map((_, idx) => {
        const page = idx + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg text-sm ${
              page === currentPage
                ? "bg-teal-600 text-white"
                : "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default QuestionsPagination;
