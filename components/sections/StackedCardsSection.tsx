"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  GraduationCap,
  Clock,
  UserCheck,
  Award,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { SplitText } from "@/components/common/SplitText";
import { BgradientAnim } from "@/components/ui/soft-gradient-background-animation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface ProgramCardData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  format: string;
  eligibility: string;
  duration: string;
  accreditation: string;
  link: string;
}

const programsData: ProgramCardData[] = [
  {
    id: "prog-1",
    badge: "Bachelor",
    title: "B.Sc. (Hons)* in Integrative Nutrition & Dietetics",
    subtitle:
      "India's premier undergraduate degree co-founded with Luke Coutinho. Comprehensive training combining clinical nutrition, biochemistry, and holistic patient care.",
    image: "/images/hero/banner-bg-2.webp",
    format: "On Campus (Mumbai)",
    eligibility: "Class 12th Pass (Any Stream)",
    duration: "3 Years (Incl. Clinical Internship)",
    accreditation: "University of Mumbai Affiliated",
    link: "/programs/bsc-nutrition",
  },
  {
    id: "prog-2",
    badge: "Master",
    title: "M.Sc. in Integrative Nutrition & Dietetics",
    subtitle:
      "Advanced postgraduate program specializing in gut microbiome therapeutics, metabolic health, lifestyle oncology, and evidence-based clinical protocols.",
    image: "/images/verctical-slider/amul-industry-visit-banner.webp",
    format: "On Campus & Clinical Labs",
    eligibility: "Bachelor's Degree in Science / Life Sciences",
    duration: "2 Years (4 Semesters)",
    accreditation: "World-Class Research Faculty",
    link: "/programs/msc-nutrition",
  },
  {
    id: "prog-3",
    badge: "Diploma",
    title: "Diploma in Health & Integrative Lifestyle",
    subtitle:
      "Foundational professional diploma equipping healthcare enthusiasts with practical lifestyle medicine, preventative dietetics, and patient consulting skills.",
    image: "/images/verctical-slider/green-banner.webp",
    format: "Hybrid (Online + Interactive Workshops)",
    eligibility: "Open to All Graduates & Enthusiasts",
    duration: "1 Year (12 Months)",
    accreditation: "LSI Certified Professional Credential",
    link: "/programs/diploma-health",
  },
  {
    id: "prog-4",
    badge: "Post Diploma",
    title: "Post Graduate Diploma in Holistic Lifestyle & Wellness Coaching",
    subtitle:
      "Intensive specialization equipping practitioners with evidence-based coaching protocols, psychological behavioral change, and client consultation mastery.",
    image: "/images/about/about-card-1.jpg",
    format: "Hybrid & Clinical Labs",
    eligibility: "Graduates from any discipline",
    duration: "11 Months Intensive",
    accreditation: "Global Protocol Certification",
    link: "/programs/pg-diploma",
  },
];

