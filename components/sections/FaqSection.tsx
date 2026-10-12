"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/common/SplitText";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is Integrative Nutrition & Dietetics?",
    answer:
      "Integrative Nutrition & Dietetics means under the concepts of ‘Food, Nutrition, & Diet’, we teach to our students about food, nutrition, and diet as well as about lifestyle management like sleep management, stress management, exercise management, and spirit.",
  },
  {
    id: "faq-2",
    question: "What is the difference between Integrative Nutrition & Dietetics & Clinical Dietetics?",
    answer:
      "Integrative Nutrition & Dietetics covers all the topics included in a Clinical Nutrition & Dietetics curriculum with the added focus on Lifestyle Management. The integrative curriculum gives a student a broader approach as compared to just the Clinical Dietetics course.",
  },
  {
    id: "faq-3",
    question: "Is the course affiliated to the University of Mumbai?",
    answer:
      "Yes, the programmes offered by LSI are affiliated to the University of Mumbai. Lifeness Science Institute (LSI) is an institute that has developed the curriculum in Integrative Nutrition & Dietetics, however these programmes are offered in colleges which are affiliated to University of Mumbai. The colleges are MKES Nagindas Khandwala College (Empowered Autonomous), Malad West; B.K. Birla College (Empowered Autonomous), Kalyan; and The IPA-MSB's Bombay College of Pharmacy (Autonomous), Kalina.",
  },
  {
    id: "faq-4",
    question: "What makes LSI different from other nutrition institutes?",
    answer:
      "Our focus on Integrative Nutrition combines science, fitness, and allied health with hands-on training enabled through industry-partnerships with hospitals, food industries, and fitness centers. We emphasise employability, entrepreneurship, and a global perspective, that gives our students a competitive edge.",
  },
  {
    id: "faq-5",
    question: "Who are the faculty members at LSI?",
    answer:
      "All the faculty members at LSI are minimum M.Sc. qualified and practicing nutritionists and dieticians with practical expertise.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full relative py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading & Subtext */}
          <div className="lg:col-span-5 flex flex-col items-start text-left sticky top-28">
            <SplitText
              text="FAQ's"
              tag="h2"
              splitType="chars"
              textAlign="left"
              useScrollTrigger={true}
              delay={25}
              duration={0.7}
              className="text-4xl sm:text-5xl font-extrabold text-[#0b1428] tracking-tight font-heading leading-tight mb-6"
            />
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-md">
              Find quick answers to common questions about our programmes, Mumbai University affiliations, curriculum, faculty expertise, and admissions process.
            </p>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-7 w-full flex flex-col border-t border-slate-200">
            {faqData.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border-b border-slate-200 transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between text-left gap-4 group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span 
                      style={{ letterSpacing: "0px" }}
                      className={`text-lg sm:text-xl font-medium font-heading transition-colors duration-200 ${isOpen ? "text-emerald-600 font-bold" : "text-[#0b1428] group-hover:text-emerald-600"}`}
                    >
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-slate-500 transition-transform duration-300">
                      {isOpen ? (
                        <ArrowUp className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ArrowDown className="w-5 h-5 group-hover:text-emerald-600" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <p 
                          style={{ letterSpacing: "0px" }}
                          className="text-slate-600 text-base leading-relaxed font-normal pt-1 pb-6 pr-6"
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
