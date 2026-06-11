import { useCallback, useEffect, useRef, useState } from "react";
import type { AsciiRenderResult, StudioSettings } from "../lib/ascii";

interface UseAsciiWorkerOptions {
  onResult?: (result: AsciiRenderResult) => void;
  onError?: (error: string) => void;
}

interface ConversionRequest {
  imageData: ImageData;
  settings: StudioSettings;
  sourceWidth: number;
  sourceHeight: number;
}

export function useAsciiWorker(options: UseAsciiWorkerOptions = {}) {
  const workerRef = useRef<Worker | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<AsciiRenderResult | null>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL("../lib/ascii.worker.ts", import.meta.url),
      { type: "module" },
    );

    worker.onmessage = (e: MessageEvent<AsciiRenderResult>) => {
      setIsProcessing(false);
      setLastResult(e.data);
      options.onResult?.(e.data);
    };

    worker.onerror = (e) => {
      setIsProcessing(false);
      const msg = `Worker error: ${e.message}`;
      options.onError?.(msg);
    };

    workerRef.current = worker;

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const convert = useCallback(
    (request: ConversionRequest) => {
      const worker = workerRef.current;
      if (!worker) return;

      setIsProcessing(true);
      worker.postMessage(request);
    },
    [],
  );

  const terminate = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    setIsProcessing(false);
  }, []);

  return { convert, isProcessing, lastResult, terminate };
}
