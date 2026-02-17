"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  Children,
} from "react";
import { prefersReducedMotion } from "@/lib/motion";

const BODY_CLASS = "landing-scroll-snap";
const SECTION_TRANSITION_MS = 600;
const LOCK_MS = 800;
const WHEEL_THRESHOLD = 80;
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

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= sectionCount) return;
      if (nextIndex === activeIndex) return;
      if (transitionToIndex !== null) return;
      if (reduceMotion) return;

      const now = Date.now();
      if (now < lockUntil.current) return;

      lockUntil.current = now + LOCK_MS;
      setTransitionFromIndex(activeIndex);
      setTransitionToIndex(nextIndex);

      setTimeout(() => {
        setActiveIndex(nextIndex);
        setTransitionToIndex(null);
        setTransitionFromIndex(null);
      }, SECTION_TRANSITION_MS);
    },
    [
      activeIndex,
      sectionCount,
      transitionToIndex,
      reduceMotion,
    ]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (reduceMotion) return;
      e.preventDefault();
      wheelAccumulator.current += e.deltaY;
      if (wheelAccumulator.current >= WHEEL_THRESHOLD) {
        wheelAccumulator.current = 0;
        goNext();
      } else if (wheelAccumulator.current <= -WHEEL_THRESHOLD) {
        wheelAccumulator.current = 0;
        goPrev();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (reduceMotion) return;
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

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    document.body.classList.add(BODY_CLASS);
    return () => document.body.classList.remove(BODY_CLASS);
  }, [reduceMotion]);

  if (reduceMotion) {
    return <>{children}</>;
  }

  const displayIndex = transitionToIndex !== null ? transitionToIndex : activeIndex;

  return (
    <div className="landing-fullpage overflow-hidden h-screen w-full">
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
