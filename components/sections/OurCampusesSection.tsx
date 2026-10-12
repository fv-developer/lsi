"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/common/SplitText";

export interface CampusItem {
  id: string;
  name: string;
  locationTag: string;
  description: string;
  knowMoreLink: string;
  images: {
    url: string;
    alt: string;
    rotation: string;
    offset: string;
  }[];
}

const campusData: CampusItem[] = [
  {
    id: "mkes-malad",
    name: "MKES - Malad West",
    locationTag: "MKES Nagindas Khandwala College (Empowered Autonomous)",
    description:
      "A premier academic center featuring modern biochemistry & nutrition diagnostic labs, research infrastructure, clinical simulation rooms, and vibrant student hub spaces in Malad West.",
    knowMoreLink: "/campuses/mkes-malad",
    images: [
      {
        url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
        alt: "MKES Campus Building",
        rotation: "-rotate-6",
        offset: "translate-x-0 translate-y-2 z-10",
      },
      {
        url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
        alt: "Biochemistry Research Lab",
        rotation: "rotate-0",
        offset: "translate-x-12 sm:translate-x-16 -translate-y-4 z-20",
      },
      {
        url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
        alt: "Student Activity Center",
        rotation: "rotate-6",
        offset: "translate-x-24 sm:translate-x-32 translate-y-3 z-30",
      },
    ],
  },
  {
    id: "rav-ghatkopar",
    name: "RAV - Ghatkopar West",
    locationTag: "RAV Campus (Ghatkopar West)",
    description:
      "Equipped with specialized clinical consultation suites, practical dietary counseling labs, interactive masterclass auditoriums, and dedicated sports & health performance centers.",
    knowMoreLink: "/campuses/rav-ghatkopar",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
        alt: "Clinical Suite",
        rotation: "-rotate-6",
        offset: "translate-x-0 translate-y-2 z-10",
      },
      {
        url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
        alt: "Auditorium & Events",
        rotation: "rotate-0",
        offset: "translate-x-12 sm:translate-x-16 -translate-y-4 z-20",
      },
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        alt: "Library & Study Wing",
        rotation: "rotate-6",
        offset: "translate-x-24 sm:translate-x-32 translate-y-3 z-30",
      },
    ],
  },
  {
    id: "bkbc-kalyan",
    name: "BKBC - Kalyan",
    locationTag: "B.K. Birla College (Empowered Autonomous)",
    description:
      "Sprawling multi-acre campus offering advanced research infrastructure, food science laboratories, athletics facilities, and immersive integrative care learning environments.",
    knowMoreLink: "/campuses/bkbc-kalyan",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80",
        alt: "B.K. Birla Campus Main Wing",
        rotation: "-rotate-6",
        offset: "translate-x-0 translate-y-2 z-10",
      },
      {
        url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
        alt: "Sports & Fitness Complex",
        rotation: "rotate-0",
        offset: "translate-x-12 sm:translate-x-16 -translate-y-4 z-20",
      },
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        alt: "Healthcare Expo Hall",
        rotation: "rotate-6",
        offset: "translate-x-24 sm:translate-x-32 translate-y-3 z-30",
      },
    ],
  },
];

export function OurCampusesSection() {
  const [activeCampusId, setActiveCampusId] = useState<string | null>(null);

  return (
    <section
      style={{
        background: "linear-gradient(145deg, rgb(119 28 89) 0%, rgb(25 32 72) 100%)",
      }}
      className="w-full relative py-16 sm:py-24 text-white overflow-hidden border-t border-white/10"
    >
      {/* Background ambient grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Main Section Heading with Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14"
        >
          <SplitText
            text="Our Campuses"
            tag="h2"
            splitType="chars"
            textAlign="left"
            useScrollTrigger={true}
            delay={25}
            duration={0.7}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight"
          />
        </motion.div>

        {/* Accordion List Container */}
        <div
          onMouseLeave={() => setActiveCampusId(null)}
          className="w-full flex flex-col border-t border-white/10"
        >
          {campusData.map((campus) => {
            const isExpanded = activeCampusId === campus.id;

            return (
              <motion.div
                key={campus.id}
                onMouseEnter={() => setActiveCampusId(campus.id)}
                onClick={() => setActiveCampusId(isExpanded ? null : campus.id)}
                animate={{
                  backgroundColor: isExpanded
                    ? "rgba(25, 30, 65, 0.9)"
                    : "rgba(25, 30, 65, 0)",
                  borderRadius: isExpanded ? "24px" : "0px",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full overflow-hidden border-b border-white/10 cursor-pointer select-none transition-all duration-300 ${
                  isExpanded
                    ? "my-3 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md border-t border-white/10"
                    : "py-6 sm:py-7 px-4 hover:bg-white/[0.02]"
                }`}
              >
                {/* Heading row in pure white with standalone top-right arrow icon */}
                <div className="flex items-center justify-between w-full group">
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
                    {campus.name}
                  </h4>
                  <ArrowUpRight
                    className={`w-7 h-7 sm:w-9 sm:h-9 stroke-[2.5] transition-all duration-300 shrink-0 ml-4 ${
                      isExpanded
                        ? "text-emerald-400 rotate-45 scale-110"
                        : "text-white/70 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1"
                    }`}
                  />
                </div>

                {/* Expandable Body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1.5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        {/* Left Column: Location Tag -> Paragraph Description */}
                        <div className="lg:col-span-6 flex flex-col items-start text-left">
                          <span className="text-xs sm:text-sm font-mono tracking-wider uppercase text-emerald-400 font-bold mb-1.5 block">
                            {campus.locationTag}
                          </span>

                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal line-clamp-2 max-w-xl">
                            {campus.description}
                          </p>
                        </div>

                        {/* Right Column: 3 Fanned Out Cards */}
                        <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end">
                          <div className="relative w-[340px] sm:w-[440px] h-[210px] sm:h-[250px] flex items-center justify-center">
                            {/* Left Image (tilted left) */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.85 }}
                              transition={{ duration: 0.35, delay: 0.05 }}
                              className="absolute left-1/2 -translate-x-[125%] sm:-translate-x-[135%] top-5 w-[130px] sm:w-[160px] h-[170px] sm:h-[205px] rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl -rotate-12 z-10 hover:scale-105 hover:z-40 transition-all duration-300"
                            >
                              <img
                                src={campus.images[0].url}
                                alt={campus.images[0].alt}
                                className="w-full h-full object-cover pointer-events-none"
                              />
                            </motion.div>

                            {/* Center Image (upright, front z-index) */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.85 }}
                              transition={{ duration: 0.35, delay: 0.1 }}
                              className="absolute left-1/2 -translate-x-1/2 top-0 w-[138px] sm:w-[168px] h-[180px] sm:h-[218px] rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl rotate-0 z-20 hover:scale-105 hover:z-40 transition-all duration-300"
                            >
                              <img
                                src={campus.images[1].url}
                                alt={campus.images[1].alt}
                                className="w-full h-full object-cover pointer-events-none"
                              />
                            </motion.div>

                            {/* Right Image (tilted right) */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.85 }}
                              transition={{ duration: 0.35, delay: 0.15 }}
                              className="absolute left-1/2 translate-x-[25%] sm:translate-x-[35%] top-5 w-[130px] sm:w-[160px] h-[170px] sm:h-[205px] rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl rotate-12 z-10 hover:scale-105 hover:z-40 transition-all duration-300"
                            >
                              <img
                                src={campus.images[2].url}
                                alt={campus.images[2].alt}
                                className="w-full h-full object-cover pointer-events-none"
                              />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OurCampusesSection;
