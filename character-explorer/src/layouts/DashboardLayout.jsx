import { NavLink, Outlet } from "react-router-dom";

// sidebar layout — wraps all /dashboard child routes via <Outlet />
export default function DashboardLayout() {
  const links = [
    { label: "Home",       to: "/dashboard" },
    { label: "Characters", to: "/dashboard/characters" },
    { label: "About",      to: "/dashboard/about" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-44 shrink-0 border-r border-gray-200 bg-white px-4 py-6 flex flex-col gap-1">
        <h2 className="text-lg font-medium mb-6 text-zinc-800">Explorer</h2>
        <nav className="flex flex-col gap-1">
          {links.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                `block w-full text-left px-3 py-2 rounded-lg text-sm no-underline transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-zinc-600 hover:bg-gray-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 max-w-3xl">
        <Outlet />
      </main>
    </div>
  );
}