import { NavLink, Outlet } from "react-router-dom";

// sidebar layout — wraps all /dashboard child routes via <Outlet />
export default function DashboardLayout() {
  const links = [
    { label: "Home",       to: "/dashboard" },
    { label: "Characters", to: "/dashboard/characters" },
    { label: "About",      to: "/dashboard/about" },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="w-48 shrink-0 border-r border-zinc-200 bg-white px-6 py-8 flex flex-col gap-2 shadow-sm">
        <h2 className="text-xl font-semibold mb-8 text-zinc-800">Rick & Morty Explorer</h2>
        <nav className="flex flex-col gap-2">
          {links.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                `block w-full text-left px-4 py-3 rounded-lg text-sm font-medium no-underline transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10 max-w-5xl bg-white shadow-sm ml-4 mr-4 my-4 rounded-lg">
        <Outlet />
      </main>
    </div>
  );
}