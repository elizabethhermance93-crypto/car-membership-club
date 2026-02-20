"use client";

import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 550;
const FADE_OUT_MS = 220;
const HERO_READY_EVENT = "app-hero-ready";
const HERO_WAIT_FALLBACK_MS = 1400;

type SplashPhase = "show" | "hide" | "done";

export function AppSplashScreen() {
  const [phase, setPhase] = useState<SplashPhase>("show");
  const [carSrc, setCarSrc] = useState("/splash/car-user.png");

  useEffect(() => {
    let heroReady = false;
    let minElapsed = false;
    let minTimer: ReturnType<typeof setTimeout> | null = null;
    let heroFallbackTimer: ReturnType<typeof setTimeout> | null = null;
    let doneTimer: ReturnType<typeof setTimeout> | null = null;

    const maybeHide = () => {
      if (heroReady && minElapsed) {
        setPhase("hide");
        doneTimer = setTimeout(() => {
          setPhase("done");
        }, FADE_OUT_MS);
      }
    };

    const onHeroReady = () => {
      heroReady = true;
      maybeHide();
    };

    minTimer = setTimeout(() => {
      minElapsed = true;
      maybeHide();
    }, MIN_VISIBLE_MS);

    // If this route doesn't include Hero, do not block forever.
    heroFallbackTimer = setTimeout(() => {
      onHeroReady();
    }, HERO_WAIT_FALLBACK_MS);

    window.addEventListener(HERO_READY_EVENT, onHeroReady as EventListener);

    return () => {
      window.removeEventListener(HERO_READY_EVENT, onHeroReady as EventListener);
      if (minTimer) clearTimeout(minTimer);
      if (heroFallbackTimer) clearTimeout(heroFallbackTimer);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const source = "/splash/car-user.png";
    const img = new window.Image();
    img.src = source;
    img.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;

      // Remove near-white matte background while preserving vehicle highlights.
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const maxChannel = Math.max(r, g, b);
        const minChannel = Math.min(r, g, b);
        const spread = maxChannel - minChannel;
        const avg = (r + g + b) / 3;

        if (avg > 248 && spread < 10) {
          data[i + 3] = 0;
        } else if (avg > 232 && spread < 18) {
          data[i + 3] = Math.min(data[i + 3], 80);
        }
      }

      ctx.putImageData(frame, 0, 0);
      try {
        const result = canvas.toDataURL("image/png");
        setCarSrc(result);
      } catch {
        setCarSrc(source);
      }
    };
    img.onerror = () => {
      if (!cancelled) setCarSrc(source);
    };
    return () => {
      cancelled = true;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`app-splash ${phase === "hide" ? "is-hiding" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading website"
    >
      <div className="app-splash__content">
        <p className="app-splash__title">Loading your ride...</p>
        <div className="app-splash__track" aria-hidden="true">
          <div className="app-splash__lane"></div>
          <div className="app-splash__car">
            <img
              src={carSrc}
              alt=""
              className="app-splash__car-image"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
