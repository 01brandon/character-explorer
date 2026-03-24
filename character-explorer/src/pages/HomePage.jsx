// landing page shown at /dashboard
export default function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-zinc-800 mb-4">Rick & Morty Character Explorer</h1>
      <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
        Discover and explore characters from the Rick & Morty universe. Search, view details, and manage your favorite characters.
      </p>
      <div className="flex justify-center gap-4">
        <a href="/dashboard/characters" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Browse Characters
        </a>
        <a href="/dashboard/about" className="px-6 py-3 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors font-medium">
          Learn More
        </a>
      </div>
    </div>
  );
}
