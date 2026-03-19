import { useOutletContext } from "react-router-dom";
import useFetch from "../hooks/useFetch";

// shows character info fields — rendered at /characters/:id/info
export function InfoTab() {
  const c = useOutletContext();
  return (
    <table className="w-full border-collapse">
      <tbody>
        {[
          ["Species",  c.species],
          ["Gender",   c.gender],
          ["Origin",   c.origin.name],
          ["Location", c.location.name],
        ].map(([label, val]) => (
          <tr key={label} className="border-b border-gray-100">
            <td className="py-2 text-sm text-zinc-400 w-32">{label}</td>
            <td className="py-2 text-sm text-zinc-700">{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// shows first 5 episodes the character appeared in — rendered at /characters/:id/episodes
export function EpisodesTab() {
  const c = useOutletContext();
  const ids = c.episode.slice(0, 5).map((url) => url.split("/").pop()).join(",");
  const { data: eps, loading } = useFetch(`https://rickandmortyapi.com/api/episode/${ids}`);

  if (loading) return <p className="text-zinc-400 text-sm">Loading episodes...</p>;
  const list = Array.isArray(eps) ? eps : [eps];

  return (
    <ul className="list-none p-0 m-0">
      {list?.map((ep) => (
        <li key={ep.id} className="py-2.5 border-b border-gray-100 text-sm">
          <strong className="text-zinc-700">{ep.episode}</strong>
          <span className="text-zinc-600"> &mdash; {ep.name}</span>
          <span className="text-zinc-400"> ({ep.air_date})</span>
        </li>
      ))}
    </ul>
  );
}