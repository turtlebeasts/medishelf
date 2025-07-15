import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-600">MediShelf</h1>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            📰 Feeds
          </NavLink>
          <NavLink
            to="/dashboard/post"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            📧 Post
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            👤 Profile
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
