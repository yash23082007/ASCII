import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  style?: React.CSSProperties;
}

export function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1500, style }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const numericValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;
    if (isNaN(numericValue)) {
      setDisplayed(String(value));
      return;
    }

    const isDecimal = String(value).includes(".");
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      const current = numericValue * eased;
      setDisplayed(isDecimal ? current.toFixed(2) : Math.round(current).toLocaleString());

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayed(typeof value === "string" ? value : numericValue.toLocaleString());
      }
    };

    requestAnimationFrame(tick);
  }, [started, value, duration]);

  return (
    <span ref={ref} style={style}>
      {prefix}{displayed}{suffix}
    </span>
  );
}
