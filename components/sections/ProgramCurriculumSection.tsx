"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Feather,
  ChevronDown,
} from "lucide-react";

export interface CurriculumCardItem {
  type: "courses" | "immersions" | "tools";
  title: string;
  items: {
    name: string;
    sublabel?: string;
  }[];
  image: string;
}

export interface TermData {
  id: string;
  termNumber: string;
  termTitle: string;
  learnCards: CurriculumCardItem[];
  applyProject: {
    title: string;
    description: string;
    image: string;
  };
}

const dummyCurriculumData: TermData[] = [
  {
    id: "term-1",
    termNumber: "Term 1",
    termTitle: "Laying the Foundations",
    learnCards: [
      {
        type: "courses",
        title: "Core Courses",
        items: [
          { name: "Human Anatomy & Physiology" },
          { name: "Fundamentals of Food Science" },
          { name: "Cellular Nutrition Principles" },
          { name: "Biochemistry & Metabolism" },
          { name: "Macronutrient Science" },
          { name: "Dietary Assessment Protocols" },
          { name: "Public Health Nutrition" },
          { name: "Introduction to Micronutrients" },
        ],
        image: "/images/about/about-card-1.jpg",
      },
      {
        type: "immersions",
        title: "Immersions with Industry Leaders",
        items: [
          { name: "Clinical Case Assessment", sublabel: "Mentor from Tata Memorial Hospital" },
          { name: "Food Composition Analysis", sublabel: "Mentor from FSSAI Accredited Labs" },
          { name: "Metabolic Health Foundations", sublabel: "Mentor from Luke Coutinho Care" },
          { name: "Preventive Healthcare Systems", sublabel: "Mentor from Apollo Healthcare" },
        ],
        image: "/images/campus-activity/industry-visit/National-Food-Laboratory-Visit.webp",
      },
      {
        type: "tools",
        title: "Diagnostic & Planning Tools",
        items: [
          { name: "Dietary Assessment Softwares" },
          { name: "Body Composition Analyzers (BIA)" },
          { name: "Nutritional Calculator Suites" },
          { name: "Biomarker Mapping Kits" },
          { name: "Patient History Tracker" },
          { name: "Clinical Calorie Loggers" },
        ],
        image: "/images/about-us/who-we-are.webp",
      },
    ],
    applyProject: {
      title: "Design a Whole-Food Nutritional Protocol",
      description:
        "Students begin by spotting a real metabolic challenge and build an evidence-based clinical diet plan from the ground up. From macro-micro balance to patient adherence strategies, they work through the complete clinical workflow applying everything learned in Term 1.",
      image: "/images/campus-activity/club-activity/Club-Activities-4.webp",
    },
  },
  {
    id: "term-2",
    termNumber: "Term 2",
    termTitle: "Building the Core",
    learnCards: [
      {
        type: "courses",
        title: "Clinical Core Courses",
        items: [
          { name: "Medical Nutrition Therapy I" },
          { name: "Endocrine & Metabolic Health" },
          { name: "Gut Microbiome Science" },
          { name: "Cardiovascular Dietetics" },
          { name: "Nutraceuticals & Botanicals" },
          { name: "Clinical Biochemistry II" },
          { name: "Pediatric & Geriatric Nutrition" },
          { name: "Immunonutrition Protocols" },
        ],
        image: "/images/campus-activity/workshop/First-Aid.webp",
      },
      {
        type: "immersions",
        title: "Hospital & Wellness Immersions",
        items: [
          { name: "ICU & Inpatient Care Rounds", sublabel: "Mentor from Fortis Hospital" },
          { name: "Gut Healing Protocols", sublabel: "Mentor from Luke Coutinho Care Network" },
          { name: "Diabetes Reversal Science", sublabel: "Mentor from Dr. Mohan's Diabetes Center" },
          { name: "Sports Nutrition Masterclass", sublabel: "Mentor from Olympic Training Academies" },
        ],
        image: "/images/campus-activity/masterclass/Mindful-Eating-Masterclass.webp",
      },
      {
        type: "tools",
        title: "Clinical Software & Tech",
        items: [
          { name: "Continuous Glucose Monitors (CGM)" },
          { name: "Metabolic Cart RMR Testing" },
          { name: "Diet-Master Pro Clinical" },
          { name: "Genomics Panel Interpretation" },
          { name: "Gut Microbiome Sequencing" },
          { name: "Patient Portal EHR Systems" },
        ],
        image: "/images/about/about-card-2.jpeg",
      },
    ],
    applyProject: {
      title: "Real Patient Clinical Case Study",
      description:
        "Students work with real patient profiles to analyze lipid panels, blood glucose curves, and lifestyle triggers. They craft personalised 12-week therapeutic interventions under senior practitioner supervision.",
      image: "/images/campus-activity/workshop/Meditation-and-Breathing-Techniques.jpg",
    },
  },
  {
    id: "term-3",
    termNumber: "Term 3",
    termTitle: "Scaling the Learning",
    learnCards: [
      {
        type: "courses",
        title: "Advanced Specialisations",
        items: [
          { name: "Oncology Nutrition Therapy" },
          { name: "Autoimmune Protocol Dietetics" },
          { name: "Integrative Oncology Care" },
          { name: "Neuro-Nutrition & Mental Health" },
          { name: "Renal & Hepatic Dietetics" },
          { name: "Functional Food Product Dev" },
          { name: "Sports Athletic Performance" },
          { name: "Bio-hacking & Cellular Longevity" },
        ],
        image: "/images/campus-activity/industry-visit/Amul-Factory-Visit.webp",
      },
      {
        type: "immersions",
        title: "Industry & Research Immersions",
        items: [
          { name: "Clinical Oncology Rounds", sublabel: "Mentor from Tata Memorial Oncology" },
          { name: "Nutraceutical R&D Labs", sublabel: "Mentor from Himalayan Organics" },
          { name: "Lifestyle Disease Reversal", sublabel: "Mentor from Integrative Healing Guild" },
          { name: "Functional Foods Production", sublabel: "Mentor from Amul Research Center" },
        ],
        image: "/images/campus-activity/industry-visit/Go-Cheese.jpeg",
      },
      {
        type: "tools",
        title: "Advanced Research Labs",
        items: [
          { name: "HPLC Nutrient Extraction" },
          { name: "Mass Spectrometry Food Tests" },
          { name: "Microbiome Analytics AI" },
          { name: "Clinical Dietetics Software" },
          { name: "Bio-Impedance Spectroscopy" },
          { name: "Telehealth Consultation Dashboards" },
        ],
        image: "/images/about-us/why-choose-bg.webp",
      },
    ],
    applyProject: {
      title: "Develop an Evidence-Based Nutraceutical Prototype",
      description:
        "Formulate a functional food or botanical nutraceutical prototype targeting gut inflammation or metabolic syndrome, backed by peer-reviewed clinical research and market stability testing.",
      image: "/images/campus-activity/community-service/food-donation.webp",
    },
  },
  {
    id: "term-4",
    termNumber: "Term 4",
    termTitle: "Closing the Loop",
    learnCards: [
      {
        type: "courses",
        title: "Honours Capstone & Practice",
        items: [
          { name: "Full-Time Hospital Internship" },
          { name: "Honours Research Thesis" },
          { name: "Entrepreneurship & Private Practice" },
          { name: "Healthcare Legal & Regulatory" },
          { name: "Clinical Consultation Mastery" },
          { name: "Evidence-Based Journal Review" },
          { name: "Global Telehealth Operations" },
          { name: "Holistic Lifestyle Coaching" },
        ],
        image: "/images/campus-activity/in-house-event/Samagra.webp",
      },
      {
        type: "immersions",
        title: "Final Placement & Hospital Residency",
        items: [
          { name: "Multi-Specialty Hospital Residency", sublabel: "Mentor from Max Healthcare" },
          { name: "Holistic Clinical Practice Residency", sublabel: "Mentor from Luke Coutinho Wellness" },
          { name: "Wellness Corporate Advisory", sublabel: "Mentor from Corporate Health Centers" },
          { name: "Clinical Nutrition Publishing", sublabel: "Mentor from Research Journals" },
        ],
        image: "/images/campus-activity/in-house-event/new-event.jpg",
      },
      {
        type: "tools",
        title: "Practice Management Suite",
        items: [
          { name: "Electronic Health Records (EHR)" },
          { name: "HIPAA Compliant Tele-Medicine" },
          { name: "Client Billing & Scheduling CRM" },
          { name: "Nutritional Analytics Engine" },
          { name: "Scientific Publishing Portals" },
          { name: "Global Patient Tracking Suite" },
        ],
        image: "/images/about-us/award/AWARD-2024-18.jpg",
      },
    ],
    applyProject: {
      title: "Honours Dissertation & Hospital Internship Defense",
      description:
        "Complete a 6-month intensive clinical hospital rotation, submitting and defending an original clinical research dissertation in front of an expert panel from the University of Mumbai and academic council.",
      image: "/images/campus-activity/in-house-event/Sports-Day.jpg",
    },
  },
];

