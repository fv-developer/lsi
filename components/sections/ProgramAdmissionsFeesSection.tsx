"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  FileText,
  GraduationCap,
  CreditCard,
  Phone,
  Download,
  ShieldCheck,
  ChevronRight,
  Award,
  Clock,
  Check,
  BadgePercent,
  HelpCircle,
} from "lucide-react";
import { SplitText } from "@/components/common/SplitText";

export function ProgramAdmissionsFeesSection() {
  const [activeFeeTab, setActiveFeeTab] = useState<"scholarships" | "structure">("scholarships");

  return (
    <section
      id="admissions-fees"
      className="w-full bg-[#f8f9fc] py-12 sm:py-16 text-zinc-900 relative overflow-hidden border-t border-zinc-200"
    >
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#314b83]/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#055c02]/10 blur-3xl" />
      </div>

      <div className="max-w-[87rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-left w-full mb-6 sm:mb-8">
          <h2 className="font-heading font-normal uppercase text-[#314b83] tracking-tight text-3xl sm:!text-[64px] sm:!leading-[68px] lg:!text-[64px] lg:!leading-[68px]">
            <SplitText
              text="ADMISSIONS & FEES"
              tag="span"
              splitType="chars"
              textAlign="left"
              useScrollTrigger={true}
              delay={30}
              duration={0.7}
            />
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base font-normal max-w-2xl leading-relaxed mt-1.5">
            A simple 3-step admission process and flexible fee structure for AY 2026–27.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* FEATURED APPLICATION PROCESS CARD (Inspired by Reference Design)        */}
        {/* ========================================================================= */}
        <div
          className="w-full rounded-[20px] sm:rounded-[24px] p-5 sm:p-7 lg:p-8 text-white relative overflow-hidden shadow-2xl border border-white/10 mb-10 sm:mb-12"
          style={{
            background:
              "linear-gradient(135deg, #052614 0%, #071f2c 45%, #0d172e 100%)",
          }}
        >
          {/* Subtle Technical Grid Lines Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#f9d868]/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-emerald-500/10 blur-[110px] pointer-events-none" />

          {/* Card Top Row: Title and Dot Matrices */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-white/10">
            {/* Left Header with Custom Slanted/Bold Typography & Dot Grid */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
              <div>
                <h3 className="tracking-tight leading-[1.1] font-heading">
                  <span className="italic font-light text-slate-200 block text-lg sm:text-xl lg:text-2xl">
                    How to Submit
                  </span>
                  <span className="font-bold text-white block mt-0.5 text-2xl sm:text-3xl lg:text-[32px]">
                    Your Application
                  </span>
                </h3>
              </div>

              {/* Decorative Dot Matrix: 5 cols x 2 rows (Rose/Coral accent) */}
              <div className="hidden sm:grid grid-cols-5 gap-2 opacity-80 pl-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={`dot-left-${i}`}
                    className="w-1.5 h-1.5 rounded-full bg-[#fb7185]/80 shadow-[0_0_6px_rgba(251,113,133,0.6)]"
                  />
                ))}
              </div>
            </div>

            {/* Right Side: Decorative Dot Matrix (Amber/Gold accent) */}
            <div className="hidden md:grid grid-cols-4 gap-2 opacity-75">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={`dot-right-${i}`}
                  className="w-1.5 h-1.5 rounded-full bg-[#f9d868]/85 shadow-[0_0_6px_rgba(249,216,104,0.6)]"
                />
              ))}
            </div>
          </div>

          {/* Subtitle Indicator */}
          <div className="relative z-10 text-center py-3.5 sm:py-4">
            <span className="inline-block text-slate-300 text-xs sm:text-sm font-medium tracking-wide">
              A simple 3-step admission process
            </span>
          </div>

          {/* ========================================================================= */}
          {/* THE 3-STEP TIMELINE TRACK                                                 */}
          {/* ========================================================================= */}
          <div className="relative z-10 pt-1 pb-3">
            {/* Desktop / Tablet Horizontal Timeline Line (Hidden on tiny screens) */}
            <div className="hidden md:block relative w-full mb-3 sm:mb-4">
              {/* Connecting rail */}
              <div className="w-full h-[2px] bg-gradient-to-r from-emerald-500/20 via-emerald-400/60 to-emerald-500/20 relative" />

              {/* Step Markers positioned directly on the rail */}
              <div className="grid grid-cols-3 absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full">
                {/* Step 1 Marker: Rose / Coral Square */}
                <div className="flex justify-center">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#fb7185] shadow-[0_0_10px_rgba(251,113,133,0.9)] transform rotate-45" />
                </div>

                {/* Step 2 Marker: Cyan / Sky Blue Square */}
                <div className="flex justify-center">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.9)] transform rotate-45" />
                </div>

                {/* Step 3 Marker: Purple / Violet Square */}
                <div className="flex justify-center">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.9)] transform rotate-45" />
                </div>
              </div>
            </div>

            {/* 3 Steps Grid: Responsive columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
              {/* STEP 1 */}
              <div className="flex flex-col items-center text-center group">
                {/* Step Number Square Box (Compact theme emerald border) */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[8px] border-2 border-emerald-400 bg-emerald-950/60 flex items-center justify-center shadow-[0_0_14px_rgba(52,211,153,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-300">
                  <span className="text-base sm:text-lg font-bold text-white font-mono">
                    1
                  </span>
                </div>

                {/* Step Text Details */}
                <div className="mt-3 space-y-0.5 max-w-xs">
                  <p className="text-slate-300 text-xs sm:text-sm font-normal">
                    Fill out the
                  </p>
                  <p className="text-white text-sm sm:text-base font-bold tracking-tight">
                    <span className="italic font-bold text-[#f9d868]">
                      Application form
                    </span>
                  </p>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="flex flex-col items-center text-center group">
                {/* Step Number Square Box */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[8px] border-2 border-cyan-400 bg-cyan-950/60 flex items-center justify-center shadow-[0_0_14px_rgba(56,189,248,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-300">
                  <span className="text-base sm:text-lg font-bold text-white font-mono">
                    2
                  </span>
                </div>

                {/* Step Text Details */}
                <div className="mt-3 space-y-0.5 max-w-xs">
                  <p className="text-slate-300 text-xs sm:text-sm font-normal">
                    Attempt the{" "}
                    <span className="italic font-bold text-cyan-300">
                      LSI Evaluation,
                    </span>
                  </p>
                  <p className="text-white text-xs sm:text-sm font-medium">
                    a 30 minutes Aptitude test
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="flex flex-col items-center text-center group">
                {/* Step Number Square Box */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[8px] border-2 border-purple-400 bg-purple-950/60 flex items-center justify-center shadow-[0_0_14px_rgba(168,85,247,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-purple-300">
                  <span className="text-base sm:text-lg font-bold text-white font-mono">
                    3
                  </span>
                </div>

                {/* Step Text Details */}
                <div className="mt-3 space-y-0.5 max-w-xs">
                  <p className="text-slate-300 text-xs sm:text-sm font-normal">
                    Interview with an
                  </p>
                  <p className="text-white text-sm sm:text-base font-bold tracking-tight">
                    <span className="italic font-bold text-purple-300">
                      Industry Leader
                    </span>{" "}
                    to assess fit
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer Strip */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>
                <strong className="text-white">Cohort AY 2026–27:</strong> Early
                admissions round open. Limited 60 seats per campus.
              </span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <Link
                href="/admissions"
                className="text-slate-300 hover:text-[#f9d868] text-xs font-medium transition-colors underline underline-offset-4"
              >
                View Detailed Admission Guidelines →
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION PART 2: FEES STRUCTURE, SCHOLARSHIPS & ELIGIBILITY BENTO          */}
        {/* ========================================================================= */}
        <div className="w-full">
          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-8">
            <button
              onClick={() => setActiveFeeTab("scholarships")}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeFeeTab === "scholarships"
                  ? "bg-[#314b83] text-white shadow-md shadow-[#314b83]/20"
                  : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Scholarships &amp; Financial Aid</span>
            </button>

            <button
              onClick={() => setActiveFeeTab("structure")}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeFeeTab === "structure"
                  ? "bg-[#314b83] text-white shadow-md shadow-[#314b83]/20"
                  : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Fee Structure</span>
            </button>
          </div>

          {/* TAB 1: SCHOLARSHIPS & FINANCIAL AID (Single Image Banner) */}
          {activeFeeTab === "scholarships" && (
            <div className="w-full relative h-[280px] sm:h-[340px] lg:h-[380px] rounded-[22px] overflow-hidden shadow-2xl border border-zinc-200/80 animate-fadeIn">
              {/* Background Image: Students collaborating with laptop on campus */}
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
                alt="LSI Scholarships and Financial Aid"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
                priority
              />

              {/* Bottom Dark Gradient Overlay for Maximum Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10 z-[1]" />

              {/* Banner Content: Heading on left, Button on right */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5">
                <div className="max-w-xl text-white">
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-heading font-normal leading-snug tracking-tight">
                    Apply for{" "}
                    <span className="italic font-bold text-[#f9d868]">
                      LSI Scholarships
                    </span>
                  </h4>

                  <p className="text-[#f9d868] font-semibold text-sm sm:text-base mt-2">
                    Early Bird Admission Offers &bull; Based on Merit Scholarships
                  </p>

                  <p className="text-slate-200 font-light mt-1 leading-relaxed" style={{ fontSize: "15px" }}>
                    to ensure smooth financial support throughout your education.
                  </p>
                </div>

                <Link
                  href="/apply"
                  className="group flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0"
                >
                  <span className="bg-[#f9d868] group-hover:bg-[#e6c452] text-[#0b1428] font-medium text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-[10px] transition-colors shadow-lg inline-flex items-center justify-center">
                    Apply Now
                  </span>

                  <span
                    aria-hidden="true"
                    className="w-10 h-10 sm:w-11 sm:h-11 bg-white text-[#0b1428] rounded-[10px] flex items-center justify-center shadow-lg group-hover:bg-zinc-100 transition-colors shrink-0"
                  >
                    <span className="icon-3d-container">
                      <span className="icon-3d-front">
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#0b1428]" />
                      </span>
                      <span className="icon-3d-back">
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#0b1428]" />
                      </span>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          )}

          {/* TAB 2: FEE STRUCTURE */}
          {activeFeeTab === "structure" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn">
              {/* Fee Schedule Box (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-[22px] border border-zinc-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
                    <div>
                      <span className="text-xs font-bold text-[#314b83] uppercase tracking-wider font-mono">
                        Affiliated to University of Mumbai
                      </span>
                      <h5 className="text-xl sm:text-2xl font-bold text-zinc-900 font-heading mt-1">
                        B.Sc. (Hons) in Integrative Nutrition &amp; Dietetics
                      </h5>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 shrink-0">
                      NEP 2020 Aligned
                    </span>
                  </div>

                  {/* Pricing Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Annual Fee Card */}
                    <div className="p-5 rounded-[16px] bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Annual Tuition Fee
                      </span>
                      <div className="my-3">
                        <span
                          className="fee-amount text-zinc-900 font-heading block"
                          style={{ fontSize: "22px", fontWeight: 600, lineHeight: "28px" }}
                        >
                          ₹2,20,000
                        </span>
                        <span className="text-xs text-zinc-500 block mt-0.5">
                          Per Academic Year (2 Semesters)
                        </span>
                      </div>
                      <span className="text-zinc-500 font-medium" style={{ fontSize: "15px" }}>
                        Payable in flexible semester installments
                      </span>
                    </div>

                    {/* Semester Option Card */}
                    <div className="p-5 rounded-[16px] bg-gradient-to-br from-[#314b83]/5 to-[#314b83]/10 border border-[#314b83]/20 flex flex-col justify-between">
                      <span className="text-xs font-semibold text-[#314b83] uppercase tracking-wider">
                        Semester Installment
                      </span>
                      <div className="my-3">
                        <span
                          className="fee-amount text-[#314b83] font-heading block"
                          style={{ fontSize: "22px", fontWeight: 600, lineHeight: "28px" }}
                        >
                          ₹1,10,000
                        </span>
                        <span className="text-xs text-[#314b83]/80 block mt-0.5">
                          Per Semester (Total 8 Semesters)
                        </span>
                      </div>
                      <span className="text-[#314b83] font-semibold" style={{ fontSize: "15px" }}>
                        0% EMI plans start at ₹9,500/month
                      </span>
                    </div>
                  </div>

                  {/* What is Included Checklist */}
                  <div className="space-y-3 pt-2">
                    <h5 className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono">
                      Tuition Fee Inclusions:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-zinc-600">
                      <div className="flex items-center gap-2" style={{ fontSize: "15px" }}>
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>University examination &amp; enrollment fees</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ fontSize: "15px" }}>
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Biochemistry &amp; Clinical Kitchen lab charges</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ fontSize: "15px" }}>
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Clinical hospital rotations &amp; internship tie-ups</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ fontSize: "15px" }}>
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Luke Coutinho Masterclasses &amp; industry briefs</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ fontSize: "15px" }}>
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Complete uniform, clinical apron &amp; toolkits</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ fontSize: "15px" }}>
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Digital LMS access, research journals &amp; e-books</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Registration note */}
                <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-zinc-500 gap-2" style={{ fontSize: "15px" }}>
                  <span>* One-time admission registration &amp; kit fee: ₹15,000</span>
                  <span className="text-zinc-600 font-medium">Refund policy adheres to UGC guidelines</span>
                </div>
              </div>

              {/* Financing & Payment Options (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0c1830] to-[#192b4f] text-white rounded-[22px] p-6 sm:p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f9d868]/15 text-[#f9d868] text-xs font-semibold mb-4">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Flexible Financing
                  </div>

                  <h5 className="text-2xl font-bold font-heading text-white">
                    0% Interest EMI &amp; Education Loan Assistance
                  </h5>

                  <p className="text-slate-300 mt-2 leading-relaxed font-light" style={{ fontSize: "15px", lineHeight: "24px" }}>
                    We partner with premier education financing institutions to ensure monetary considerations never hold back passionate learners.
                  </p>

                  <div className="mt-6 space-y-3.5">
                    <div className="p-4 rounded-[14px] bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-sm">Monthly Installment Plan</span>
                        <span className="text-[#f9d868] text-xs font-mono font-bold">0% Interest</span>
                      </div>
                      <p className="text-slate-300 mt-1 leading-normal" style={{ fontSize: "15px" }}>
                        Split semester fee into 6 or 10 easy monthly installments with zero processing markup.
                      </p>
                    </div>

                    <div className="p-4 rounded-[14px] bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-sm">Financing Partners</span>
                        <span className="text-emerald-400 text-xs font-mono font-bold">Pre-Approved</span>
                      </div>
                      <p className="text-slate-300 mt-1 leading-normal" style={{ fontSize: "15px" }}>
                        Instant paperless verification via GrayQuest, Propelld, HDFC Credila, and SBI Scholar Loans.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="w-full text-center py-3.5 px-4 rounded-[12px] bg-[#f9d868] text-[#0b1428] font-bold text-sm hover:bg-[#ebd056] transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Speak with Fee Counselor</span>
                  </Link>
                  <p className="text-center text-[11px] text-slate-400">
                    Call helpline: +91 800-123-4567 | Mon–Sat 9:30 AM to 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProgramAdmissionsFeesSection;
