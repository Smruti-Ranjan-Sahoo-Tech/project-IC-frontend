const PaginationBar = ({ pagination, onPageChange }) => {
  return (
    <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-center gap-2">
      <button
        onClick={() => onPageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
        className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-slate-900 dark:text-white">
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>
      <button
        onClick={() => onPageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
        className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationBar;
