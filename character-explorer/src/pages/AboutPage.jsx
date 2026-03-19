// about page shown at /dashboard/about
export default function AboutPage() {
  return (
    <div>
      <h1 className="text-2xl font-medium text-zinc-800 mb-3">About</h1>
      <p className="text-zinc-500 text-sm">
        This app uses the{" "}
        <a
          href="https://rickandmortyapi.com"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          Rick &amp; Morty API
        </a>{" "}
        .
      </p>
    </div>
  );
}