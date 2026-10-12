"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { SplitText } from "@/components/common/SplitText";

export interface VideoTestimonial {
  id: string;
  category: string;
  studentRole: string;
  name: string;
  thumbnail: string;
  videoUrl: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: "vt-1",
    category: "DIGITAL MEDIA & MARKETING",
    studentRole: "BBA STUDENT",
    name: "Mittali Banerjee",
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-medical-laboratory-researcher-looking-at-a-microscope-41441-large.mp4",
  },
  {
    id: "vt-2",
    category: "BUSINESS ADMINISTRATION",
    studentRole: "BBA STUDENT",
    name: "Ishika Jadhav",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-female-scientist-holding-a-glass-tube-in-a-41444-large.mp4",
  },
  {
    id: "vt-3",
    category: "ARTIFICIAL INTELLIGENCE",
    studentRole: "BBA STUDENT",
    name: "Tanisi Shah",
    thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-female-doctor-explaining-a-treatment-plan-to-a-patient-42867-large.mp4",
  },
  {
    id: "vt-4",
    category: "INTEGRATIVE NUTRITION",
    studentRole: "B.SC. NUTRITION STUDENT",
    name: "Aniket Verma",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-medical-laboratory-researcher-looking-at-a-microscope-41441-large.mp4",
  },
  {
    id: "vt-5",
    category: "CLINICAL RESEARCH",
    studentRole: "M.SC. DIETETICS ALUMNA",
    name: "Radhika Deshmukh",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-female-scientist-holding-a-glass-tube-in-a-41444-large.mp4",
  },
];

// Extended list for infinite smooth carousel loop
const extendedTestimonials = [...videoTestimonials, ...videoTestimonials, ...videoTestimonials];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(videoTestimonials.length);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);

  const touchStartXRef = useRef<number>(0);
  const mouseStartXRef = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Responsive cards calculation (3 cards on desktop)
  useEffect(() => {
    const updateCardsToShow = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setCardsToShow(3);
      } else if (w >= 640) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex >= videoTestimonials.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - videoTestimonials.length);
    } else if (currentIndex < videoTestimonials.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + videoTestimonials.length);
    }
  };

  const handleNext = () => {
    setPlayingCardId(null);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPlayingCardId(null);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    mouseStartXRef.current = e.clientX;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - mouseStartXRef.current;
    setDragOffset(delta);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -40) {
      handleNext();
    } else if (dragOffset > 40) {
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
    if (dragOffset < -40) {
      handleNext();
    } else if (dragOffset > 40) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const itemWidthPercent = 100 / cardsToShow;
  const translationPercent = -(currentIndex * itemWidthPercent);

  return (
    <section 
      className="w-full relative py-16 sm:py-24 text-white overflow-hidden border-t border-white/10"
      style={{
        background: "linear-gradient(145deg, rgb(50, 68, 108) 0%, rgb(55, 108, 16) 100%)",
      }}
    >
      {/* Background ambient grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading, Description & Nav Buttons */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            {/* Main Section Heading: Student Journeys */}
            <SplitText
              text="Student Journeys"
              tag="h2"
              splitType="chars"
              textAlign="left"
              useScrollTrigger={true}
              delay={25}
              duration={0.7}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight mb-6"
            />

            {/* Description Paragraph */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-lg">
              Hear directly from our success stories who transformed their futures at Lifeness Science Institute. Our students share their personal experiences, placement paths, and career-readiness guidance.
            </p>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                aria-label="Previous Story"
                style={{ borderRadius: "10px" }}
                className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-500/40 text-white transition-all duration-300 active:scale-95 shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Story"
                style={{ borderRadius: "10px" }}
                className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-500/40 text-white transition-all duration-300 active:scale-95 shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Video Cards Slider Track */}
          <div className="lg:col-span-8 w-full overflow-hidden select-none cursor-grab active:cursor-grabbing">
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-full"
            >
              <div
                ref={trackRef}
                className="flex"
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translate3d(calc(${translationPercent}% + ${dragOffset}px), 0, 0)`,
                  transition: isDragging || !isTransitioning ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                {extendedTestimonials.map((item, index) => {
                  const isPlaying = playingCardId === `${item.id}-${index}`;

                  return (
                    <div
                      key={`${item.id}-${index}`}
                      className="px-2 sm:px-2.5 shrink-0"
                      style={{ width: `${itemWidthPercent}%` }}
                    >
                      {/* Video Card */}
                      <div className="relative h-[420px] sm:h-[460px] w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-slate-900 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/10">
                        {isPlaying ? (
                          /* Inline Video Player in same place */
                          <div className="relative w-full h-full bg-black">
                            <video
                              src={item.videoUrl}
                              controls
                              autoPlay
                              className="w-full h-full object-cover"
                              onEnded={() => setPlayingCardId(null)}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPlayingCardId(null);
                              }}
                              aria-label="Close Video"
                              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all shadow-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          /* Card Poster & Play Overlay */
                          <div
                            onClick={() => setPlayingCardId(`${item.id}-${index}`)}
                            className="relative w-full h-full cursor-pointer"
                          >
                            {/* Card Thumbnail Image */}
                            <img
                              src={item.thumbnail}
                              alt={item.name}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                            />

                            {/* Top & Bottom Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

                            {/* Top Category Title */}
                            <div className="absolute top-0 left-0 right-0 p-5 z-10 text-center">
                              <span className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider font-heading drop-shadow-md block leading-tight">
                                {item.category}
                              </span>
                            </div>

                            {/* Center Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 border border-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:border-emerald-400 shadow-xl">
                                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                              </div>
                            </div>

                            {/* Bottom Student Details */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-left">
                              <span className="text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-widest block mb-1 font-mono">
                                {item.studentRole}
                              </span>
                              <h4 className="text-lg sm:text-xl font-extrabold text-white font-heading leading-tight drop-shadow-md">
                                {item.name}
                              </h4>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
