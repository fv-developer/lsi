"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Briefcase, ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/common/SplitText";
import type { PlacementRecord } from "./StudentPlacementsSection";

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

// Tripled list for seamless infinite looping
const extendedRecords = [...placementRecords, ...placementRecords, ...placementRecords];

export function ProgramIndustryPlacementSection() {
  const [currentIndex, setCurrentIndex] = useState(placementRecords.length);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);
  const mouseStartXRef = useRef(0);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive cards configuration - showing 4 cards on desktop
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsToShow(1.15);
      else if (width < 768) setCardsToShow(2);
      else if (width < 1024) setCardsToShow(3);
      else setCardsToShow(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= placementRecords.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(placementRecords.length);
    } else if (currentIndex < placementRecords.length) {
      setIsTransitioning(false);
      setCurrentIndex(placementRecords.length * 2 - 1);
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideTimerRef.current = setInterval(() => {
      handleNext();
    }, 3800);
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
  }, [currentIndex]);

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
    <section
      id="industry-placement"
      className="w-full relative py-20 sm:py-28 bg-[#070e22] text-white overflow-hidden border-t border-white/10"
    >
      {/* Background geometric grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-80 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[400px] bg-[#f9d868]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header: Industry Placement */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-bold text-white tracking-tight uppercase font-heading leading-tight mb-4">
            <SplitText
              text="Industry Placement"
              tag="span"
              splitType="chars"
              textAlign="center"
              useScrollTrigger={true}
              delay={25}
              duration={0.8}
            />
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-normal max-w-3xl mx-auto leading-relaxed">
            LSI’s placement statistics reflect our industry-backed training, clinical internships at premier hospitals, and high-impact wellness leadership roles across India and globally.
          </p>
        </div>

        {/* 3 Outcome Report Cards Grid (Matching Altera reference) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 sm:mb-12">
          {/* Card 1: 100% Placement Rate */}
          <div className="rounded-[20px] overflow-hidden border border-white/10 hover:border-white/25 shadow-2xl transition-all duration-300 group hover:-translate-y-1.5 bg-[#09112a]">
            <Image
              src="/images/placements/pgp-outcomes-1.webp"
              alt="100% Placement Rate - Salary Outcomes"
              width={802}
              height={782}
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Card 2: 100%+ ROI */}
          <div className="rounded-[20px] overflow-hidden border border-white/10 hover:border-white/25 shadow-2xl transition-all duration-300 group hover:-translate-y-1.5 bg-[#09112a]">
            <Image
              src="/images/placements/pgp-outcomes-2.webp"
              alt="100%+ ROI - Average Salary Breakdown"
              width={802}
              height={782}
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Card 3: 90%+ Students in High-Growth Roles */}
          <div className="rounded-[20px] overflow-hidden border border-white/10 hover:border-white/25 shadow-2xl transition-all duration-300 group hover:-translate-y-1.5 bg-[#09112a]">
            <Image
              src="/images/placements/pgp-outcomes-3.webp"
              alt="90%+ Students in Specialized Healthcare Roles"
              width={802}
              height={782}
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Sub-Header: Student Placement Records Slider (Cards with LIGHT BG) */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-8 border-t border-white/10 pt-8 sm:pt-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight uppercase font-heading leading-tight">
              Recent Student Placements
            </h4>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Placements"
              style={{ borderRadius: "10px" }}
              className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-[#f9d868] hover:text-[#0b1428] border border-white/20 text-white transition-all duration-300 active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Placements"
              style={{ borderRadius: "10px" }}
              className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-[#f9d868] hover:text-[#0b1428] border border-white/20 text-white transition-all duration-300 active:scale-95 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Student Placements Slider (Cards with LIGHT BACKGROUND) */}
        <div
          className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing pb-8"
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
              transition:
                isDragging || !isTransitioning
                  ? "none"
                  : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {extendedRecords.map((record, index) => (
              <div
                key={`${record.id}-${index}`}
                className="px-2.5 shrink-0"
                style={{ width: `${itemWidthPercent}%` }}
              >
                {/* Placement Card: LIGHT BG (bg-white) on Dark Section Background */}
                <div className="placement-card bg-white border border-slate-200 hover:border-[#f9d868] rounded-[16px] p-3.5 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3.5 w-full h-full group text-slate-900">
                  {/* Left Side: Student Photo */}
                  <div className="relative w-16 sm:w-[72px] h-20 sm:h-[110px] rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100 shadow-inner">
                    <img
                      src={record.photo}
                      alt={record.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    />
                  </div>

                  {/* Right Side: Student Details */}
                  <div className="flex flex-col min-w-0 flex-1 text-left">
                    {/* Student Name */}
                    <h4
                      className="text-[16px] font-bold text-slate-900 truncate font-heading group-hover:text-[#314b83] transition-colors leading-tight mb-1"
                      style={{ fontSize: "16px" }}
                    >
                      {record.name}
                    </h4>

                    {/* CTC Badge */}
                    <div className="inline-flex items-center w-fit px-2.5 py-0.5 mb-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-[11px] sm:text-xs font-extrabold text-emerald-800 font-mono tracking-tight shadow-sm">
                      CTC: {record.ctc}
                    </div>

                    {/* Designation */}
                    <p
                      className="text-slate-600 font-medium truncate leading-tight"
                      style={{ fontSize: "13px" }}
                    >
                      {record.designation}
                    </p>

                    {/* Company Name */}
                    <p
                      className="text-slate-500 font-normal truncate mt-0.5 flex items-center gap-1"
                      style={{ fontSize: "13px" }}
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#314b83] shrink-0" />
                      <span className="truncate">{record.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 w-full p-6 sm:p-8 rounded-[20px] bg-gradient-to-r from-white/5 via-white/10 to-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div>
            <h5 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Ready to Accelerate Your Career in Integrative Health?
            </h5>
            <p className="text-slate-300 text-sm sm:text-base mt-1">
              Join India’s top recruiters and secure high-impact roles in clinical care, lifestyle medicine, and wellness.
            </p>
          </div>

          <Link
            href="/apply"
            className="shrink-0 bg-[#f9d868] hover:bg-[#e6c452] text-[#0b1428] font-semibold text-sm sm:text-base px-7 py-3.5 rounded-[12px] transition-colors shadow-lg capitalize inline-flex items-center gap-2 group"
          >
            Apply for Admissions
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProgramIndustryPlacementSection;
