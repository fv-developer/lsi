"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Stethoscope,
  Utensils,
  Microscope,
  HeartPulse,
  Flame,
  Award,
} from "lucide-react";
import { Button } from "../common/Button";
import SplitText from "../common/SplitText";

interface SlideTrack {
  id: string;
  intakeBadge: string;
  line1: string;
  line2: string;
  highlightText: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  affiliationsTag: string;
  featurePills: { label: string; icon: React.ElementType }[];
  trackName: string;
}

const slides: SlideTrack[] = [
  {
    id: "track-1",
    intakeBadge: "AUGUST 2026 INTAKE CLOSES 15 AUG 2026 . Only 42 seats left",
    line1: "Integrative Nutrition &",
    line2: "Dietetics",
    highlightText: "expert.",
    description:
      "India's premier specialist institute for Integrative Nutrition & Dietetics, co-founded with Luke Coutinho. University of Mumbai affiliated degrees with 100% clinical placement.",
    primaryCta: { label: "Book Free Counselling", href: "/apply" },
    secondaryCta: { label: "Explore Programmes", href: "/programs" },
    affiliationsTag:
      "✦ UNIVERSITY OF MUMBAI · NAAC-ACCREDITED PARTNERS · CO-FOUNDED WITH LUKE COUTINHO",
    featurePills: [
      { label: "Clinical Dietetics", icon: Stethoscope },
      { label: "Functional Foods", icon: Utensils },
      { label: "R&D Labs", icon: Microscope },
      { label: "Integrative Care", icon: HeartPulse },
      { label: "Metabolic Health", icon: Flame },
    ],
    trackName: "B.Sc. Cellular Nutrition & Food Science",
  },
  {
    id: "track-2",
    intakeBadge: "ADMISSIONS OPEN FOR AY 2026-27 · Merit Scholarships Available",
    line1: "Clinical Research &",
    line2: "Functional",
    highlightText: "Medicine.",
    description:
      "Master evidence-based functional medicine, gut microbiome therapeutics, and lifestyle oncology under world-class clinical research faculty.",
    primaryCta: { label: "Apply Online Now", href: "/apply" },
    secondaryCta: { label: "View MSc Curriculum", href: "/programs/msc-nutrition" },
    affiliationsTag:
      "✦ CLINICAL INTERNSHIPS · 100% PLACEMENT SUPPORT · GLOBAL FACULTY DIRECTORY",
    featurePills: [
      { label: "Gut Microbiome", icon: Sparkles },
      { label: "Pediatric Health", icon: HeartPulse },
      { label: "Sports Performance", icon: Flame },
      { label: "Nutraceuticals R&D", icon: Microscope },
      { label: "Lifestyle Oncology", icon: Stethoscope },
    ],
    trackName: "M.Sc. Integrative Nutrition & Dietetics",
  },
  {
    id: "track-3",
    intakeBadge: "POST GRADUATE DIPLOMA · Rolling Intake AY 2026-27",
    line1: "Holistic Lifestyle &",
    line2: "Wellness",
    highlightText: "Coaching.",
    description:
      "A 1-year intensive program equipping you with evidence-based coaching protocols and clinical consultation skills for modern wellness practice.",
    primaryCta: { label: "Download Brochure", href: "/admissions" },
    secondaryCta: { label: "Schedule Counselling", href: "/contact" },
    affiliationsTag:
      "✦ 4 MUMBAI CAMPUSES · PRACTICAL WORKSHOPS · CLINICAL MENTORSHIP",
    featurePills: [
      { label: "Wellness Coaching", icon: Award },
      { label: "Stress Physiology", icon: HeartPulse },
      { label: "Metabolic Care", icon: Flame },
      { label: "Patient Counselling", icon: Stethoscope },
      { label: "Functional Diets", icon: Utensils },
    ],
    trackName: "PG Diploma in Holistic Lifestyle & Wellness Coaching",
  },
  {
    id: "track-4",
    intakeBadge: "DIPLOMA IN HEALTH & INTEGRATIVE LIFESTYLE · Quarterly Intakes",
    line1: "Empowering Healthcare",
    line2: "Leaders of",
    highlightText: "Tomorrow.",
    description:
      "Flexible diploma programs bridging traditional wisdom and clinical nutrition for healthcare professionals, coaches, and wellness leaders.",
    primaryCta: { label: "Explore Diploma", href: "/programs/diploma-health" },
    secondaryCta: { label: "Book Campus Visit", href: "/about#campus-tour" },
    affiliationsTag:
      "✦ FLEXIBLE BATCHES · EXPERIENTIAL LEARNING · HOSPITAL ROTATIONS",
    featurePills: [
      { label: "Integrative Care", icon: HeartPulse },
      { label: "Lifestyle Medicine", icon: Stethoscope },
      { label: "Functional Foods", icon: Utensils },
      { label: "Clinical Rotations", icon: Microscope },
    ],
    trackName: "DHIL — Diploma in Health & Integrative Lifestyle",
  },
];

