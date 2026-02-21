"use client";

import { useState, useEffect } from "react";

/**
 * Preloads image URLs and reports when all are loaded.
 * @param urls - Array of image URLs to preload
 * @returns { ready: boolean, progress: number } ready when all loaded, progress 0..1
 */
export function usePreloadImages(urls: string[]): { ready: boolean; progress: number } {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const urlsKey = urls.join("|");
  const n = urls.length;

  useEffect(() => {
    setLoaded({});
  }, [urlsKey]);

  useEffect(() => {
    if (n === 0) return;
    let cancelled = false;
    const schedule = (fn: () => void) => {
      queueMicrotask(() => {
        if (!cancelled) fn();
      });
    };
    urls.forEach((url, i) => {
      const img = new Image();
      img.onload = () => {
        schedule(() => setLoaded((prev) => ({ ...prev, [i]: true })));
      };
      img.onerror = () => {
        schedule(() => setLoaded((prev) => ({ ...prev, [i]: true })));
      };
      img.src = url;
    });
    return () => {
      cancelled = true;
    };
  }, [urlsKey, n]);

  const count = Object.keys(loaded).length;
  const progress = n === 0 ? 1 : count / n;
  const ready = n > 0 && count >= n;

  return { ready, progress };
}
