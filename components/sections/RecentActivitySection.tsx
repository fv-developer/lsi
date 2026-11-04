"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";
import { SplitText } from "@/components/common/SplitText";

const recentActivities: GalleryItem[] = [
  {
    common: "Clinical Hospital Immersion",
    binomial: "Real-world Patient Consultation & Labs",
    photo: {
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      text: "Clinical hospital training",
      by: "LSI Clinical Wing",
    },
  },
  {
    common: "Integrative Health Expos",
    binomial: "Wellness Symposia & Live Demos",
    photo: {
      url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
      text: "Wellness symposia and expo",
      by: "LSI Campus Life",
    },
  },
  {
    common: "Sports & Athletics Meet",
    binomial: "Active Lifestyle & Fitness Competitions",
    photo: {
      url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      text: "Campus sports meet",
      by: "LSI Athletics",
    },
  },
  {
    common: "Cultural Youth Fest",
    binomial: "Vibrant Campus Life & Performing Arts",
    photo: {
      url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
      text: "University cultural fest",
      by: "LSI Student Council",
    },
  },
  {
    common: "Diagnostic Biochemistry Labs",
    binomial: "Practical Science & Biomarker Diagnostics",
    photo: {
      url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
      text: "Biochemistry & Nutrition Lab",
      by: "LSI Research Lab",
    },
  },
  {
    common: "Luke Coutinho Masterclasses",
    binomial: "Evidence-based Lifestyle Protocols",
    photo: {
      url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      text: "Expert seminar",
      by: "LSI Mentorship",
    },
  },
  {
    common: "Industry Expo Visit",
    binomial: "Corporate Healthcare & Nutrition Expos",
    photo: {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      text: "Healthcare Expo",
      by: "LSI Industry Relations",
    },
  },
  {
    common: "Placement & Mentorship",
    binomial: "100% Career Assistance & Counseling",
    photo: {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      text: "Placement Counseling",
      by: "LSI Career Wing",
    },
  },
];

export function RecentActivitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRotation, setScrollRotation] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smoothly convert scroll progress (0..1) into degrees (0..-360)
  // With a small resting buffer at start and end so all 8 images rotate through completely
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest <= 0.05) {
      setScrollRotation(0);
    } else if (latest >= 0.95) {
      setScrollRotation(-360);
    } else {
      const normalized = (latest - 0.05) / 0.90;
      setScrollRotation(normalized * -360);
    }
  });

  // Sync on initial mount or page refresh
  useEffect(() => {
    const initial = scrollYProgress.get();
    if (initial <= 0.05) {
      setScrollRotation(0);
    } else if (initial >= 0.95) {
      setScrollRotation(-360);
    } else {
      const normalized = (initial - 0.05) / 0.90;
      setScrollRotation(normalized * -360);
    }
  }, [scrollYProgress]);

  // Compute active card index (0..7) based on rotation
  const activeIndex = Math.round(Math.abs(scrollRotation) / 45) % recentActivities.length;

  return (
    <section
      ref={containerRef}
      className="w-full relative bg-[#0b1428] text-white border-t border-white/10"
    >
      {/* Tall Scroll Track: 280vh gives plenty of smooth scroll distance so each card has its moment */}
      <div className="relative w-full h-[280vh]">
        {/* Sticky Pinned Viewport Container */}
        <div className="sticky top-0 w-full h-screen max-h-[100dvh] flex flex-col justify-center items-center overflow-hidden">
          {/* Background ambient grid pattern */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" 
          />

          {/* Background ambient lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center">
            {/* Section Header: Clean Campus Activity Title with Reveal Animation */}
            <div className="text-center w-full flex flex-col items-center mb-6 sm:mb-8">
              <SplitText
                text="Campus Activity"
                tag="h2"
                splitType="chars"
                textAlign="center"
                useScrollTrigger={true}
                delay={25}
                duration={0.7}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight"
              />
            </div>

            {/* 3D Circular Scroll & Drag Gallery Container */}
            <div className="w-full h-[320px] sm:h-[360px] md:h-[400px] relative overflow-visible flex items-center justify-center">
              <CircularGallery
                items={recentActivities}
                radius={480}
                controlledRotation={scrollRotation}
              />
            </div>

            {/* Visual Dot Progress Indicators for the 8 Cards */}
            <div className="flex items-center gap-2 mt-6 sm:mt-8 z-20" aria-label="Campus Activity Navigation">
              {recentActivities.map((item, idx) => (
                <div
                  key={idx}
                  title={item.common}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-7 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentActivitySection;