// Verified Working Image URLs
const column1Cards = [
  {
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
    topBadge: "100% NATURAL",
    bottomBadge: "FUNCTIONAL FOODS",
    icon: "🌱",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    topBadge: null,
    bottomBadge: "TEACHING KITCHEN",
    icon: "👨‍🍳",
  },
  {
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    topBadge: null,
    bottomBadge: "CLINICAL DIETETICS",
    icon: "🩺",
  },
  {
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    topBadge: "4 Campuses",
    bottomBadge: "MUMBAI ACADEMIC AFFILIATION",
    icon: "🏛️",
  },
];

const column2Cards = [
  {
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    topBadge: null,
    bottomBadge: "PATIENT COUNSEL",
    icon: "📋",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    topBadge: null,
    bottomBadge: "PERFORMANCE NUTRITION",
    icon: "⚡",
  },
  {
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    topBadge: null,
    bottomBadge: "METABOLIC HEALTH",
    icon: "🧬",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=80",
    topBadge: "100%",
    bottomBadge: "PLACEMENT ASSISTANCE",
    icon: "💼",
  },
];

const column3Cards = [
  {
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    topBadge: "18+ CAREER PATHWAYS",
    bottomBadge: "INTEGRATIVE CARE",
    icon: "🌿",
  },
  {
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    topBadge: null,
    bottomBadge: "NUTRACEUTICALS R&D",
    icon: "🔬",
  },
  {
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    topBadge: null,
    bottomBadge: "GLOBAL CONFERENCES",
    icon: "🌐",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    topBadge: null,
    bottomBadge: "RESEARCH LABS",
    icon: "🧪",
  },
];

const slideImages = [
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    title: "Clinical Research & Labs",
  },
  {
    src: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80",
    title: "Functional Foods & Nutrition",
  },
  {
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
    title: "Teaching Kitchen & Practical Care",
  },
  {
    src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80",
    title: "Metabolic Health & Wellness Coaching",
  },
];

