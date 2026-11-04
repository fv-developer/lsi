"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Award,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#181f3d] text-white pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#334180]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
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
                <Link href="/programs/bsc-nutrition" className="text-white/70 hover:text-white transition-colors">
                  B.Sc. Integrative Nutrition
                </Link>
              </li>
              <li>
                <Link href="/programs/msc-nutrition" className="text-white/70 hover:text-white transition-colors">
                  M.Sc. Integrative Nutrition
                </Link>
              </li>
              <li>
                <Link href="/programs/pg-diploma" className="text-white/70 hover:text-white transition-colors">
                  PG Diploma in Wellness Coaching
                </Link>
              </li>
              <li>
                <Link href="/programs/diploma-health" className="text-white/70 hover:text-white transition-colors">
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
