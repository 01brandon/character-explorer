/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch, { API } from "../hooks/useFetch";
import { deleteCharacter, mergedCharacter, saveCharacterOverrides } from "../utils/characterStorage";

export default function EditCharacterPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`${API}/${id}`);

  const character = useMemo(() => {
    if (!data) return null;
    return mergedCharacter(data);
  }, [data]);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!character) return;
    setName(character.name ?? "");
    setStatus(character.status ?? "");
    setSpecies(character.species ?? "");
    setImage(character.image ?? "");
  }, [character]);

  if (loading) return <p className="text-zinc-400 text-sm">Loading...</p>;
  if (error || !character)
    return <p className="text-red-500 text-sm">Character not found.</p>;

  if (character.deleted) {
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

  const onSave = (e) => {
    e.preventDefault();
    setSaving(true);
    saveCharacterOverrides(id, {
      name: name.trim() || character.name,
      status: status.trim() || character.status,
      species: species.trim() || character.species,
      image: image.trim() || character.image,
    });
    navigate(`/dashboard/characters/${id}`);
  };

  const onDelete = () => {
    if (!window.confirm("Delete this character?")) return;
    deleteCharacter(id);
    navigate("/dashboard/characters");
  };

  return (
    <div>
      <button
        onClick={() => navigate(`/dashboard/characters/${id}`)}
        className="mb-4 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
      >
        &larr; Back
      </button>

      <h1 className="text-2xl font-medium text-zinc-800 mb-4">Edit {character.name}</h1>

      <form onSubmit={onSave} className="space-y-4 max-w-md">
        <label className="block">
          <span className="text-sm text-zinc-500">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white"
          />
        </label>

        <label className="block">
          <span className="text-sm text-zinc-500">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white"
          >
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">unknown</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-zinc-500">Species</span>
          <input
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white"
          />
        </label>

        <label className="block">
          <span className="text-sm text-zinc-500">Image URL</span>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white"
          />
        </label>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-sm font-medium border border-blue-600 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="px-4 py-2 text-sm font-medium border border-red-500 rounded-lg bg-white text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
