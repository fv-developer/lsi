"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BgradientAnim } from "@/components/ui/soft-gradient-background-animation";
import { SplitText } from "@/components/common/SplitText";

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  category: ("Academic Council" | "Academicians")[];
}

const FACULTY_DATA: FacultyMember[] = [
  // 1. Shreya Warrier (Both Academic Council & Academicians)
  {
    id: "shreya-warrier",
    name: "MS. SHREYA WARRIER",
    role: "Assistant Professor - Food Science",
    bio: "M.Sc. in Food Science and Nutrition | UGC NET & SET Qualified",
    image: "/images/faculty/Shreya-Warrier.jpg",
    category: ["Academic Council", "Academicians"],
  },
  // 2. Ananya Sarkar (Both Academic Council & Academicians)
  {
    id: "ananya-sarkar",
    name: "MS. ANANYA SARKAR",
    role: "Sports Nutrition Lecturer",
    bio: "M.Sc. in Foods and Nutrition | UGC NET Qualified | Diabetes Educator",
    image: "/images/faculty/Ananya-Sarkar.jpg",
    category: ["Academic Council", "Academicians"],
  },
  // 3. Aditi Borhade (Both Academic Council & Academicians)
  {
    id: "aditi-borhade",
    name: "MS. ADITI BORHADE",
    role: "Public Health Dietetics Faculty",
    bio: "M.Sc. in Nutrition and Dietetics | UGC NET Qualified | PGDM Healthcare",
    image: "/images/faculty/Aditi-Borhade.jpg",
    category: ["Academic Council", "Academicians"],
  },
  // 4. Nishita Nalwaya (Both Academic Council & Academicians)
  {
    id: "nishita-nalwaya",
    name: "MS. NISHITA NALWAYA",
    role: "Clinical Nutrition Faculty",
    bio: "M.Sc. in Nutritional Science and Dietetics",
    image: "/images/faculty/Nishita-Nalwaya-1.jpg",
    category: ["Academic Council", "Academicians"],
  },

  // 5. Dr. Chanda Gokhale
  {
    id: "dr-chanda-gokhale",
    name: "DR. CHANDA GOKHALE",
    role: "Academic Chair & Senior Advisor",
    bio: "PhD in Food Science & Nutrition | 25+ Years Academic Leadership",
    image: "/images/faculty/Dr.-Chanda-Gokhale.jpg",
    category: ["Academicians"],
  },
  // 6. Yamini D. Suvarna
  {
    id: "yamini-suvarna",
    name: "DR. YAMINI D. SUVARNA",
    role: "Academic Director & Research Fellow",
    bio: "PhD, Coventry University, UK | Masters in Social Work, Mumbai University",
    image: "/images/faculty/Yamini-Dharmapal-Suvarna.jpg",
    category: ["Academicians"],
  },
  // 7. Dr. Rishita Bochia Joshi
  {
    id: "dr-rishita-joshi",
    name: "DR. RISHITA BOCHIA JOSHI",
    role: "Clinical Sciences Advisor",
    bio: "BDS | MSCDFSM | Certified Applied Clinical Nutritionist",
    image: "/images/faculty/Dr-Rishita-Bochia-Joshi.jpg",
    category: ["Academicians"],
  },
  // 8. RD Tanvi Patwari
  {
    id: "rd-tanvi-patwari",
    name: "RD TANVI PATWARI",
    role: "Senior Clinical Faculty",
    bio: "Registered Dietitian | M.Sc in Clinical Nutrition & Dietetics",
    image: "/images/faculty/RD-Tanvi-Patwari.jpg",
    category: ["Academicians"],
  },
  // 9. Ms. Farheen Khan
  {
    id: "farheen-khan",
    name: "MS. FARHEEN KHAN",
    role: "Founding Faculty & Dept Lead",
    bio: "PhD Scholar | MSc (Foods & Dietetics) | Certified Diabetes Educator",
    image: "/images/faculty/Farheen-Khan.jpg",
    category: ["Academicians"],
  },
  // 10. Shraddha Patil
  {
    id: "shraddha-patil",
    name: "MS. SHRADDHA PATIL",
    role: "Healthcare Management Lead",
    bio: "M.Sc. in Nutrition and Dietetics | PGDM in Healthcare Management",
    image: "/images/faculty/Shraddha-Patil.jpg",
    category: ["Academicians"],
  },
  // 11. Snehal Kale
  {
    id: "snehal-kale",
    name: "MS. SNEHAL KALE",
    role: "Assistant Professor - Food Tech",
    bio: "M.Tech in Food and Fermentation Technology | PhD Scholar",
    image: "/images/faculty/Snehal-Kale.jpg",
    category: ["Academicians"],
  },
  // 12. Riddhi Dashora
  {
    id: "riddhi-dashora",
    name: "MS. RIDDHI DASHORA",
    role: "Clinical Biochemistry Faculty",
    bio: "M.Sc. in Clinical Nutrition and Biochemistry",
    image: "/images/faculty/Riddhi-Dashora.jpg",
    category: ["Academicians"],
  },
  // 13. Pooja Boddu
  {
    id: "pooja-boddu",
    name: "MS. POOJA BODDU",
    role: "Clinical Nutritionist",
    bio: "M.Sc. in Clinical Nutrition",
    image: "/images/faculty/Pooja-Boddu.jpg",
    category: ["Academicians"],
  },
  // 14. Mona Desai
  {
    id: "mona-desai",
    name: "MS. MONA DESAI",
    role: "Biochemistry Faculty",
    bio: "M.Sc. Biochemistry",
    image: "/images/faculty/Mona-Desai.jpg",
    category: ["Academicians"],
  },
  // 15. Zufa Fangari
  {
    id: "zufa-fangari",
    name: "MS. ZUFA FANGARI",
    role: "Clinical Nutrition & Sports Science",
    bio: "M.Sc. Clinical Nutrition and Dietetics | PG Diploma Sports Science",
    image: "/images/faculty/Zufa-Fangari.jpg",
    category: ["Academicians"],
  },
  // 16. Gayatri Barve
  {
    id: "gayatri-barve",
    name: "MS. GAYATRI BARVE",
    role: "Public Health Specialist",
    bio: "M.Sc. Foods Nutrition & Dietetics | M.Sc. Public Health & Nutrition",
    image: "/images/faculty/Gayatri-Barve.jpg",
    category: ["Academicians"],
  },
  // 17. Neha Mistry
  {
    id: "neha-mistry",
    name: "MS. NEHA MISTRY",
    role: "Clinical Nutrition & Dietetics",
    bio: "Postgraduate in Clinical Nutrition & Dietetics",
    image: "/images/faculty/Neha-Mistry.jpg",
    category: ["Academicians"],
  },
  // 18. Bhuvana Parasuraman
  {
    id: "bhuvana-parasuraman",
    name: "MS. BHUVANA PARASURAMAN",
    role: "Nutritional Sciences Faculty",
    bio: "M.Sc. NET Qualified",
    image: "/images/faculty/Bhuvana-Parasuraman.jpg",
    category: ["Academicians"],
  },
  // 19. Ruheen Fatima Qureshi
  {
    id: "ruheen-qureshi",
    name: "MS. RUHEEN FATIMA QURESHI",
    role: "Biostatistics Specialist",
    bio: "M.Sc. in Statistics",
    image: "/images/faculty/Ruheen-Qureshi02.jpg",
    category: ["Academicians"],
  },
  // 20. Anu Hebbar
  {
    id: "anu-hebbar",
    name: "MS. ANU HEBBAR",
    role: "Microbiology & Bio-Research",
    bio: "B.Sc. Biochemistry | M.Sc. Microbiology | Cambridge Certified Educator",
    image: "/images/faculty/Anu-Hebbar.jpg",
    category: ["Academicians"],
  },
  // 21. Pallavi Vilas Sawant
  {
    id: "pallavi-sawant",
    name: "MS. PALLAVI V. SAWANT",
    role: "Sports Nutrition Specialist",
    bio: "M.Sc. Dietetics | PG Sports Nutrition | ACSM Advance Sports | IOC Scholar",
    image: "/images/faculty/Pallavi-Vilas-Sawan.jpg",
    category: ["Academicians"],
  },
  // 22. Sweety Parekh
  {
    id: "sweety-parekh",
    name: "MS. SWEETY PAREKH",
    role: "Lab Diagnostics Specialist",
    bio: "DMLT | B.Sc. (Zoology) | M.Sc. (MLT)",
    image: "/images/faculty/Sweety-Parekh.jpg",
    category: ["Academicians"],
  },
  // 23. Shalmalee Potdar
  {
    id: "shalmalee-potdar",
    name: "MS. SHALMALEE POTDAR",
    role: "Dietetics & Clinical Practice",
    bio: "M.Sc. Foods, Nutrition & Dietetics | Registered Dietitian | UGC NET",
    image: "/images/faculty/Shalmalee.jpg",
    category: ["Academicians"],
  },
];

