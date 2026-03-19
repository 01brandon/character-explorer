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
      <div>
        <button
          onClick={() => navigate("/dashboard/characters")}
          className="mb-4 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
        >
          &larr; Back
        </button>
        <p className="text-zinc-600">This character has been deleted.</p>
      </div>
    );
  }

  return (
    <div>
      {/* back button */}
      <button
        onClick={() => navigate("/dashboard/characters")}
        className="mb-4 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
      >
        &larr; Back
      </button>

      <button
        onClick={() => navigate(`/dashboard/characters/${id}/edit`)}
        className="mb-4 ml-3 px-3 py-1.5 text-sm border border-blue-600 rounded-lg bg-white text-blue-600 hover:bg-blue-50"
      >
        Edit
      </button>

      {/* character header */}
      <div className="flex gap-5 items-start mb-6">
        <img src={c.image} alt={c.name} className="w-28 rounded-xl" />
        <div>
          <h1 className="text-2xl font-medium text-zinc-800 mb-2">{c.name}</h1>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              c.status === "Alive"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {c.status}
          </span>
        </div>
      </div>

      {/* tab navigation — links to /info and /episodes nested routes */}
      <div className="flex border-b border-gray-200 mb-5">
        {["info", "episodes"].map((t) => (
          <NavLink
            key={t}
            to={t}
            className={({ isActive }) =>
              `px-5 py-2 text-sm font-medium no-underline transition-colors border-b-2 -mb-px ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`
            }
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </NavLink>
        ))}
      </div>

      {/* nested tab route renders here — passes character data down via context */}
      <Outlet context={c} />
    </div>
  );
}