export function StackedCardsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Card Stacking & Shrink/Fade Animation for Full-Width Cards
      const cards = gsap.utils.toArray<HTMLElement>(".experiential-card");
      const container = containerRef.current.querySelector(".cards-container");

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          gsap.to(card, {
            scale: 0.88,
            opacity: 0,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 120px",
              endTrigger: nextCard,
              end: "top 120px",
              scrub: true,
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            },
          });
        } else if (container) {
          // Last card remains pinned until container completes
          ScrollTrigger.create({
            trigger: card,
            start: "top 120px",
            endTrigger: container,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-[#f8f9fc] text-zinc-900 relative overflow-hidden"
    >
      {/* Soft animated gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <BgradientAnim animationDuration={7} />
      </div>

      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header with SplitText Reveal Animation */}
        <div className="text-left w-full mb-12 sm:mb-16">
          <h2 className="lsi-section-badge">
            <SplitText
              text="ACADEMIC PROGRAMMES"
              tag="span"
              splitType="chars"
              textAlign="left"
              useScrollTrigger={true}
              delay={35}
              duration={0.8}
            />
          </h2>
          <p className="text-[#314b83]/80 text-lg sm:text-xl font-normal max-w-2xl leading-relaxed">
            Discover our industry-accredited degree and diploma courses designed to master clinical nutrition, gut microbiome health, and integrative wellness.
          </p>
        </div>

        {/* Full-Width Cards Container */}
        <div className="cards-container w-full flex flex-col gap-14 pb-32">
          {programsData.map((prog, idx) => {
            const isImageLeft = idx % 2 === 0; // 0 & 2: left image, right content; 1 & 3: left content, right image

            return (
              <div
                key={prog.id}
                className="experiential-card w-full bg-[#111c35] text-white rounded-[24px] overflow-hidden shadow-2xl border border-white/10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[520px] items-stretch">
                  {/* Image Column */}
                  <div
                    className={`relative w-full h-[260px] sm:h-[320px] lg:h-full lg:col-span-5 overflow-hidden ${
                      isImageLeft ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={prog.image}
                      alt={prog.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111c35] via-transparent to-transparent lg:hidden pointer-events-none" />
                  </div>

                  {/* Content Column */}
                  <div
                    className={`p-6 sm:p-10 lg:p-12 lg:col-span-7 flex flex-col justify-between ${
                      isImageLeft ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Top Header */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#f9d868] uppercase tracking-widest mb-4">
                        <BookOpen className="w-3.5 h-3.5 text-[#f9d868]" />
                        {prog.badge}
                      </div>

                      <h3
                        className="text-3xl sm:text-[40px] font-bold text-white tracking-tight leading-[1.15] font-heading mb-4"
                        style={{ fontSize: "40px" }}
                      >
                        {prog.title}
                      </h3>

                      <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-2xl font-normal mb-8">
                        {prog.subtitle}
                      </p>
                    </div>

                    {/* Specs 2x2 Grid with Circular Icon Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10 mb-8">
                      {/* Format */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-5 h-5 text-[#f9d868]" />
                        </div>
                        <div>
                          <span className="block text-xs uppercase tracking-wider text-white/50 font-medium">
                            Format
                          </span>
                          <span
                            className="text-sm font-extralight text-white mt-0.5 block"
                            style={{ fontWeight: 200, letterSpacing: "0.4px" }}
                          >
                            {prog.format}
                          </span>
                        </div>
                      </div>

                      {/* Eligibility */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                          <UserCheck className="w-5 h-5 text-[#f9d868]" />
                        </div>
                        <div>
                          <span className="block text-xs uppercase tracking-wider text-white/50 font-medium">
                            Eligibility
                          </span>
                          <span
                            className="text-sm font-extralight text-white mt-0.5 block"
                            style={{ fontWeight: 200, letterSpacing: "0.4px" }}
                          >
                            {prog.eligibility}
                          </span>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 text-[#f9d868]" />
                        </div>
                        <div>
                          <span className="block text-xs uppercase tracking-wider text-white/50 font-medium">
                            Duration
                          </span>
                          <span
                            className="text-sm font-extralight text-white mt-0.5 block"
                            style={{ fontWeight: 200, letterSpacing: "0.4px" }}
                          >
                            {prog.duration}
                          </span>
                        </div>
                      </div>

                      {/* Accreditation */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5 text-[#f9d868]" />
                        </div>
                        <div>
                          <span className="block text-xs uppercase tracking-wider text-white/50 font-medium">
                            Recognition
                          </span>
                          <span
                            className="text-sm font-extralight text-white mt-0.5 block"
                            style={{ fontWeight: 200, letterSpacing: "0.4px" }}
                          >
                            {prog.accreditation}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button Group with Separate White Arrow Box */}
                    <div className="group flex items-center gap-2.5 cursor-pointer">
                      <Link
                        href={prog.link}
                        className="bg-[#f9d868] hover:bg-[#e6c452] text-[#0b1428] font-medium text-sm sm:text-base px-7 py-3 rounded-[10px] transition-colors shadow-lg capitalize inline-flex items-center justify-center"
                      >
                        Explore Programme
                      </Link>

                      <Link
                        href={prog.link}
                        aria-label="Explore programme details"
                        className="w-12 h-12 bg-white text-[#0b1428] rounded-[10px] flex items-center justify-center shadow-lg hover:bg-zinc-100 transition-colors shrink-0"
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StackedCardsSection;
