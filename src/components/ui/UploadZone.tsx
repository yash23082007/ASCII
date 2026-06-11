import { type DragEvent, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, File, Image, X } from "lucide-react";

interface UploadZoneProps {
  onFile: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function UploadZone({ onFile, accept = "image/*", maxSizeMB = 12 }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File too large (max ${maxSizeMB}MB)`);
        return;
      }
      onFile(file);
    },
    [onFile, maxSizeMB],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragOver(false), []);

  return (
    <motion.div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        borderColor: dragOver
          ? "var(--accent-primary)"
          : error
            ? "var(--accent-error, #ef4444)"
            : "var(--border-muted)",
      }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "2.5rem 1.5rem",
        borderRadius: "var(--radius-lg)",
        border: "2px dashed var(--border-muted)",
        background: dragOver
          ? "rgba(99, 102, 241, 0.06)"
          : "var(--bg-elevated, rgba(255,255,255,0.02))",
        cursor: "pointer",
        transition: "background 0.2s ease",
        minHeight: 180,
        textAlign: "center",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {dragOver ? (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          style={{ color: "var(--accent-primary)" }}
        >
          <File size={36} />
        </motion.div>
      ) : (
        <div style={{ color: "var(--text-muted)" }}>
          <Upload size={32} />
        </div>
      )}

      <div>
        <p style={{ margin: 0, color: "var(--text-primary)", fontWeight: 500, fontSize: "var(--text-sm)" }}>
          {dragOver ? "Drop image here" : "Upload an image"}
        </p>
        <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)", fontSize: "var(--text-xs)" }}>
          or click to browse &middot; up to {maxSizeMB}MB
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            color: "var(--accent-error, #ef4444)",
            fontSize: "var(--text-xs)",
          }}
        >
          <X size={14} />
          <span>{error}</span>
        </motion.div>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "var(--radius-lg)",
          pointerEvents: "none",
          background: dragOver
            ? "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)"
            : "transparent",
        }}
      />
    </motion.div>
  );
}
