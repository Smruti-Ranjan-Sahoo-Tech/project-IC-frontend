import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LayoutDashboard, User, PlusCircle, ListChecks, LogOut } from "lucide-react";

const UserSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/user" },
    { label: "Add Review", icon: PlusCircle, path: "/user/review/add" },
    { label: "All User Reviews", icon: ListChecks, path: "/user/review/all" },
    { label: "Profile", icon: User, path: "/user/profile" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-16 md:w-64 h-full overflow-hidden bg-gradient-to-b from-teal-950 via-slate-900 to-slate-900 border-r border-teal-900/40 flex flex-col justify-between">
      <div>
        <div className="h-16 flex items-center justify-center md:justify-start px-2 md:px-6 border-b border-teal-900/40">
          <div>
            <h1 className="text-xl font-semibold text-white tracking-wide">
              <span className="md:hidden text-amber-400">U</span>
              <span className="hidden md:inline">User <span className="text-amber-400">Panel</span></span>
            </h1>
            <p className="hidden md:block text-xs text-slate-300 mt-0.5 truncate max-w-48">
              {user?.username || "User"}
            </p>
          </div>
        </div>

        <nav className="p-2 md:p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-center md:justify-start gap-0 md:gap-3 px-0 md:px-4 py-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? "bg-teal-500 text-white shadow-md"
                    : "text-slate-300 hover:bg-teal-900/40 hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  className={`${active ? "text-white" : "text-slate-300 group-hover:text-white"}`}
                />
                <span className="hidden md:inline font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-2 md:p-4 border-t border-teal-900/40">
        <button
          onClick={logout}
          className="flex items-center justify-center md:justify-start gap-0 md:gap-3 w-full px-0 md:px-4 py-3 text-slate-300 hover:text-white hover:bg-rose-600 rounded-lg transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
