"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle2, Send, User, Mail, Phone, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/common/Button";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "B.Sc. (Hons) in Integrative Nutrition & Dietetics",
    city: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-zinc-50 min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-500">
            <li>
              <Link href="/" className="hover:text-zinc-900 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            </li>
            <li>
              <Link href="/admissions" className="hover:text-zinc-900 transition-colors">
                Admissions
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            </li>
            <li className="text-zinc-900 font-semibold" aria-current="page">
              Apply Online
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-zinc-200">
          <div className="max-w-2xl mb-8">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
              AY 2026-27 Enrollment
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
              Begin Your Application
            </h1>
            <p className="text-zinc-600 mt-2 text-sm sm:text-base">
              Fill out this quick form and our academic counseling team will reach out within 24 hours to guide you through admission formalities.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900">Application Submitted Successfully!</h2>
              <p className="text-zinc-600 max-w-md mx-auto text-sm">
                Thank you for applying to Lifeness Science Institute. An admissions advisor has been assigned to your file and will contact you via phone and email.
              </p>
              <div className="pt-4">
                <Button href="/" variant="solid">
                  Return to Home
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#36499E] focus:border-transparent text-zinc-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#36499E] focus:border-transparent text-zinc-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                    Mobile Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#36499E] focus:border-transparent text-zinc-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                    Current City / State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#36499E] focus:border-transparent text-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  Select Program of Interest *
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#36499E] focus:border-transparent text-zinc-900 bg-white"
                >
                  <option value="B.Sc. (Hons) in Integrative Nutrition & Dietetics">
                    B.Sc. (Hons) in Integrative Nutrition & Dietetics (3-4 Years)
                  </option>
                  <option value="M.Sc. in Integrative Nutrition & Dietetics">
                    M.Sc. in Integrative Nutrition & Dietetics (2 Years)
                  </option>
                  <option value="PG Diploma in Holistic Lifestyle & Wellness Coaching">
                    PG Diploma in Holistic Lifestyle & Wellness Coaching (1 Year)
                  </option>
                  <option value="DHIL — Diploma in Health & Integrative Lifestyle">
                    DHIL — Diploma in Health & Integrative Lifestyle (6-12 Months)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  Any Questions or Specific Career Goals? (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your background or questions you'd like our counsellor to answer..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#36499E] focus:border-transparent text-zinc-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#055C02] hover:bg-[#044701] text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-900/10 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
