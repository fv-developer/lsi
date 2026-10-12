"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

export function AboutBentoSection() {
  const [partnerIndex, setPartnerIndex] = useState(0);

  const collaborationPartners = [
    {
      id: 1,
      name: "Ramji Assar Vidyalaya Wadi Trust's Laxmichand Golwala College of Commerce and Economics",
      image: "/images/about-us/collaboration-partners/rav.webp",
    },
    {
      id: 2,
      name: "B. K. Birla College, Kalyan",
      image: "/images/about-us/collaboration-partners/bkbc.webp",
    },
    {
      id: 3,
      name: "MKES Khandwala College",
      image: "/images/about-us/collaboration-partners/mkes.webp",
    },
  ];

  // Auto-rotate collaboration partners every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPartnerIndex((prev) => (prev + 1) % collaborationPartners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [collaborationPartners.length]);

  return (
    <section className="py-16 sm:py-24 bg-white text-zinc-900 overflow-hidden">
      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Bento Master Container: 2 Equal Columns on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
          
          {/* =========================================================
              LEFT MASTER COLUMN (Cols 1 & 2)
              ========================================================= */}
          <div className="flex flex-col gap-4 sm:gap-5 justify-between">
            {/* Top Left: Campus Tour / Reading Room Image Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative rounded-[22px] overflow-hidden shadow-sm group h-[300px] sm:h-[330px] border border-slate-100 bg-slate-900"
            >
              <Image
                src="/images/about/about-card-1.JPG"
                alt="Campus Tour Reading Room"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Labels */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="font-heading text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-md">
                  Campus Tour
                </span>
                <span className="bg-black/60 backdrop-blur-md text-slate-200 text-xs font-medium px-3.5 py-1 rounded-full border border-white/15 shadow-md">
                  Reading Room
                </span>
              </div>
            </motion.div>

            {/* Bottom Left Grid: Icon Row + Global Campuses (Col 1) & Team Members (Col 2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1">
              {/* Sub-Col 1: Icons + Global Campuses */}
              <div className="flex flex-col gap-3.5 sm:gap-4 justify-between h-full">
                {/* 2 Square Award Image Boxes Row */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="bg-white rounded-[18px] h-24 sm:h-35 sm:h-[140px] flex items-center justify-center p-2 shadow-sm border border-slate-200/80 relative overflow-hidden group hover:scale-105 transition-all"
                  >
                    <Image
                      src="/images/about-us/award/AWARD-2024-18.jpg"
                      alt="EducationWorld Grand Jury Award"
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                      sizes="150px"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="bg-white rounded-[18px] h-24 sm:h-35 sm:h-[140px] flex items-center justify-center p-2 shadow-sm border border-slate-200/80 relative overflow-hidden group hover:scale-105 transition-all"
                  >
                    <Image
                      src="/images/about-us/award/AWARD-2024-26.png"
                      alt="National Healthcare Wellness Award"
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                      sizes="150px"
                    />
                  </motion.div>
                </div>

                {/* Awards & Accreditation Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                  className="bg-[#e8f0fe] text-zinc-900 p-6 sm:p-7 rounded-[22px] shadow-sm flex flex-col justify-between flex-1 min-h-[250px]"
                >
                  <div>
                    <h5 className="font-heading text-lg sm:text-xl font-bold text-zinc-900 tracking-tight mb-3">
                      Awards & Accreditation
                    </h5>
                    <p className="font-body text-zinc-700 text-[16px] font-normal leading-relaxed">
                      Proven & Accredited Excellence in Nutrition and Dietetics
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Sub-Col 2: Team Members Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="text-white p-6 sm:p-7 rounded-[22px] shadow-md flex flex-col justify-between min-h-[330px] h-full"
                style={{ background: "linear-gradient(145deg, rgb(17, 133, 13) 0%, rgb(49, 75, 131) 100%)" }}
              >
                <div>
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-white block leading-none mb-4">
                    20+
                  </span>
                  <h5 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight mb-2">
                    Team members
                  </h5>
                </div>
                <p className="font-body text-slate-100 text-[16px] font-light leading-relaxed">
                  Our team is committed to delivering exceptional results with unwavering dedication. We collaborate closely to ensure every project exceeds expectations.
                </p>
              </motion.div>
            </div>
          </div>

          {/* =========================================================
              RIGHT MASTER COLUMN (Cols 3 & 4)
              ========================================================= */}
          <div className="flex flex-col gap-4 sm:gap-5 justify-between">
            {/* Top Right Grid: Affiliation (Col 3) & Collaboration/Global Campuses (Col 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1">
              {/* Sub-Col 3: Affiliation with University of Mumbai */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="text-white p-6 sm:p-7 rounded-[22px] flex flex-col justify-between shadow-md relative overflow-hidden group min-h-[340px] h-full"
                style={{ background: "linear-gradient(145deg, rgb(119, 28, 89) 0%, rgb(25, 32, 72) 100%)" }}
              >
                <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Logo & Heading at top */}
                <div className="relative z-10 text-left flex flex-col items-start pt-1">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mb-4 relative flex items-center justify-start">
                    <Image
                      src="/images/about-us/collaboration-partners/University_of_Mumbai.webp"
                      alt="University of Mumbai Logo"
                      fill
                      className="object-contain drop-shadow-lg filter brightness-110 object-left"
                      sizes="120px"
                      priority
                    />
                  </div>

                  <h5 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white leading-snug text-left mb-3">
                    Affiliation with <br />
                    <span className="text-white">University of Mumbai</span>
                  </h5>
                </div>

                {/* Paragraph text below heading */}
                <p className="font-body text-slate-200 text-[16px] font-light leading-relaxed relative z-10 text-left mt-auto">
                  We are committed to delivering industry-focused education, practical learning, and meaningful experiences that prepare students for the future of business.
                </p>
              </motion.div>

              {/* Sub-Col 4: Collaboration Partners (Top) + Global Campuses (Bottom) */}
              <div className="flex flex-col gap-3.5 sm:gap-4 justify-between h-full">
                {/* Collaboration Partners Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  className="bg-[#f4f6f8] text-zinc-900 p-5 rounded-[22px] flex flex-col justify-between shadow-sm flex-1 min-h-[200px]"
                >
                  <h5 className="font-heading text-xs sm:text-sm font-bold text-zinc-900 tracking-tight">
                    Collaboration Partners
                  </h5>

                  <div className="bg-white p-2.5 sm:p-3 rounded-[14px] shadow-sm border border-slate-200/60 my-2 flex items-center justify-center min-h-[90px] relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={partnerIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-14 sm:h-16 flex items-center justify-center"
                      >
                        <Image
                          src={collaborationPartners[partnerIndex].image}
                          alt={collaborationPartners[partnerIndex].name}
                          fill
                          className="object-contain p-1"
                          sizes="(max-width: 768px) 100vw, 250px"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    {collaborationPartners.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPartnerIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === partnerIndex
                            ? "w-3.5 bg-[#05284c]"
                            : "w-1.5 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Partner slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Global Campuses Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
                  className="bg-[#f4f6f8] text-zinc-900 p-5 rounded-[22px] shadow-sm flex flex-col justify-between flex-1 min-h-[200px]"
                >
                  <div>
                    <span className="font-heading text-3xl sm:text-4xl font-bold text-zinc-900 block leading-none mb-2">
                      2
                    </span>
                    <h5 className="font-heading text-sm sm:text-base font-bold text-zinc-900 tracking-tight mb-1">
                      Global Campuses
                    </h5>
                  </div>
                  <p className="font-body text-zinc-600 text-[16px] font-light leading-relaxed">
                    Fostering academic excellence and industry immersion across premiere educational hubs.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Bottom Right: Campus Facility Wide Image Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              className="relative rounded-[22px] overflow-hidden shadow-sm group h-[270px] sm:h-[290px] border border-slate-100 bg-slate-900"
            >
              <Image
                src="/images/about/about-card-2.jpeg"
                alt="LSI Modern Campus Facility"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutBentoSection;
