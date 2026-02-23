import { LoaderCircle, Pencil, Trash2 } from "lucide-react";

const QuestionsTable = ({ loading, posts, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] md:min-w-[900px]">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Question</th>
            <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Type</th>
            <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Subject</th>
            <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Company</th>
            <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Location</th>
            <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Course</th>
            <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="p-10 text-center text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="animate-spin" size={18} />
                  Loading questions...
                </span>
              </td>
            </tr>
          ) : posts.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-10 text-center text-slate-500 dark:text-slate-400">
                No questions found.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post._id} className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60">
                <td className="p-4 align-top">
                  <p className="text-slate-900 dark:text-slate-100 font-medium line-clamp-2">
                    {post.question}
                  </p>
                </td>
                <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{post.questionType}</td>
                <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{post.subject}</td>
                <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{post.company || "N/A"}</td>
                <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{post.location || "N/A"}</td>
                <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{post.cource}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(post)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(post._id)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsTable;