const CATEGORIES = ["Academic Council", "Academicians"] as const;

export function MeetOurFacultySection() {
  const [activeTab, setActiveTab] =
    useState<(typeof CATEGORIES)[number]>("Academic Council");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredFaculty = FACULTY_DATA.filter((member) =>
    member.category.includes(activeTab)
  );

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#f8f9fc] text-zinc-900 relative overflow-hidden">
      {/* Soft Animated Gradient Background (Matching ACADEMIC PROGRAMMES section) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <BgradientAnim animationDuration={7} />
      </div>

      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 uppercase">
            <SplitText
              text="MEET OUR FACULTY"
              tag="span"
              splitType="chars"
              textAlign="left"
              useScrollTrigger={true}
              delay={35}
              duration={0.8}
              className="text-zinc-900"
            />
          </h2>

          {/* 2 Category Filter Tabs + Navigation Arrows Row */}
          <div className="flex items-center gap-4 flex-wrap justify-between md:justify-end">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              {CATEGORIES.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-[14px] text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#334180] text-white shadow-md scale-105"
                        : "bg-white hover:bg-slate-200 text-zinc-700 shadow-sm border border-slate-200/80"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-zinc-700 flex items-center justify-center shadow-sm hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-zinc-700 flex items-center justify-center shadow-sm hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Faculty Slider / Grid Container with Completely Hidden Scrollbar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2 -mx-2 px-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredFaculty.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="w-[230px] sm:w-[250px] lg:w-[260px] shrink-0 flex flex-col group cursor-pointer"
              >
                {/* Image Card Container */}
                <div className="relative aspect-[3/4] w-full rounded-[20px] overflow-hidden bg-slate-900 shadow-sm border border-slate-200/60">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="300px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Bottom Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* Name Overlay inside Image Card */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <span className="font-heading text-xs sm:text-sm font-normal text-white uppercase tracking-wider block drop-shadow-md">
                      {member.name}
                    </span>
                  </div>
                </div>

                {/* Below Card Meta Information with 15px Font Size */}
                <div className="pt-3 flex flex-col">
                  <span className="font-heading text-[15px] font-bold text-zinc-900 tracking-tight leading-snug line-clamp-2 mb-1 group-hover:text-[#334180] transition-colors">
                    {member.role}
                  </span>
                  <span className="font-body text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed line-clamp-2">
                    {member.bio}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default MeetOurFacultySection;
