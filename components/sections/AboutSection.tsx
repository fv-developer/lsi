"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import { SplitText } from "@/components/common/SplitText";
import { CounterStatsSection } from "./CounterStatsSection";

export interface AboutSectionProps {
  badge?: string;
  headlineText?: string;
  card1Image?: string;
  card2Image?: string;
  yellowCardTitle?: string;
  yellowCardSubtitle?: string;
  yellowCardDescription?: string;
  yellowCardButtonText?: string;
  yellowCardButtonLink?: string;
}

export function AboutSection({
  badge = "About LSI Institute",
  headlineText = "Lifeness Science Institute for Integrative Nutrition and Dietetics is a specialised educator of the industry. As an institute of nutrition and dietetics, we promote involvement in the community with a view of catering to the nutritional needs of diverse population groups like children, women, elderly, and sportspeople.",
  card1Image = "/images/about/about-card-1.jpg",
  card2Image = "/images/about/about-card-2.jpeg",
  yellowCardTitle = "EXPLORE.",
  yellowCardSubtitle = "The world is waiting.",
  yellowCardDescription = "LSI is India’s premier institute to collaborate with universities, colleges, institutions, etc.",
  yellowCardButtonText = "Know More",
  yellowCardButtonLink = "/about",
}: AboutSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white text-zinc-900 overflow-hidden">
      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Top Left-Aligned Badge & Animated Scroll Headline */}
        <div className="text-left w-full mb-12 sm:mb-16">
          {/* Badge (H2 with custom unique class & SplitText animation) */}
          <h2 className="lsi-section-badge">
            <SplitText
              text={badge}
              tag="span"
              splitType="chars"
              textAlign="left"
              useScrollTrigger={true}
              delay={35}
              duration={0.8}
            />
          </h2>

          {/* Animated Scroll Text Gradient Headline */}
          <div className="w-full text-left">
            <TextGradientScroll
              text={headlineText}
              type="letter"
              textOpacity="soft"
              className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.3] text-zinc-900 text-left justify-start w-full"
            />
          </div>
        </div>

        {/* 3-Card Grid with Staggered Scroll Slide-Up Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* Card 1 - Hiker Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative rounded-[10px] overflow-hidden shadow-md group h-[480px] cursor-pointer"
          >
            <Image
              src={card1Image}
              alt="Mountain hiking journey"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Card 2 - Coastal Cliff Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="relative rounded-[10px] overflow-hidden shadow-md group h-[480px] cursor-pointer"
          >
            <Image
              src={card2Image}
              alt="Coastal destination"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Card 3 - Custom Gradient Explore Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            style={{ background: "linear-gradient(145deg, rgb(17 133 13) 0%, rgb(49 75 131) 100%)" }}
            className="rounded-[10px] p-8 sm:p-10 flex flex-col justify-between shadow-md h-[480px] text-white group"
          >
            {/* Top Text Content */}
            <div>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase leading-none">
                {yellowCardTitle}
              </h3>
              <p className="text-lg sm:text-xl font-semibold text-white/90 mt-3">
                {yellowCardSubtitle}
              </p>
            </div>

            {/* Bottom Content & CTA */}
            <div>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 font-normal">
                {yellowCardDescription}
              </p>

              {/* Hero Banner Style CTA Button Group with 3D Arrow Roll */}
              <div className="flex items-center gap-1.5 group/btn cursor-pointer">
                <Link
                  href={yellowCardButtonLink}
                  className="bg-[#f9d868] hover:bg-[#e6c452] text-[#0b1428] font-medium text-sm sm:text-base px-6 py-3.5 rounded-[10px] transition-colors shadow-lg capitalize inline-flex items-center justify-center"
                >
                  {yellowCardButtonText}
                </Link>

                <Link
                  href={yellowCardButtonLink}
                  aria-label="Explore further"
                  className="w-12 h-12 bg-white text-[#0b1428] rounded-[10px] flex items-center justify-center shadow-lg hover:bg-zinc-100 transition-colors shrink-0 group/arrow"
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
          </motion.div>
        </div>

        {/* 5 Counter Statistics Section with GSAP Outward Expansion */}
        <CounterStatsSection />
      </div>
    </section>
  );
}
