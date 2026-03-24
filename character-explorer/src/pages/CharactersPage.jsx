import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch, { API } from "../hooks/useFetch";
import { filterDeletedCharacters, mergedCharacter } from "../utils/characterStorage";

// shows character grid with search and pagination at /dashboard/characters
export default function CharactersPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, loading, error } = useFetch(`${API}?page=${page}&name=${search}`);

  const characters = useMemo(() => {
    if (!data?.results) return [];
    return filterDeletedCharacters(data.results).map(mergedCharacter);
  }, [data]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-800 mb-6">Characters</h1>

      {/* search input */}
      <div className="mb-8">
        <input
          placeholder="Search characters..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full max-w-md px-4 py-3 text-sm border border-zinc-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm"
        />
      </div>

      {loading && <p className="text-zinc-500 text-sm">Loading characters...</p>}
      {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">Failed to load characters. Please try again.</p>}

      {/* character grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {characters.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(`/dashboard/characters/${c.id}`)}
            className="bg-white border border-zinc-200 rounded-xl p-4 text-center cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all duration-200 group"
          >
            <img src={c.image} alt={c.name} className="w-full rounded-lg mb-3 shadow-sm group-hover:shadow-md transition-shadow" />
            <p className="text-sm font-semibold text-zinc-800 mb-1 truncate">{c.name}</p>
            <p className="text-xs text-zinc-500">{c.species}</p>
          </button>
        ))}
      </div>

      {/* pagination controls */}
      {data?.info && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={!data.info.prev}
            className="px-4 py-2 text-sm border border-zinc-300 rounded-lg bg-white hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <span className="text-zinc-600 text-sm font-medium">Page {page} of {data.info.pages}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data.info.next}
            className="px-4 py-2 text-sm border border-zinc-300 rounded-lg bg-white hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}