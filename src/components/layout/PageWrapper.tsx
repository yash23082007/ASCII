import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function PageWrapper({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  const isStudio = pathname === "/studio";

  return (
    <div className={`app-shell ${isStudio ? "app-shell--studio" : ""}`} style={{ position: "relative", zIndex: 2 }}>
      {children}
    </div>
  );
}
