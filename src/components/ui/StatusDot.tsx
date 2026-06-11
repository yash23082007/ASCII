interface StatusDotProps {
  status?: "success" | "warning" | "error" | "info" | "idle";
  label?: string;
  pulse?: boolean;
}

const colors: Record<string, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--error)",
  info: "var(--info)",
  idle: "var(--text-muted)",
};

export function StatusDot({ status = "success", label, pulse = true }: StatusDotProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: colors[status],
          display: "inline-block",
          flexShrink: 0,
          animation: pulse ? "pulse-dot 2.5s infinite" : "none",
          boxShadow: `0 0 6px ${colors[status]}`,
        }}
      />
      {label && (
        <span style={{
          fontSize: "var(--text-xs)",
          color: colors[status],
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          {label}
        </span>
      )}
    </div>
  );
}
