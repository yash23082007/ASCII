import { Outlet } from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import { PageWrapper } from "./layout/PageWrapper";
import { ParticleBackground } from "./ui/ParticleBackground";

export function Layout() {
  return (
    <>
      {/* Background layers */}
      <ParticleBackground />
      <div className="radial-glow-bg" />
      <div className="void-grid-bg" />
      <div className="noise-overlay" />

      <PageWrapper>
        <Navbar />
        <main style={{ paddingTop: "var(--space-4)", minHeight: "80vh" }}>
          <Outlet />
        </main>
        <Footer />
      </PageWrapper>
    </>
  );
}
