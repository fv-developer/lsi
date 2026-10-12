"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Award } from "lucide-react";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";

export function WhoWeAreSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const headlineText =
    "LSI offers industry-focused programmes in Nutrition and Dietetics, combining academic knowledge with practical training in nutrition, fitness, athletic performance, and allied health sciences. Through internships, industry collaborations, and hands-on learning, students gain real-world exposure and develop the skills needed for successful careers in health and wellness.";

  return (
    <section className="py-16 sm:py-24 bg-white text-zinc-900 overflow-hidden">
      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Animated Scroll Fill Heading (Matching Homepage TextGradientScroll) */}
        <div className="w-full text-left mb-12 sm:mb-16">
          <TextGradientScroll
            text={headlineText}
            type="letter"
            textOpacity="soft"
            className="text-2xl sm:text-4xl lg:text-[42px] font-normal tracking-tight leading-[1.3] text-zinc-900 text-left justify-start w-full"
          />
        </div>

        {/* Media Grid: 65% Left Video Card | 35% Right Image Card */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Video Card (65% width) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-[65%] relative rounded-[10px] overflow-hidden shadow-xl bg-slate-950 min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex flex-col justify-between group"
          >
            {/* Embedded MP4 Video */}
            <video
              ref={videoRef}
              src="/images/about-us/LSI.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-[1] pointer-events-none" />

            {/* Top Bar: Controls Only (Pause/Play & Mute/Unmute) */}
            <div className="relative z-10 p-5 sm:p-6 flex items-center justify-end">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#f9d868]" />
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Subtitle / Tag Bar */}
            <div className="relative z-10 p-5 sm:p-6 text-white">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-light tracking-wide">
                <span>✦ Clinical Rotations</span>
                <span>✦ Mumbai Campuses</span>
                <span>✦ Practical Care</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image Card with Overlay Box (35% width) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-[35%] relative rounded-[10px] overflow-hidden shadow-xl min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex flex-col justify-end p-5 sm:p-6 group"
          >
            {/* Background Image */}
            <Image
              src="/images/about-us/who-we-are.webp"
              alt="LSI Who We Are"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

            {/* Floating Yellow Highlight Card Overlay */}
            <div className="relative z-10 bg-[#f9d868] text-[#0b1428] rounded-[18px] p-5 sm:p-6 shadow-2xl w-full border border-white/20">
              {/* Text formatted as paragraph <p> */}
              <p className="font-body text-sm sm:text-base font-medium leading-snug text-[#0b1428]">
                Creating future-ready leaders in integrative health, nutrition, and clinical excellence.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAreSection;
