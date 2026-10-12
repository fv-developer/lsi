"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Award,
  Sparkles,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#181f3d] text-white pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#334180]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Top Newsletter & Banner Section */}
        <div className="bg-[#212b54] rounded-2xl p-6 md:p-10 mb-16 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/80 uppercase tracking-widest font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Stay Updated with LSI
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              Subscribe to the LSI Integrative Health Digest
            </h3>
            <p className="text-white/70 text-sm md:text-base">
              Get weekly clinical insights, upcoming conference alerts, and admissions updates directly in your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/25 shrink-0 text-sm"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-zinc-950" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo/LSI-white-logo.png"
                alt="LSI - Leadership & Sustainability Institute"
                width={180}
                height={55}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              India&apos;s premier specialist institute for Integrative Nutrition &amp; Dietetics. 
              Co-founded with Luke Coutinho, offering University of Mumbai affiliated degrees 
              and 100% clinical placement support.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>University of Mumbai Affiliated</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Institute
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about-us" className="text-white/70 hover:text-white transition-colors">
                  About LSI
                </Link>
              </li>
              <li>
                <Link href="/about-us#campus-tour" className="text-white/70 hover:text-white transition-colors">
                  Campus Tour
                </Link>
              </li>
              <li>
                <Link href="/about-us#our-faculty" className="text-white/70 hover:text-white transition-colors">
                  Our Faculty
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-white/70 hover:text-white transition-colors">
                  Admissions 2026
                </Link>
              </li>
              <li>
                <Link href="/student-life" className="text-white/70 hover:text-white transition-colors">
                  Student Life &amp; Placements
                </Link>
              </li>
              <li>
                <Link href="/conferences" className="text-white/70 hover:text-white transition-colors">
                  Conferences &amp; Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Programs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Programmes
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/programs#bsc-nutrition" className="text-white/70 hover:text-white transition-colors">
                  B.Sc. Integrative Nutrition
                </Link>
              </li>
              <li>
                <Link href="/programs#msc-nutrition" className="text-white/70 hover:text-white transition-colors">
                  M.Sc. Integrative Nutrition
                </Link>
              </li>
              <li>
                <Link href="/programs#pg-diploma" className="text-white/70 hover:text-white transition-colors">
                  PG Diploma in Wellness Coaching
                </Link>
              </li>
              <li>
                <Link href="/programs#diploma-health" className="text-white/70 hover:text-white transition-colors">
                  DHIL — Diploma in Health
                </Link>
              </li>
              <li>
                <Link href="/programs" className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors pt-1">
                  <span>View All Programs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>LSI Mumbai Campus, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:admissions@lsi-edu.in" className="hover:text-white transition-colors">
                  admissions@lsi-edu.in
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+918001234567" className="hover:text-white transition-colors">
                  +91 (800) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Leadership &amp; Sustainability Institute (LSI). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/80 transition-colors">
              Terms of Service
            </Link>
            <Link href="/accreditation" className="hover:text-white/80 transition-colors">
              Accreditation &amp; Affiliations
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
