import { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";

const AdminEnquiries = () => {
  const { enquiries, enquiriesLoading, getAllEnquiries } = useAdminStore();

  useEffect(() => {
    getAllEnquiries();
  }, [getAllEnquiries]);

  return (
    <div className="flex-1 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Enquiries</h1>
        <p className="text-slate-600 dark:text-slate-400">Messages submitted from Contact Us page</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-teal-100 dark:border-slate-800">
        {enquiriesLoading ? (
          <p className="p-6 text-center text-slate-500">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <p className="p-6 text-center text-slate-500">No enquiries found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Message</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Time</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((item) => (
                  <tr key={item._id} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{item.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{item.email || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{item.subject || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 max-w-[380px]">{item.message || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
