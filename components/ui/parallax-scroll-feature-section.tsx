"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface ParallaxSectionItem {
  id: string | number;
  title: string;
  role?: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
  highlights?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ParallaxScrollFeatureProps {
  sections: ParallaxSectionItem[];
}

export function ParallaxScrollFeatureSection({ sections }: ParallaxScrollFeatureProps) {
  return (
    <div className="w-full flex flex-col gap-6 sm:gap-10">
      {sections.map((section, index) => (
        <ParallaxItemCard key={section.id} section={section} index={index} />
      ))}
    </div>
  );
}

function ParallaxItemCard({
  section,
  index,
}: {
  section: ParallaxSectionItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "center 55%"],
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.25], [0.3, 1]);
  const clipProgress = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const translateY = useTransform(scrollYProgress, [0, 0.25], [-15, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: opacityContent,
        clipPath: clipProgress,
      }}
      className={`flex flex-col ${
        section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center justify-between gap-6 lg:gap-12 p-6 sm:p-8 bg-[#0b1730]/50 border border-white/10 rounded-[10px] backdrop-blur-md shadow-xl relative overflow-hidden group`}
    >
      {/* Background Masking Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />

      {/* Text Content Column (70% width) */}
      <motion.div
        style={{ y: translateY }}
        className="w-full lg:w-[70%] flex flex-col justify-center text-left relative z-10"
      >
        <h4 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1.5 leading-tight">
          {section.title}
        </h4>

        {section.subtitle && (
          <p className="text-[#f9d868] text-sm sm:text-base font-medium mb-3">
            {section.subtitle}
          </p>
        )}

        <p className="font-body text-slate-200 text-sm sm:text-base leading-relaxed font-light mb-4 max-w-3xl">
          {section.description}
        </p>

        {section.highlights && section.highlights.length > 0 && (
          <div className="space-y-1.5">
            {section.highlights.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f9d868] shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Image Column (30% width) */}
      <div className="w-full lg:w-[30%] relative rounded-[10px] overflow-hidden shadow-xl h-[240px] sm:h-[280px] lg:h-[310px] border border-white/15 group/img shrink-0">
        <Image
          src={section.imageUrl}
          alt={section.title}
          fill
          sizes="(max-width: 1024px) 100vw, 30vw"
          className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default ParallaxScrollFeatureSection;
