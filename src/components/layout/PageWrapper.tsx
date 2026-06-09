import type { ReactNode } from "react";

export function PageWrapper({ children, studio }: { children: ReactNode; studio?: boolean }) {
  return (
    <>
      <div className="void-grid-bg" />
      <div className="noise-overlay" />
      <div className={`app-shell ${studio ? "app-shell--studio" : ""}`}>
        {children}
      </div>
    </>
  );
}
