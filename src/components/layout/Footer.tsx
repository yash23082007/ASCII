export function Footer() {
  const techs = ["Next.js", "FastAPI", "PyTorch", "OpenCV"];

  return (
    <footer style={{ borderTop: "1px solid var(--border-muted)", marginTop: "var(--space-8)", padding: "var(--space-8) 0 var(--space-6)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "var(--space-6)", alignItems: "start" }}>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--text-primary)" }}>
            ⬡ ASCII Vision Studio AI
          </span>
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: "36ch" }}>
            Transform Visual Media into Intelligent Text Art
          </span>
        </div>

        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
          {["Studio", "Gallery", "About", "Analytics", "GitHub", "Contact"].map((item) => (
            <a key={item} href="#" style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
              {item}
            </a>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "var(--space-6)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border-subtle)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "var(--space-4)", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {techs.map((tech) => (
            <span key={tech} style={{ padding: "0.25rem 0.65rem", borderRadius: 999, fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", background: "var(--bg-raised)", border: "1px solid var(--border-visible)", color: "var(--text-muted)" }}>
              {tech}
            </span>
          ))}
        </div>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>© 2025 ASCII Vision</span>
      </div>
    </footer>
  );
}
