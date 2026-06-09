interface StatusDotProps {
  status?: "success" | "warning" | "error" | "info";
  label?: string;
}

const colors = {
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--error)",
  info: "var(--info)",
};

export function StatusDot({ status = "success", label }: StatusDotProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "var(--text-xs)", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
      <span
        style={{
          width: 8, height: 8, borderRadius: "50%",
          background: colors[status],
          boxShadow: `0 0 0 0 ${colors[status]}66`,
          animation: "pulse-dot 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
          display: "inline-block",
        }}
      />
      {label}
    </span>
  );
}
