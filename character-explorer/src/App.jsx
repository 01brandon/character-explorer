import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CharactersPage from "./pages/CharactersPage";
import DetailPage from "./pages/DetailPage";
import { InfoTab, EpisodesTab } from "./components/Tabs";

// root route tree — all routes live under /dashboard
export default function App() {
  return (
    <Routes>
      {/* redirect / to /dashboard automatically */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="characters" element={<CharactersPage />} />
        <Route path="characters/:id" element={<DetailPage />}>
          <Route index element={<InfoTab />} />
          <Route path="info" element={<InfoTab />} />
          <Route path="episodes" element={<EpisodesTab />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}