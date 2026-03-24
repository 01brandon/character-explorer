import { useOutletContext } from "react-router-dom";
import useFetch from "../hooks/useFetch";

// shows character info fields — rendered at /characters/:id/info
export function InfoTab() {
  const c = useOutletContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        ["Species", c.species],
        ["Gender", c.gender],
        ["Origin", c.origin.name],
        ["Location", c.location.name],
      ].map(([label, val]) => (
        <div key={label} className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-1">{label}</h3>
          <p className="text-base text-zinc-800">{val}</p>
        </div>
      ))}
    </div>
  );
}

// shows first 5 episodes the character appeared in — rendered at /characters/:id/episodes
export function EpisodesTab() {
  const c = useOutletContext();
  const ids = c.episode.slice(0, 5).map((url) => url.split("/").pop()).join(",");
  const { data: eps, loading } = useFetch(`https://rickandmortyapi.com/api/episode/${ids}`);

  if (loading) return <p className="text-zinc-500 text-sm">Loading episodes...</p>;
  const list = Array.isArray(eps) ? eps : [eps];

  return (
    <div className="space-y-4">
      {list?.map((ep) => (
        <div key={ep.id} className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-blue-600">{ep.episode}</span>
            <span className="text-xs text-zinc-400">{ep.air_date}</span>
          </div>
          <h4 className="text-base font-medium text-zinc-800">{ep.name}</h4>
        </div>
      ))}
    </div>
  );
}