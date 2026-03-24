import { useMemo } from "react";
import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import useFetch, { API } from "../hooks/useFetch";
import { mergedCharacter } from "../utils/characterStorage";

// shows single character details at /dashboard/characters/:id
export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`${API}/${id}`);

  const c = useMemo(() => {
    if (!data) return null;
    return mergedCharacter(data);
  }, [data]);

  if (loading) return <p className="text-zinc-400 text-sm">Loading...</p>;
  if (error || !c) return <p className="text-red-500 text-sm">Character not found.</p>;

  if (c.deleted) {
    return (
      <div className="text-center py-12">
        <button
          onClick={() => navigate("/dashboard/characters")}
          className="mb-6 px-4 py-2 text-sm border border-zinc-300 rounded-lg bg-white hover:bg-zinc-50 transition-colors"
        >
          ← Back to Characters
        </button>
        <p className="text-zinc-600 text-lg">This character has been deleted.</p>
      </div>
    );
  }

  return (
    <div>
      {/* back and edit buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => navigate("/dashboard/characters")}
          className="px-4 py-2 text-sm border border-zinc-300 rounded-lg bg-white hover:bg-zinc-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => navigate(`/dashboard/characters/${id}/edit`)}
          className="px-4 py-2 text-sm border border-blue-600 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-colors"
        >
          Edit Character
        </button>
      </div>

      {/* character header */}
      <div className="flex flex-col sm:flex-row gap-6 items-start mb-8 bg-zinc-50 p-6 rounded-lg">
        <img src={c.image} alt={c.name} className="w-32 h-32 rounded-xl shadow-md" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-zinc-800 mb-3">{c.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                c.status === "Alive"
                  ? "bg-green-100 text-green-700"
                  : c.status === "Dead"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {c.status}
            </span>
            <span className="text-sm text-zinc-600">{c.species}</span>
          </div>
        </div>
      </div>

      {/* tab navigation — links to /info and /episodes nested routes */}
      <div className="flex border-b border-zinc-200 mb-6">
        {["info", "episodes"].map((t) => (
          <NavLink
            key={t}
            to={t}
            className={({ isActive }) =>
              `px-6 py-3 text-sm font-medium no-underline transition-colors border-b-2 -mb-px capitalize ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`
            }
          >
            {t}
          </NavLink>
        ))}
      </div>

      {/* nested tab route renders here — passes character data down via context */}
      <Outlet context={c} />
    </div>
  );
}