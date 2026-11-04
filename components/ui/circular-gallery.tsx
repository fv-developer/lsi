"use client";

import React, { useState, useEffect, useRef, HTMLAttributes } from "react";

// Utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling/dragging. */
  autoRotateSpeed?: number;
  /** Optional external controlled rotation (e.g. driven by sticky scroll) */
  controlledRotation?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 480, autoRotateSpeed = 0.04, controlledRotation, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [effectiveRadius, setEffectiveRadius] = useState(radius);
    const startXRef = useRef(0);
    const startRotationRef = useRef(0);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Responsive radius calculation so all cards orbit comfortably
    useEffect(() => {
      const updateRadius = () => {
        const w = window.innerWidth;
        if (w < 640) {
          setEffectiveRadius(320);
        } else if (w < 1024) {
          setEffectiveRadius(400);
        } else {
          setEffectiveRadius(radius || 480);
        }
      };
      updateRadius();
      window.addEventListener("resize", updateRadius);
      return () => window.removeEventListener("resize", updateRadius);
    }, [radius]);

    // Handle scroll-based rotation (only when NOT controlled externally)
    useEffect(() => {
      if (controlledRotation !== undefined) return;

      const handleScroll = () => {
        if (isDragging) return;
        setIsInteracting(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360 * 1.5;
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsInteracting(false);
        }, 150);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [isDragging, controlledRotation]);

    // Handle auto-rotation when idle (only when NOT controlled externally)
    useEffect(() => {
      if (controlledRotation !== undefined) return;

      const autoRotate = () => {
        if (!isInteracting && !isDragging) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isInteracting, isDragging, autoRotateSpeed, controlledRotation]);

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      startXRef.current = e.clientX;
      startRotationRef.current = controlledRotation !== undefined ? dragOffset : rotation;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startXRef.current;
      if (controlledRotation !== undefined) {
        setDragOffset(startRotationRef.current + deltaX * 0.35);
      } else {
        setRotation(startRotationRef.current + deltaX * 0.35);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Touch swipe handlers for mobile
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length === 1) {
        setIsDragging(true);
        startXRef.current = e.touches[0].clientX;
        startRotationRef.current = controlledRotation !== undefined ? dragOffset : rotation;
      }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - startXRef.current;
      if (controlledRotation !== undefined) {
        setDragOffset(startRotationRef.current + deltaX * 0.35);
      } else {
        setRotation(startRotationRef.current + deltaX * 0.35);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    const activeRotation = controlledRotation !== undefined ? controlledRotation + dragOffset : rotation;
    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Student Life Gallery"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "relative w-full h-[320px] sm:h-[360px] md:h-[400px] flex items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing",
          className
        )}
        style={{ perspective: "1200px" }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${activeRotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = activeRotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);

            // Smooth opacity decay so ALL 8 slides remain visible in 3D rotation
            const opacity = Math.max(0.4, 1 - (normalizedAngle / 180) * 0.55);

            return (
              <div
                key={item.photo.url + i}
                role="group"
                aria-label={item.common}
                className="absolute w-[240px] sm:w-[280px] md:w-[320px] h-[150px] sm:h-[180px] md:h-[200px]"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px)`,
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center center",
                  opacity: opacity,
                  transition: "opacity 0.25s linear",
                }}
              >
                <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden group border border-white/20 bg-white/10 backdrop-blur-md">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    style={{ objectPosition: item.photo.pos || "center" }}
                  />
                  {/* Bottom Overlay: Title only wrapped in p */}
                  <div className="absolute bottom-0 left-0 w-full p-3 sm:p-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                    <p className="text-xs sm:text-sm font-bold font-heading uppercase tracking-wide drop-shadow-md text-white leading-tight">
                      {item.common}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
