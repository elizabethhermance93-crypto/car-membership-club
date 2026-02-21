"use client";

import { useEffect, useState } from "react";

/**
 * Thin indeterminate line spinner at the top of the page (e.g. while search results load).
 * Runs on mount, then fades out after a short duration.
 */
export function LineSpinner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-1 overflow-hidden bg-amber-500/20"
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full w-1/2 animate-line-spinner rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500"
        style={{ boxShadow: "0 0 10px rgba(251,191,36,0.5)" }}
      />
    </div>
  );
}
