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
      <h1 className="text-2xl font-medium text-zinc-800 mb-4">Characters</h1>

      {/* search input */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="mb-5 w-60 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white"
      />

      {loading && <p className="text-zinc-400 text-sm">Loading...</p>}
      {error && <p className="text-red-500 text-sm">Failed to load.</p>}

      {/* character grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
        {characters.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(`/dashboard/characters/${c.id}`)}
            className="bg-white border border-gray-100 rounded-xl p-3 text-center cursor-pointer hover:border-blue-200 hover:shadow-sm transition-all"
          >
            <img src={c.image} alt={c.name} className="w-full rounded-lg mb-2" />
            <p className="text-xs font-medium text-zinc-800 m-0">{c.name}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{c.species}</p>
          </button>
        ))}
      </div>

      {/* pagination controls */}
      {data?.info && (
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={!data.info.prev}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            &larr; Prev
          </button>
          <span className="text-zinc-400 text-sm">Page {page} / {data.info.pages}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data.info.next}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}