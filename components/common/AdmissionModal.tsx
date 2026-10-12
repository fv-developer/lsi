"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ArrowUpRight } from "lucide-react";

export const AdmissionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or submitted the modal in this session
    const isDismissed = sessionStorage.getItem("lsi_admission_popup_dismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("lsi_admission_popup_dismissed", "true");
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static submission logic - store dismissed state and close modal
    sessionStorage.setItem("lsi_admission_popup_dismissed", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-4xl bg-white rounded-[22px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200/80 z-10 my-auto max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Close Button ('X') */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image Only (No Text, No Badges, No Lists) */}
            <div className="w-full md:w-5/12 relative min-h-[220px] md:min-h-[500px] overflow-hidden bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="LSI Integrative Health & Nutrition"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Right Column: Admission Registration Form */}
            <div className="w-full md:w-7/12 p-6 sm:p-8 bg-white flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="mb-6 pr-8">
                  <h4 className="font-heading text-2xl sm:text-3xl font-bold text-[#0b1428] tracking-tight">
                    Register for Admissions
                  </h4>
                  <p className="text-slate-500 text-[17px] leading-relaxed mt-1.5 font-light">
                    Complete your details to receive our official prospectus & schedule a counselling session.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="modal-first-name" className="block text-xs font-medium text-slate-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="modal-first-name"
                        placeholder="e.g. Ananya"
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36499e] focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-last-name" className="block text-xs font-medium text-slate-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="modal-last-name"
                        placeholder="e.g. Sharma"
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36499e] focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Email ID */}
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-medium text-slate-700 mb-1">
                      Email ID
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      placeholder="e.g. ananya@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36499e] focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="modal-mobile" className="block text-xs font-medium text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="modal-mobile"
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36499e] focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  {/* Select Program Dropdown */}
                  <div>
                    <label htmlFor="modal-program" className="block text-xs font-medium text-slate-700 mb-1">
                      Select Program
                    </label>
                    <div className="relative">
                      <select
                        id="modal-program"
                        defaultValue=""
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36499e] focus:bg-white transition-all text-slate-900 appearance-none cursor-pointer pr-10"
                      >
                        <option value="" disabled>
                          -- Choose a Degree / Diploma --
                        </option>
                        <option value="bsc">B.Sc. Cellular Nutrition & Food Science</option>
                        <option value="msc">M.Sc. Integrative Nutrition & Dietetics</option>
                        <option value="pgd">PG Diploma in Holistic Lifestyle & Wellness Coaching</option>
                        <option value="dhil">DHIL — Diploma in Health & Integrative Lifestyle</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button (White Icon Box Matching Mockup) */}
                  <div className="flex items-center gap-2 group cursor-pointer w-full pt-2">
                    <button
                      type="submit"
                      style={{ fontWeight: 500 }}
                      className="flex-1 bg-[#f9d868] hover:bg-[#e6c452] text-[#0b1428] font-medium text-base px-6 py-3 rounded-[12px] transition-colors shadow-md flex items-center justify-center cursor-pointer"
                    >
                      Submit Application
                    </button>
                    <button
                      type="submit"
                      className="w-12 h-12 bg-white hover:bg-slate-100 text-[#0b1428] border border-slate-200/80 rounded-[12px] flex items-center justify-center shadow-md transition-colors cursor-pointer shrink-0"
                      aria-label="Submit application"
                    >
                      <ArrowUpRight className="w-5 h-5 text-[#0b1428]" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdmissionModal;