export const HeroSliderSection: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentSlide = slides[activeSlideIndex];

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play interval for left slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <section className="w-full min-h-screen p-3 sm:p-4 lg:p-4 bg-white flex flex-col justify-between">
      <div
        className="relative w-full h-[calc(100vh-28px)] min-h-[640px] max-h-[920px] text-white overflow-hidden rounded-[20px] flex flex-col justify-between pt-20 pb-8 sm:pb-12 lg:pb-14 border border-white/10 shadow-2xl"
        style={{
          background:
            "linear-gradient(93deg, rgba(5, 92, 2, 1) 0%, rgba(54, 73, 158, 1) 100%)",
        }}
      >
        {/* Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/banner-bg-2.webp"
            alt="Integrative Nutrition Hero Background"
            fill
            priority
            className="object-cover object-center opacity-45 brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 z-[1]" />
        </div>

        {/* Center Bottom Subject Image (Hero Girl/Student) - Hidden for now */}
        <div className="hidden absolute bottom-0 left-1/2 -translate-x-1/2 z-[3] h-[90%] sm:h-[94%] lg:h-[96%] min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] w-auto flex items-end justify-center pointer-events-none">
          <Image
            src="/images/hero/hero-girl.webp"
            alt="Integrative Healthcare Student"
            width={750}
            height={950}
            priority
            className="h-full w-auto object-contain object-bottom drop-shadow-2xl brightness-105 contrast-105"
          />
        </div>

        {/* Giant Background Watermark Text */}
        <SplitText
          text="INTEGRATIVE"
          tag="div"
          className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[90px] sm:text-[120px] lg:text-[147px] font-normal text-white/15 tracking-wider uppercase select-none pointer-events-none z-[2] whitespace-nowrap font-heading"
          delay={60}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 0.15, y: 0 }}
          textAlign="center"
        />

        {/* Background Subtle Radial Lighting Gradients */}
        <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-[#334180]/20 rounded-full blur-[140px] pointer-events-none z-[2]" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#f9d868]/10 rounded-full blur-[160px] pointer-events-none z-[2]" />

        {/* Spacer to push content to bottom */}
        <div className="flex-1" />

        {/* Bottom Content Bar: Left Side (Heading & Paragraph) | Right Side (CTA Button) */}
        <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 w-full mb-1 sm:mb-3">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
            
            {/* Left Side: Heading & Paragraph */}
            <div className="max-w-4xl lg:max-w-[54rem] text-left space-y-4">
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-[64px] leading-tight lg:leading-[64px] tracking-tight text-white font-normal">
                <span className="block">
                  <SplitText
                    key={`line1-${activeSlideIndex}`}
                    text={currentSlide.line1}
                    tag="span"
                    className="font-heading text-4xl sm:text-6xl lg:text-[64px] leading-tight lg:leading-[64px] tracking-tight text-white font-normal inline"
                    delay={30}
                    duration={0.8}
                    ease="power3.out"
                    splitType="words, chars"
                    from={{ opacity: 0, y: 35 }}
                    to={{ opacity: 1, y: 0 }}
                    textAlign="left"
                  />
                </span>
                <span className="block mt-1">
                  <SplitText
                    key={`line2-${activeSlideIndex}`}
                    text={currentSlide.line2}
                    tag="span"
                    className="font-heading text-4xl sm:text-6xl lg:text-[64px] leading-tight lg:leading-[64px] tracking-tight text-white font-normal inline"
                    delay={35}
                    duration={0.8}
                    ease="power3.out"
                    splitType="words, chars"
                    from={{ opacity: 0, y: 35 }}
                    to={{ opacity: 1, y: 0 }}
                    textAlign="left"
                  />
                  <SplitText
                    key={`highlight-${activeSlideIndex}`}
                    text={currentSlide.highlightText}
                    tag="span"
                    className="text-[#f9d868] inline-block font-normal text-4xl sm:text-6xl lg:text-[64px] leading-tight lg:leading-[64px] ml-2.5 sm:ml-3"
                    delay={40}
                    duration={0.8}
                    ease="power3.out"
                    splitType="words, chars"
                    from={{ opacity: 0, y: 35 }}
                    to={{ opacity: 1, y: 0 }}
                    textAlign="left"
                  />
                </span>
              </h1>

              <SplitText
                key={`desc-${activeSlideIndex}`}
                text={currentSlide.description}
                tag="p"
                className="font-body text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed font-light"
                delay={15}
                duration={0.6}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="left"
              />
            </div>

            {/* Right Side: Nevio Style Yellow CTA Button & Arrow Box */}
            <div className="flex flex-col items-start lg:items-end gap-5 shrink-0">
              <div className="flex items-center gap-1.5 group cursor-pointer">
                {/* Yellow Pill Button */}
                <Link
                  href={currentSlide.primaryCta.href}
                  className="bg-[#f9d868] hover:bg-[#e6c452] text-[#0b1428] font-medium text-sm sm:text-base px-7 py-3.5 rounded-[10px] transition-colors shadow-lg capitalize inline-flex items-center justify-center"
                >
                  {currentSlide.primaryCta.label}
                </Link>

                {/* Separate White Icon Box with 3D Arrow Roll */}
                <Link
                  href={currentSlide.primaryCta.href}
                  className="w-12 h-12 bg-white text-[#0b1428] rounded-[10px] flex items-center justify-center shadow-lg hover:bg-zinc-100 transition-colors group/arrow"
                  aria-label="Action arrow"
                >
                  <span className="icon-3d-container">
                    <span className="icon-3d-front">
                      <ArrowUpRight className="w-5 h-5 text-[#0b1428]" />
                    </span>
                    <span className="icon-3d-back">
                      <ArrowUpRight className="w-5 h-5 text-[#0b1428]" />
                    </span>
                  </span>
                </Link>
              </div>

              {/* Slide Navigation Dots */}
              <div className="flex items-center gap-2.5">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlideIndex === idx
                        ? "w-7 bg-[#f9d868]"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSliderSection;

