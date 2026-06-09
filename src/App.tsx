import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { StudioPage } from "./pages/StudioPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AboutPage } from "./pages/AboutPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthPage } from "./pages/AuthPage";
import { PricingPage } from "./pages/PricingPage";
import { ChangelogPage } from "./pages/ChangelogPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
