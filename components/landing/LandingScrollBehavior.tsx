"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  Children,
} from "react";
import { prefersReducedMotion } from "@/lib/motion";

const BODY_CLASS = "landing-scroll-snap";
const SECTION_TRANSITION_MS = 600;
const LOCK_MS = 800;
const WHEEL_THRESHOLD = 60;
const TOUCH_THRESHOLD = 50;
const SECTION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type LandingScrollBehaviorProps = { children: ReactNode };

export function LandingScrollBehavior({ children }: LandingScrollBehaviorProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const childArray = Children.toArray(children);
  const sectionCount = childArray.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionToIndex, setTransitionToIndex] = useState<number | null>(null);
  const [transitionFromIndex, setTransitionFromIndex] = useState<number | null>(
    null
  );
  const isTransitioning = transitionToIndex !== null;

  const wheelAccumulator = useRef(0);
  const lockUntil = useRef(0);
  const touchStartY = useRef(0);
  const activeIndexRef = useRef(activeIndex);
  const transitionToIndexRef = useRef(transitionToIndex);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  activeIndexRef.current = activeIndex;
  transitionToIndexRef.current = transitionToIndex;

  const goTo = useCallback(
    (nextIndex: number) => {
      const current = activeIndexRef.current;
      const transitioning = transitionToIndexRef.current !== null;
      if (nextIndex < 0 || nextIndex >= sectionCount) return;
      if (nextIndex === current) return;
      if (transitioning) return;
      if (reduceMotion) return;

      const now = Date.now();
      if (now < lockUntil.current) return;

      lockUntil.current = now + LOCK_MS;
      setTransitionFromIndex(current);
      setTransitionToIndex(nextIndex);

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      transitionTimerRef.current = setTimeout(() => {
        setActiveIndex(nextIndex);
        setTransitionToIndex(null);
        setTransitionFromIndex(null);
        transitionTimerRef.current = null;
      }, SECTION_TRANSITION_MS);
    },
    [sectionCount, reduceMotion]
  );

  const goNext = useCallback(() => {
    goTo(activeIndexRef.current + 1);
  }, [goTo]);
  const goPrev = useCallback(() => {
    goTo(activeIndexRef.current - 1);
  }, [goTo]);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      wheelAccumulator.current += e.deltaY;
      if (wheelAccumulator.current >= WHEEL_THRESHOLD) {
        wheelAccumulator.current = 0;
        goNext();
      } else if (wheelAccumulator.current <= -WHEEL_THRESHOLD) {
        wheelAccumulator.current = 0;
        goPrev();
      } else {
        wheelAccumulator.current = Math.max(
          -WHEEL_THRESHOLD,
          Math.min(WHEEL_THRESHOLD, wheelAccumulator.current)
        );
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "button, a, input, textarea, [contenteditable=true]"
      );
      if (key === " " && !e.repeat && !isInteractive) {
        e.preventDefault();
        goNext();
      } else if (key === "ArrowDown" || key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (key === "ArrowUp" || key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 0) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (delta > TOUCH_THRESHOLD) goNext();
      else if (delta < -TOUCH_THRESHOLD) goPrev();
    };

    const opts = { passive: false as const, capture: true };
    document.addEventListener("wheel", onWheel, opts);
    document.addEventListener("keydown", onKeyDown, { capture: true });
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("wheel", onWheel, opts);
      document.removeEventListener("keydown", onKeyDown, { capture: true });
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev, reduceMotion]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onScrollTop = () => {
      if (reduceMotion) {
        setActiveIndex(0);
        setTransitionToIndex(null);
        setTransitionFromIndex(null);
        return;
      }

      // Force top transition even if a previous wheel/touch lock is active.
      lockUntil.current = 0;
      const current = transitionToIndexRef.current ?? activeIndexRef.current;
      if (current === 0) return;

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      setTransitionFromIndex(current);
      setTransitionToIndex(0);
      lockUntil.current = Date.now() + LOCK_MS;
      transitionTimerRef.current = setTimeout(() => {
        setActiveIndex(0);
        setTransitionToIndex(null);
        setTransitionFromIndex(null);
        transitionTimerRef.current = null;
      }, SECTION_TRANSITION_MS);
    };

    window.addEventListener("landing-scroll-to-top", onScrollTop);
    return () => {
      window.removeEventListener("landing-scroll-to-top", onScrollTop);
    };
  }, [goTo, reduceMotion]);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    document.documentElement.classList.add(BODY_CLASS);
    document.body.classList.add(BODY_CLASS);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    return () => {
      document.documentElement.classList.remove(BODY_CLASS);
      document.body.classList.remove(BODY_CLASS);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return <>{children}</>;
  }

  const displayIndex = transitionToIndex !== null ? transitionToIndex : activeIndex;

  return (
    <div className="landing-fullpage">
      <div
        className="landing-fullpage-strip flex flex-col w-full"
        style={{
          height: `${sectionCount * 100}vh`,
          transform: `translateY(-${displayIndex * 100}vh)`,
          transition: `transform ${SECTION_TRANSITION_MS}ms ${SECTION_EASE}`,
        }}
      >
        {childArray.map((child, index) => {
          const isEntering = transitionToIndex === index;
          const isExiting = transitionFromIndex === index;
          const isActive = activeIndex === index && !isTransitioning;
          const contentClass = [
            "landing-section-content min-h-screen w-full",
            isActive ? "is-active" : "",
            isEntering ? "is-entering" : "",
            isExiting ? "is-exiting" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <section
              key={index}
              className="landing-section min-h-screen min-w-full shrink-0"
              style={{ height: "100vh" }}
              data-section-index={index}
            >
              <div className={contentClass}>{child}</div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
