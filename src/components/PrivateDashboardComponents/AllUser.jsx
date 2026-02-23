import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";

const AllUser = () => {
  const {
    allUser,
    allUserLoading,
    setAllUser,
    setFreezeUser,
    setUnFreezeUser,
    deleteUser
  } = useAdminStore();

  useEffect(() => {
    setAllUser();
  }, []);

  return (
    <div className="flex-1 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6">
      
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          All Users
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage and monitor users
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={allUser.length}
          color="border-teal-500"
        />
        <StatCard
          title="Active Users"
          value={allUser.filter((u) => !u.isBlocked).length}
          color="border-amber-500"
        />
        <StatCard
          title="Blocked Users"
          value={allUser.filter((u) => u.isBlocked).length}
          color="border-red-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-teal-100 dark:border-slate-800">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            User Directory
          </h2>
        </div>

        {allUserLoading ? (
          <p className="p-6 text-center text-slate-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Course</Th>
                  <Th>Phone</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>

              <tbody>
                {allUser.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >
                    <Td>{user.username}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200">
                        {user.cource}
                      </span>
                    </Td>
                    <Td>{user.phone}</Td>

                    {/* Status */}
                    <Td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isBlocked
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                            : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </Td>

                    {/* Actions */}
                    <Td>
                      <div className="flex gap-2">
                        {user.isBlocked ? (
                          <button
                            onClick={() => setUnFreezeUser(user._id)}
                            className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white text-xs rounded-lg"
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => setFreezeUser(user._id)}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs rounded-lg"
                          >
                            Block
                          </button>
                        )}

                        <button
                          onClick={() => deleteUser(user._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </Td>
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

export default AllUser;


/* Small reusable components */

const StatCard = ({ title, value, color }) => (
  <div
    className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-l-4 ${color}`}
  >
    <p className="text-slate-600 dark:text-slate-400 text-sm">{title}</p>
    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
      {value}
    </p>
  </div>
);

const Th = ({ children }) => (
  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
    {children}
  </td>
);
