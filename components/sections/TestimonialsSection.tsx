"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { SplitText } from "@/components/common/SplitText";

export interface StudentJourney {
  id: string;
  photo: string;
  videoUrl: string;
}

// Exactly 5 video thumbnail cards
const studentJourneys: StudentJourney[] = [
  {
    id: "sj-1",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-female-scientist-holding-a-glass-tube-in-a-41444-large.mp4",
  },
  {
    id: "sj-2",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "/images/about-us/LSI.mp4",
  },
  {
    id: "sj-3",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    videoUrl: "/images/about-us/LSI.mp4",
  },
  {
    id: "sj-4",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-medical-laboratory-researcher-looking-at-a-microscope-41441-large.mp4",
  },
  {
    id: "sj-5",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "/images/about-us/LSI.mp4",
  },
];

// 5 copies (25 items) for seamless infinite loop buffer
const extendedJourneys = [
  ...studentJourneys,
  ...studentJourneys,
  ...studentJourneys,
  ...studentJourneys,
  ...studentJourneys,
];

// Safe middle index (5 * 2 + 2 = 12)
const INITIAL_INDEX = studentJourneys.length * 2 + 2;

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Drag & Swipe tracking
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartXRef = useRef<number>(0);
  const mouseStartXRef = useRef<number>(0);
  const isMouseDownRef = useRef<boolean>(false);

  const [containerWidth, setContainerWidth] = useState(1440);

  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setContainerWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Exact card dimensions per distance level
  const getCardDimensions = useCallback((distance: number) => {
    if (containerWidth >= 1440) {
      if (distance === 0) return { width: 280, height: 470, opacity: 1 };
      if (distance === 1) return { width: 220, height: 415, opacity: 0.8 };
      if (distance === 2) return { width: 175, height: 365, opacity: 0.55 };
      return { width: 145, height: 325, opacity: 0.35 };
    }
    if (containerWidth >= 1024) {
      if (distance === 0) return { width: 250, height: 435, opacity: 1 };
      if (distance === 1) return { width: 195, height: 385, opacity: 0.8 };
      if (distance === 2) return { width: 155, height: 340, opacity: 0.55 };
      return { width: 130, height: 300, opacity: 0.35 };
    }
    if (containerWidth >= 768) {
      if (distance === 0) return { width: 230, height: 400, opacity: 1 };
      if (distance === 1) return { width: 180, height: 355, opacity: 0.8 };
      if (distance === 2) return { width: 140, height: 315, opacity: 0.5 };
      return { width: 115, height: 280, opacity: 0.3 };
    }
    // Mobile viewport
    const baseW = Math.min(260, Math.floor(containerWidth * 0.72));
    if (distance === 0) return { width: baseW, height: 400, opacity: 1 };
    if (distance === 1) return { width: Math.floor(baseW * 0.76), height: 350, opacity: 0.75 };
    return { width: Math.floor(baseW * 0.58), height: 310, opacity: 0.4 };
  }, [containerWidth]);

  // Calculate center X coordinate of each card so EVERY visual edge-to-edge gap is ALWAYS a constant 16px!
  const getCardCenter = useCallback((index: number, activeIdx: number) => {
    const cx = containerWidth / 2 + dragOffset;
    if (index === activeIdx) return cx;

    const gap = containerWidth >= 1280 ? 16 : 12;
    const step = index > activeIdx ? 1 : -1;
    let currentCenter = cx;

    for (let i = activeIdx; i !== index; i += step) {
      const nextI = i + step;
      const dCurr = Math.abs(i - activeIdx);
      const dNext = Math.abs(nextI - activeIdx);
      const wCurr = getCardDimensions(dCurr).width;
      const wNext = getCardDimensions(dNext).width;
      currentCenter += step * ((wCurr + wNext) / 2 + gap);
    }

    return currentCenter;
  }, [containerWidth, dragOffset, getCardDimensions]);

  // Re-enable smooth transition right after an invisible position teleport
  useEffect(() => {
    if (!isTransitioning) {
      const frameId = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    setPlayingCardId(null);
    setIsTransitioning(true);
    setActiveIndex((prev) => {
      const nextIdx = prev + 1;
      if (nextIdx >= studentJourneys.length * 3) {
        setTimeout(() => {
          setIsTransitioning(false);
          setActiveIndex(nextIdx - studentJourneys.length);
        }, 650);
      }
      return nextIdx;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setPlayingCardId(null);
    setIsTransitioning(true);
    setActiveIndex((prev) => {
      const prevIdx = prev - 1;
      if (prevIdx < studentJourneys.length * 2) {
        setTimeout(() => {
          setIsTransitioning(false);
          setActiveIndex(prevIdx + studentJourneys.length);
        }, 650);
      }
      return prevIdx;
    });
  }, []);

  // AUTO SLIDE & LOOP: automatically advance every 3.5s, pause on hover, drag, or video play
  useEffect(() => {
    if (isHovered || isDragging || playingCardId !== null) return;

    const autoSlideTimer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(autoSlideTimer);
  }, [handleNext, isHovered, isDragging, playingCardId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDownRef.current = true;
    setIsDragging(true);
    mouseStartXRef.current = e.clientX;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current) return;
    const delta = e.clientX - mouseStartXRef.current;
    setDragOffset(delta);
  };

  const handleMouseUp = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    setIsDragging(false);
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    touchStartXRef.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - touchStartXRef.current;
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  return (
    <section 
      className="w-full relative py-12 lg:py-16 text-white overflow-hidden border-t border-white/10 select-none"
      style={{
        background: "linear-gradient(145deg, rgb(50, 68, 108) 0%, rgb(55, 108, 16) 100%)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background ambient grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* TOP HEADER: Full Width Header & Navigation Arrows */}
      <div className="w-full max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 mb-8 sm:mb-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          {/* Left: Original Size Heading & Description */}
          <div className="max-w-3xl">
            <SplitText
              text="Student Journeys"
              tag="h2"
              splitType="chars"
              textAlign="left"
              useScrollTrigger={true}
              delay={25}
              duration={0.7}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight mb-4"
            />

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
              Hear directly from our success stories who transformed their futures at Lifeness Science Institute. Our students share their personal experiences, placement paths, and career-readiness guidance.
            </p>
          </div>

          {/* Right: Circular Navigation Arrow Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              onClick={handlePrev}
              aria-label="Previous story"
              className="w-11 h-11 rounded-full border border-white/25 hover:border-white bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 active:scale-95 group shadow-md"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next story"
              className="w-11 h-11 rounded-full border border-white/25 hover:border-white bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 active:scale-95 group shadow-md"
            >
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* FULL WIDTH SLIDER TRACK: Exact Constant 16px Gaps Between All Cards */}
      <div
        className="w-full relative h-[480px] sm:h-[510px] lg:h-[530px] cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedJourneys.map((item, index) => {
          const distance = Math.abs(index - activeIndex);
          // Only render visible buffer cards (within 4 steps of active center)
          if (distance > 4) return null;

          const isCenter = distance === 0;
          const { width, height, opacity } = getCardDimensions(distance);
          const center = getCardCenter(index, activeIndex);
          const left = center - width / 2;
          const zIndex = isCenter ? 30 : 20 - distance;
          const isPlaying = playingCardId === `${item.id}-${index}`;

          return (
            <div
              key={`${item.id}-${index}`}
              className="absolute top-1/2 cursor-pointer flex items-center justify-center"
              style={{
                left: 0,
                width: `${width}px`,
                height: `${height}px`,
                opacity: opacity,
                zIndex: zIndex,
                transform: `translate3d(${left}px, -50%, 0)`,
                transition: isTransitioning
                  ? "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), width 0.65s cubic-bezier(0.25, 1, 0.5, 1), height 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s cubic-bezier(0.25, 1, 0.5, 1)"
                  : "none",
                willChange: "transform, width, height, opacity",
              }}
              onClick={() => {
                if (!isCenter) {
                  setPlayingCardId(null);
                  setIsTransitioning(true);
                  setActiveIndex(index);
                }
              }}
            >
              {/* Visual Card: Full-Bleed Video Thumb Image (No Text) */}
              <div
                className={`relative w-full h-full rounded-[22px] overflow-hidden group flex flex-col justify-between bg-slate-900 ${
                  isCenter ? "shadow-[0_25px_60px_rgba(0,0,0,0.95)]" : "shadow-xl"
                }`}
              >
                {/* Subtle ring border on active center card */}
                {isCenter && (
                  <div className="absolute inset-0 rounded-[22px] ring-2 ring-white/40 pointer-events-none z-30" />
                )}

                {/* Dark overlay on non-active cards so center card pops */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-black/30 pointer-events-none z-20 transition-opacity duration-300" />
                )}

                {/* INLINE VIDEO PLAYBACK (plays in place inside the card) */}
                {isPlaying ? (
                  <div className="relative w-full h-full bg-black rounded-[22px] overflow-hidden z-40">
                    <video
                      src={item.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover rounded-[22px]"
                      onEnded={() => setPlayingCardId(null)}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingCardId(null);
                      }}
                      aria-label="Close Video"
                      className="absolute top-3 right-3 z-50 w-7 h-7 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center border border-white/30 transition-all shadow-lg"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Full-bleed Video Thumbnail Image (Zero Text) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.photo}
                      alt="Student Story Video Thumbnail"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    />

                    {/* Subtle bottom gradient for play button contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none z-10" />

                    {/* BOTTOM-RIGHT: Circular Play Button */}
                    <div className="absolute bottom-3.5 right-3.5 z-30">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isCenter) {
                            setIsTransitioning(true);
                            setActiveIndex(index);
                          }
                          setPlayingCardId(`${item.id}-${index}`);
                        }}
                        aria-label="Play video"
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 border flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-md ${
                          isCenter
                            ? "border-amber-400/90 shadow-[0_0_15px_rgba(249,216,104,0.45)] ring-1 ring-amber-400/50"
                            : "border-white/40"
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white translate-x-0.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TestimonialsSection;
