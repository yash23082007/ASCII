import { Outlet } from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import { PageWrapper } from "./layout/PageWrapper";

export function Layout() {
  return (
    <PageWrapper>
      <Navbar />
      <main style={{ paddingTop: "var(--space-6)", minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
    </PageWrapper>
  );
}
