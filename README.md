# Character Explorer

A React single-page application for browsing, searching, and managing characters from the Rick and Morty universe. Built with Vite, Tailwind CSS, and React Router DOM, the app pulls live data from the public Rick and Morty API and lets users edit or delete characters with changes persisted to localStorage.

---

## Features

- Browse characters in a responsive grid with live search and pagination
- View a dedicated detail page per character with tabbed Info and Episodes sections
- Edit character fields — name, status, species, and image URL — saved locally via localStorage
- Delete characters from your view, with data persisted across sessions
- Sidebar navigation with active route highlighting
- Custom `useFetch` hook for clean data fetching across components
- Fully client-side routed — no page reloads

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI component library |
| Vite | 8 | Dev server and bundler |
| Tailwind CSS | 4 | Utility-first styling via `@tailwindcss/vite` |
| React Router DOM | 7 | Client-side routing |
| Rick and Morty API | — | Character data source |

---

## Project Structure

```
character-explorer/
├── dist/                        # Production build output
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── Tabs.jsx             # InfoTab and EpisodesTab nested route components
│   ├── hooks/
│   │   └── useFetch.js          # Custom data fetching hook
│   ├── layouts/
│   │   └── DashboardLayout.jsx  # Sidebar layout wrapping all dashboard routes
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── CharactersPage.jsx   # Character grid with search and pagination
│   │   ├── DetailPage.jsx       # Single character view with tab navigation
│   │   └── EditCharacterPage.jsx
│   ├── utils/
│   │   └── characterStorage.js  # localStorage read/write utilities
│   ├── App.jsx                  # Route definitions
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles and CSS variables
├── index.html
├── package.json
└── vite.config.js
```

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | — | Redirects to `/dashboard` |
| `/dashboard` | `HomePage` | Landing page |
| `/dashboard/characters` | `CharactersPage` | Character grid with search and pagination |
| `/dashboard/characters/:id` | `DetailPage` | Character detail with Info and Episodes tabs |
| `/dashboard/characters/:id/edit` | `EditCharacterPage` | Edit or delete a character |
| `/dashboard/about` | `AboutPage` | About page |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/01brandon/character-explorer.git
cd character-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## Data Persistence

Character edits and deletions are stored in the browser's localStorage under the key `character-explorer.characters`. No backend or database is required. Changes persist across sessions and are merged with live API data on each page load.

---

## API Reference

This project uses the [Rick and Morty API](https://rickandmortyapi.com/) — a free, public REST API. No authentication or API key is required.

Endpoints used:

```
GET https://rickandmortyapi.com/api/character              # Paginated character list
GET https://rickandmortyapi.com/api/character/:id          # Single character by ID
GET https://rickandmortyapi.com/api/episode/:ids           # Batch episode fetch by IDs
```
