// about page shown at /dashboard/about
export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-zinc-800 mb-6">About</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
        <p className="text-zinc-600 mb-4">
          This is a character explorer app built with React and Tailwind CSS. It allows you to browse, search, and manage characters from the Rick & Morty universe.
        </p>
        <p className="text-zinc-600 mb-4">
          Features include:
        </p>
        <ul className="list-disc list-inside text-zinc-600 mb-4 space-y-1">
          <li>Search and paginate through characters</li>
          <li>View detailed character information</li>
          <li>Edit character details (stored locally)</li>
          <li>Delete characters from your view</li>
          <li>Responsive design for all devices</li>
        </ul>
        <p className="text-zinc-600">
          Data provided by the{" "}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Rick & Morty API
          </a>
          .
        </p>
      </div>
    </div>
  );
}