export function ProgramCurriculumSection() {
  const [activeTermIndex, setActiveTermIndex] = useState(0);
  const [slideIndices, setSlideIndices] = useState<number[]>([0, 0, 0, 0]);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false);

  const termRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update slide index for a specific term
  const handlePrevSlide = (termIdx: number, totalSlides: number) => {
    setSlideIndices((prev) => {
      const next = [...prev];
      next[termIdx] = next[termIdx] === 0 ? totalSlides - 1 : next[termIdx] - 1;
      return next;
    });
  };

  const handleNextSlide = (termIdx: number, totalSlides: number) => {
    setSlideIndices((prev) => {
      const next = [...prev];
      next[termIdx] = next[termIdx] >= totalSlides - 1 ? 0 : next[termIdx] + 1;
      return next;
    });
  };

  // Scroll to a term section when clicking the sticky left tab
  const scrollToTerm = (idx: number) => {
    setActiveTermIndex(idx);
    setMobileAccordionOpen(false);
    const target = termRefs.current[idx];
    if (target) {
      const yOffset = -100;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Observe scroll position to highlight the active term as you scroll
  useEffect(() => {
    const handleScroll = () => {
      termRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // When the card top is near the top third of viewport and bottom is still below header
        if (rect.top <= 260 && rect.bottom > 160) {
          setActiveTermIndex(idx);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="curriculum"
      className="w-full text-white py-16 sm:py-20 lg:py-24 relative"
      style={{
        background: "linear-gradient(145deg, rgb(50, 68, 108) 0%, rgb(55, 108, 16) 100%)",
      }}
    >
      {/* Background ambient grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Ambient background glow accents safely enclosed in isolated overflow-hidden wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-500/15 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-emerald-500/15 blur-[150px] rounded-full" />
      </div>

      {/* Top Header Centered */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-8 sm:mb-12 relative z-10">
        <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-heading font-bold text-white tracking-tight uppercase">
          CURRICULUM
        </h2>
      </div>

      {/* Mobile Term Dropdown Accordion */}
      <div className="lg:hidden px-4 sm:px-6 mb-8 sticky top-20 z-30">
        <button
          type="button"
          onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-[#1e1b4b] border border-indigo-500/30 text-left transition-colors shadow-lg"
        >
          <div>
            <span className="text-xs font-semibold text-[#f59e0b] uppercase tracking-wider block">
              {dummyCurriculumData[activeTermIndex].termNumber}
            </span>
            <span className="text-base font-bold text-white">
              {dummyCurriculumData[activeTermIndex].termTitle}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-[#f59e0b] transition-transform duration-300 ${
              mobileAccordionOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {mobileAccordionOpen && (
          <div className="mt-2 p-2 rounded-xl bg-[#0e1326] border border-white/10 space-y-1">
            {dummyCurriculumData.map((term, idx) => (
              <button
                key={term.id}
                type="button"
                onClick={() => scrollToTerm(idx)}
                className={`w-full text-left p-3 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  idx === activeTermIndex
                    ? "bg-[#f9d868] text-zinc-950 font-bold"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <span>
                  <strong className="text-xs uppercase mr-2 opacity-80">
                    {term.termNumber}:
                  </strong>
                  {term.termTitle}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Container Layout: Centered container with full-bleed left background for sticky tabs */}
      <div className="max-w-[87rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="w-full flex flex-col lg:flex-row items-start gap-8 lg:gap-10 xl:gap-12 relative">
          {/* Left Column: Term Tab Buttons Touching the Left Edge, fully STICKY */}
          <aside
            className="hidden lg:block w-[260px] xl:w-[290px] shrink-0 z-20 self-start"
            style={{
              position: "sticky",
              top: "125px",
            }}
          >
            <div className="flex flex-col space-y-3.5 pr-2">
              {dummyCurriculumData.map((term, idx) => {
                const isActive = idx === activeTermIndex;
                return (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => scrollToTerm(idx)}
                    className={`w-full text-left py-3.5 sm:py-4 pl-4 sm:pl-5 pr-4 rounded-r-2xl transition-all duration-300 relative cursor-pointer group ${
                      isActive ? "text-zinc-950 font-semibold" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {/* Full-bleed background layer: ONLY for active tab */}
                    {isActive && (
                      <div
                        className="absolute top-0 bottom-0 right-0 rounded-r-2xl -z-10 transition-all duration-300 pointer-events-none bg-[#f9d868] shadow-2xl shadow-amber-500/20"
                        style={{
                          left: "-100vw", // Stretches seamlessly to the left browser edge
                        }}
                      />
                    )}

                    <span
                      className={`text-[11px] font-semibold tracking-wider uppercase block mb-1 ${
                        isActive ? "text-amber-950/80 font-bold" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {term.termNumber}
                    </span>
                    <span className="text-sm xl:text-base font-bold block leading-snug">
                      {term.termTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Column: All Terms Stream (When Term 1 finishes, Term 2 follows) */}
          <main className="flex-1 min-w-0 space-y-6 sm:space-y-8">
          {dummyCurriculumData.map((term, termIdx) => {
            const currentSlide = slideIndices[termIdx] || 0;
            const totalSlides = term.learnCards.length;

            return (
              <div
                key={term.id}
                ref={(el) => {
                  termRefs.current[termIdx] = el;
                }}
                className="rounded-[24px] border border-white/15 p-5 sm:p-6 lg:p-7 shadow-2xl relative"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(40, 56, 90, 0.85) 0%, rgba(42, 85, 12, 0.85) 100%)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Term Header Badge for Mobile/Tablet context */}
                <div className="lg:hidden pb-4 mb-4 border-b border-white/10">
                  <span className="text-xs font-semibold text-[#f59e0b] uppercase tracking-wider block">
                    {term.termNumber}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {term.termTitle}
                  </h3>
                </div>

                {/* Sub-Section 1: What you learn (With 1.3 Card Carousel) */}
                <div className="relative pl-7 sm:pl-9 pb-5 sm:pb-6 border-l border-dashed border-amber-500/40">
                  {/* Timeline Node Icon (Orange circular badge) */}
                  <div className="absolute -left-3.5 sm:-left-4 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f97316] text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>

                  {/* Header Row: Smaller Heading + Carousel Controls */}
                  <div className="flex items-center justify-between gap-4 mb-5 pt-0.5">
                    {/* What you learn font size: 23px */}
                    <h4
                      className="font-semibold text-white tracking-tight"
                      style={{ fontSize: "23px", lineHeight: "28px" }}
                    >
                      What you <span className="font-bold text-white">learn</span>
                    </h4>

                    {/* Carousel Controls */}
                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handlePrevSlide(termIdx, totalSlides)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 shadow"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="flex items-center gap-1.5 px-1">
                        {term.learnCards.map((_, dotIdx) => (
                          <span
                            key={dotIdx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              dotIdx === currentSlide
                                ? "w-5 bg-white"
                                : "w-1.5 bg-white/30"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleNextSlide(termIdx, totalSlides)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f59e0b] hover:bg-amber-400 text-black flex items-center justify-center transition-colors cursor-pointer shadow-lg shadow-amber-500/30"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-4 h-4 text-zinc-950 font-bold" />
                      </button>
                    </div>
                  </div>

                  {/* 1.3 Cards Carousel Track (First card full, second card visible by ~30%) */}
                  <div className="w-full overflow-hidden rounded-2xl">
                    <div
                      className="flex gap-4 sm:gap-5 transition-transform duration-500 ease-out"
                      style={{
                        transform: `translateX(-${currentSlide * 73}%)`,
                      }}
                    >
                      {term.learnCards.map((card, cardIdx) => (
                        <div
                          key={cardIdx}
                          className="w-[72%] sm:w-[74%] shrink-0 rounded-2xl border border-white/15 overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12"
                          style={{
                            background:
                              "linear-gradient(145deg, rgba(32, 45, 72, 0.95) 0%, rgba(35, 68, 12, 0.95) 100%)",
                          }}
                        >
                          {/* Left Details Column (7 cols) */}
                          <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
                            <div>
                              <h5
                                className="font-bold text-white mb-4"
                                style={{ fontSize: "20px", lineHeight: "26px" }}
                              >
                                {card.title}
                              </h5>

                              {/* Items List with Diamond Bullets */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2.5">
                                {card.items.map((item, itemIdx) => (
                                  <div
                                    key={itemIdx}
                                    className="flex items-start gap-1.5 text-xs sm:text-[13px] leading-snug"
                                  >
                                    <span className="text-[#f59e0b] text-xs shrink-0 mt-0.5">
                                      ✦
                                    </span>
                                    <div>
                                      <span className="text-slate-200 font-medium block">
                                        {item.name}
                                      </span>
                                      {item.sublabel && (
                                        <span className="text-[10px] text-slate-400 block font-light mt-0.5">
                                          {item.sublabel}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Photo Column (5 cols) */}
                          <div className="md:col-span-5 relative min-h-[160px] md:min-h-full">
                            <Image
                              src={card.image}
                              alt={card.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 35vw"
                              className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#202d48] via-transparent to-transparent" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub-Section 2: How you apply (Project Card) */}
                <div className="relative pl-7 sm:pl-9 pt-5 border-l border-dashed border-amber-500/40">
                  {/* Timeline Node Icon (Orange circular badge) */}
                  <div className="absolute -left-3.5 sm:-left-4 top-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f97316] text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                    <Feather className="w-3.5 h-3.5" />
                  </div>

                  {/* How you apply font size: 23px */}
                  <h4
                    className="font-semibold text-white tracking-tight mb-3.5"
                    style={{ fontSize: "23px", lineHeight: "28px" }}
                  >
                    How you <span className="font-bold text-white">apply</span>
                  </h4>

                  {/* Full-Width Project Card */}
                  <div
                    className="w-full rounded-2xl border border-white/15 overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(32, 45, 72, 0.95) 0%, rgba(35, 68, 12, 0.95) 100%)",
                    }}
                  >
                    {/* Project Info (7 cols) */}
                    <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-center">
                      <h5
                        className="font-bold text-white mb-2"
                        style={{ fontSize: "20px", lineHeight: "26px" }}
                      >
                        {term.applyProject.title}
                      </h5>
                      <p
                        className="text-slate-300 leading-relaxed font-light !text-[15px]"
                        style={{ fontSize: "15px", lineHeight: "24px" }}
                      >
                        {term.applyProject.description}
                      </p>
                    </div>

                    {/* Project Photo (5 cols) */}
                    <div className="md:col-span-5 relative min-h-[180px] md:min-h-full">
                      <Image
                        src={term.applyProject.image}
                        alt={term.applyProject.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 35vw"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#202d48] via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
        </div>
      </div>
    </section>
  );
}

export default ProgramCurriculumSection;
