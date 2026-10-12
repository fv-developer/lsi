"use client";

import React from "react";
import { SplitText } from "@/components/common/SplitText";
import { CalendlyCarousel, CarouselItem } from "@/components/ui/connected-carousel";

const MENTOR_CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: "luke-coutinho",
    stat: "Luke Coutinho",
    quote:
      "Global wellness visionary and co-founder of LSI. Luke pioneers integrative lifestyle medicine protocols combining clinical nutrition, cellular wellness, and evidence-based patient care.",
    author: "CO-FOUNDER & CHIEF MENTOR",
    role: "Holistic Health, Clinical Nutrition & Integrative Medicine",
    defaultImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    selectedImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    alt: "Luke Coutinho - Co-Founder & Chief Mentor",
  },
  {
    id: "ananya-sharma",
    stat: "Dr. Ananya Sharma",
    quote:
      "Senior clinical dietitian and researcher specializing in gut microbiome therapeutics and lifestyle oncology. Dr. Ananya leads LSI's practical research labs and hospital rotation internships.",
    author: "HEAD OF CLINICAL RESEARCH",
    role: "Metabolic Health, Gut Microbiome & Functional Foods",
    defaultImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
    selectedImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
    alt: "Dr. Ananya Sharma - Head of Clinical Research",
  },
  {
    id: "rajesh-mehta",
    stat: "Prof. Rajesh Mehta",
    quote:
      "Pioneer in sports nutrition and functional food formulation. Prof. Mehta mentors LSI students in sports performance protocols, clinical consultation strategies, and nutraceutical research.",
    author: "DIRECTOR OF SPORTS PERFORMANCE",
    role: "Nutraceuticals R&D & Athletic Performance Nutrition",
    defaultImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80",
    selectedImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80",
    alt: "Prof. Rajesh Mehta - Director of Sports Performance",
  },
  {
    id: "vikramaditya-sen",
    stat: "Dr. Vikramaditya Sen",
    quote:
      "Renowned practitioner in integrative oncology and cellular rejuvenation. Dr. Vikram leads international clinical workshops and research publications at LSI.",
    author: "CHIEF ADVISOR - INTEGRATIVE ONCOLOGY",
    role: "Cellular Wellness & Metabolic Medicine",
    defaultImage:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1000&q=80",
    selectedImage:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1000&q=80",
    alt: "Dr. Vikramaditya Sen - Chief Advisor",
  },
  {
    id: "priya-nair",
    stat: "Priya Nair",
    quote:
      "Lead faculty for pediatric and maternal nutrition. Priya specializes in community nutrition initiatives and clinical internship supervision across Mumbai hospital networks.",
    author: "HEAD OF ACADEMICS & NUTRITION",
    role: "Pediatric & Maternal Clinical Nutrition",
    defaultImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80",
    selectedImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80",
    alt: "Priya Nair - Head of Academics & Nutrition",
  },
];

export function MeetOurMentorSection() {
  return (
    <section
      className="py-16 sm:py-24 text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgb(50, 68, 108) 0%, rgb(55, 108, 16) 100%)",
      }}
    >
      {/* Background Decorative Gradient Light Spheres */}
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-[#36499e]/20 rounded-full blur-[160px] pointer-events-none z-[1]" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#f9d868]/10 rounded-full blur-[160px] pointer-events-none z-[1]" />

      {/* Subtle Grid Pattern Overlay with Radial Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none z-[2]" />

      <div className="w-full max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header Row - Centered Full Width */}
        <div className="text-center w-full max-w-full mb-4 sm:mb-8 flex flex-col items-center justify-center">
          <h2 className="lsi-section-badge text-white mb-0 text-center">
            <SplitText
              text="MEET OUR MENTORS"
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

        {/* Connected Carousel Component */}
        <CalendlyCarousel
          items={MENTOR_CAROUSEL_ITEMS}
          autoPlayInterval={5000}
          pauseOnHover={true}
        />
      </div>
    </section>
  );
}

export default MeetOurMentorSection;
