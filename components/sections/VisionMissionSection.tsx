"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/common/SplitText";

export interface VisionCardItem {
  id: string;
  title: string;
  description: string;
}

const CARDS_DATA: {
  topRow: VisionCardItem[];
  bottomRow: VisionCardItem[];
} = {
  topRow: [
    {
      id: "vision",
      title: "Vision",
      description:
        "To be India's premier global institute for Integrative Nutrition, empowering health leadership through evidence-based wellness.",
    },
    {
      id: "mission",
      title: "Mission",
      description:
        "Delivering academic excellence, clinical hospital rotations, and research that equips future leaders with holistic expertise.",
    },
  ],
  bottomRow: [
    {
      id: "values",
      title: "Values",
      description:
        "Unwavering clinical integrity, evidence-based innovation, compassionate patient care, and lifelong dedication to health.",
    },
    {
      id: "approach",
      title: "Approach",
      description:
        "Combining rigorous academics with hands-on hospital internships, world-class mentorship, and practical research.",
    },
  ],
};

export function VisionMissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll-linked horizontal movement for desktop
  const topRowX = useTransform(scrollYProgress, [0.15, 0.6], [80, -120]);
  const bottomRowX = useTransform(scrollYProgress, [0.15, 0.6], [-80, 120]);
  const sectionOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0.3, 1]);

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-24 text-white relative overflow-hidden bg-slate-950"
    >
      {/* Full-Width Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-us/why-choose-bg.jpeg"
          alt="Why Choose LSI Background"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-85 contrast-105"
          priority={false}
        />
        {/* Light Soft Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-blue-950/10 pointer-events-none z-[2]" />
      </div>

      {/* Decorative Ambient Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0052ff]/20 rounded-full blur-[150px] pointer-events-none z-[2]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#f9d868]/15 rounded-full blur-[150px] pointer-events-none z-[2]" />

      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Animated Section Header (Top & Centered with SplitText reveal animation) */}
        <div className="w-full text-center mb-10 sm:mb-14 flex justify-center">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase text-center">
            <SplitText
              text="WHY CHOOSE LSI"
              tag="span"
              splitType="chars"
              textAlign="center"
              useScrollTrigger={true}
              delay={35}
              duration={0.8}
              className="text-white"
            />
          </h2>
        </div>

        {/* Cards Layout */}
        <div className="w-full flex flex-col gap-5 sm:gap-6 items-center">
          {/* TOP ROW: Vision & Mission (Moves Left on Scroll on Desktop) */}
          <motion.div
            style={{
              x: isDesktop ? topRowX : 0,
              opacity: isDesktop ? sectionOpacity : 1,
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-[820px]"
          >
            {CARDS_DATA.topRow.map((card) => (
              <div
                key={card.id}
                className="relative overflow-hidden bg-[#24303d]/60 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.45)] rounded-[10px] p-5 sm:p-6 flex flex-col justify-between hover:border-white/40 hover:bg-[#24303d]/75 transition-all duration-300 group min-h-[200px] h-full"
              >
                {/* Subtle Top Gloss Reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />

                <h4
                  className="font-heading text-white tracking-tight relative z-10 font-normal text-[25px] leading-tight"
                  style={{ fontSize: "25px", fontWeight: 400 }}
                >
                  {card.title}
                </h4>
                <p
                  className="font-body text-slate-200 leading-relaxed font-light line-clamp-2 mt-auto relative z-10 text-[17px]"
                  style={{ fontSize: "17px", fontWeight: 300 }}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* BOTTOM ROW: Values & Approach (Moves Right on Scroll on Desktop) */}
          <motion.div
            style={{
              x: isDesktop ? bottomRowX : 0,
              opacity: isDesktop ? sectionOpacity : 1,
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-[820px]"
          >
            {CARDS_DATA.bottomRow.map((card) => (
              <div
                key={card.id}
                className="relative overflow-hidden bg-[#24303d]/60 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.45)] rounded-[10px] p-5 sm:p-6 flex flex-col justify-between hover:border-white/40 hover:bg-[#24303d]/75 transition-all duration-300 group min-h-[200px] h-full"
              >
                {/* Subtle Top Gloss Reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />

                <h4
                  className="font-heading text-white tracking-tight relative z-10 font-normal text-[25px] leading-tight"
                  style={{ fontSize: "25px", fontWeight: 400 }}
                >
                  {card.title}
                </h4>
                <p
                  className="font-body text-slate-200 leading-relaxed font-light line-clamp-2 mt-auto relative z-10 text-[17px]"
                  style={{ fontSize: "17px", fontWeight: 300 }}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default VisionMissionSection;
