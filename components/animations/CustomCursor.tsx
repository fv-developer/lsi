"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on fine pointer devices (desktop with mouse)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial centered transforms
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      pointerEvents: "none",
    });

    // Create high-performance quickTo setters
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

    let isVisible = false;

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }

      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleMouseLeave = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    const handleMouseEnter = () => {
      isVisible = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
    };

    // Hover detection on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor]'
      );

      if (interactiveEl) {
        gsap.to(ring, {
          scale: 1.6,
          backgroundColor: "rgba(51, 65, 128, 0.2)",
          borderColor: "rgba(51, 65, 128, 0.4)",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 0.6,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor]'
      );

      if (interactiveEl) {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(161, 161, 170, 0.3)",
          borderColor: "rgba(161, 161, 170, 0.4)",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Outer Semi-Transparent Ring (44px) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[44px] h-[44px] rounded-full bg-zinc-400/30 border border-zinc-400/40 pointer-events-none z-[99999] will-change-transform"
      />

      {/* Inner Accent Dot (#334180 / 14px) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[14px] h-[14px] rounded-full bg-[#334180] pointer-events-none z-[99999] will-change-transform shadow-[0_0_8px_rgba(51,65,128,0.6)]"
      />
    </>
  );
}

export default CustomCursor;
