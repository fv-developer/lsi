"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { SplitText } from "@/components/common/SplitText";

export interface PlacementRecord {
  id: string;
  name: string;
  photo: string;
  ctc: string;
  designation: string;
  company: string;
}

const placementRecords: PlacementRecord[] = [
  {
    id: "p1",
    name: "Ananya Sharma",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    ctc: "₹14.5 LPA",
    designation: "Clinical Specialist",
    company: "Luke Coutinho Healing",
  },
  {
    id: "p2",
    name: "Rohan Mehta",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    ctc: "₹12.0 LPA",
    designation: "Sports Nutritionist",
    company: "Cult.fit Labs",
  },
  {
    id: "p3",
    name: "Priya Verma",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    ctc: "₹16.0 LPA",
    designation: "Biochemistry Specialist",
    company: "Apollo Hospitals",
  },
  {
    id: "p4",
    name: "Arjun Patel",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    ctc: "₹13.5 LPA",
    designation: "Metabolic Health Consultant",
    company: "Max Healthcare",
  },
  {
    id: "p5",
    name: "Neha Gupta",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    ctc: "₹15.2 LPA",
    designation: "Corporate Wellness Lead",
    company: "Tata 1mg",
  },
  {
    id: "p6",
    name: "Aarav Shah",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    ctc: "₹11.8 LPA",
    designation: "Nutritional Diagnostician",
    company: "Fortis Healthcare",
  },
  {
    id: "p7",
    name: "Siddharth Nair",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    ctc: "₹14.0 LPA",
    designation: "Functional Health Lead",
    company: "QUA Nutrition",
  },
  {
    id: "p8",
    name: "Tanvi Kulkarni",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    ctc: "₹12.8 LPA",
    designation: "Clinical Research Assoc.",
    company: "Nutrabay India",
  },
  {
    id: "p9",
    name: "Kavya Joshi",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    ctc: "₹15.5 LPA",
    designation: "Integrative Care Lead",
    company: "Luke Coutinho Healing",
  },
  {
    id: "p10",
    name: "Vikram Deshmukh",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    ctc: "₹13.2 LPA",
    designation: "Diagnostic Biochemist",
    company: "Metropolis Labs",
  },
  {
    id: "p11",
    name: "Ishita Rao",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    ctc: "₹16.5 LPA",
    designation: "Pediatric Dietitian",
    company: "Rainbow Children's",
  },
  {
    id: "p12",
    name: "Rishi Malhotra",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    ctc: "₹14.2 LPA",
    designation: "Performance Nutritionist",
    company: "Olympic Gold Quest",
  },
];

// Tripled list for infinite continuous loop
const extendedRecords = [...placementRecords, ...placementRecords, ...placementRecords];

export function StudentPlacementsSection() {
  const [currentIndex, setCurrentIndex] = useState(placementRecords.length);
  const [cardsToShow, setCardsToShow] = useState(6);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number>(0);
  const mouseStartXRef = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Responsive cards count calculation (4 cards on desktop)
  useEffect(() => {
    const updateCardsToShow = () => {
      const w = window.innerWidth;
      if (w >= 1280) {
        setCardsToShow(4);
      } else if (w >= 1024) {
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

  // Auto-slide effect (stopped until user confirmation)
  const startAutoSlide = () => {
    stopAutoSlide();
    // Auto slide disabled for manual navigation
  };

  const stopAutoSlide = () => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [cardsToShow, currentIndex]);

  // Seamless continuous loop reset
  const handleTransitionEnd = () => {
    if (currentIndex >= placementRecords.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - placementRecords.length);
    } else if (currentIndex < placementRecords.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + placementRecords.length);
    }
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    stopAutoSlide();
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
    stopAutoSlide();
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
    <section className="w-full relative py-16 sm:py-24 bg-[#f8fafc] text-slate-900 overflow-hidden border-t border-slate-200">
      {/* Background light grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Background ambient light tint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Header Row: Heading Left & Nav Controls Right */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-10 border-b border-slate-200 pb-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <SplitText
              text="Student Placements"
              tag="h2"
              splitType="chars"
              textAlign="left"
              useScrollTrigger={true}
              delay={25}
              duration={0.7}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b1428] tracking-tight uppercase font-heading leading-tight"
            />
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Placements"
              style={{ borderRadius: "10px" }}
              className="w-11 h-11 flex items-center justify-center bg-white hover:bg-emerald-600 hover:text-white border border-slate-300 text-slate-800 transition-all duration-300 active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Placements"
              style={{ borderRadius: "10px" }}
              className="w-11 h-11 flex items-center justify-center bg-white hover:bg-emerald-600 hover:text-white border border-slate-300 text-slate-800 transition-all duration-300 active:scale-95 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider Track Wrapper */}
        <div
          className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
            {extendedRecords.map((record, index) => (
              <div
                key={`${record.id}-${index}`}
                className="px-2 shrink-0"
                style={{ width: `${itemWidthPercent}%` }}
              >
                {/* Placement Card: Kept in DARK color */}
                <div className="placement-card bg-[#0b1428] border border-slate-800 hover:border-emerald-500/50 rounded-xl p-3 shadow-xl hover:shadow-emerald-950/30 transition-all duration-300 flex items-center gap-3.5 w-full h-full group text-white">
                  {/* Left Side: Student Photo (w-18 / 72px, h-30 / 120px) */}
                  <div className="relative w-16 sm:w-[72px] h-20 sm:h-[120px] rounded-lg overflow-hidden border border-white/20 shrink-0 bg-white/5">
                    <img
                      src={record.photo}
                      alt={record.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    />
                  </div>

                  {/* Right Side: Student Details */}
                  <div className="flex flex-col min-w-0 flex-1">
                    {/* Student Name: font-size 17px, font-weight 400 */}
                    <h4 
                      className="text-[17px] font-normal text-white truncate font-heading group-hover:text-emerald-400 transition-colors leading-tight mb-1"
                      style={{ fontSize: "17px", fontWeight: 400 }}
                    >
                      {record.name}
                    </h4>

                    {/* CTC Badge */}
                    <div className="inline-flex items-center w-fit px-2 py-0.5 mb-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] sm:text-xs font-extrabold text-emerald-400 font-mono tracking-tight">
                      CTC: {record.ctc}
                    </div>

                    {/* Post / Designation: font-size 14px !important */}
                    <p 
                      className="placement-card-p text-gray-300 font-medium truncate leading-tight"
                      style={{ fontSize: "14px" }}
                    >
                      {record.designation}
                    </p>

                    {/* Company Name: font-size 14px !important */}
                    <p 
                      className="placement-card-p text-gray-400 font-normal truncate mt-0.5 flex items-center gap-1"
                      style={{ fontSize: "14px" }}
                    >
                      <Briefcase className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
                      <span className="truncate">{record.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentPlacementsSection;
