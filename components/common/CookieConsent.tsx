"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice about cookie consent
    const consentChoice = localStorage.getItem("lsi_cookie_consent");
    if (!consentChoice) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("lsi_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("lsi_cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -30, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] pointer-events-auto"
        >
          {/* Yellow Card Box */}
          <div className="bg-[#f9d868] text-[#0b1428] rounded-[20px] p-5 sm:p-6 border border-[#0b1428]/10 shadow-2xl relative overflow-hidden flex flex-col gap-4">
            {/* Top Row: Icon, Title & Close X */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#0b1428] text-[#f9d868] shrink-0">
                  <Cookie className="w-4 h-4" />
                </div>
                <h5 className="font-heading font-bold text-base text-[#0b1428] tracking-tight">
                  Cookie Settings
                </h5>
              </div>
              <button
                type="button"
                onClick={handleDecline}
                className="w-7 h-7 rounded-full bg-[#0b1428]/10 hover:bg-[#0b1428]/20 text-[#0b1428] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close cookie popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cookie Description */}
            <p className="text-[16px] text-[#0b1428]/95 font-light leading-relaxed" style={{ fontSize: "16px", fontWeight: 300 }}>
              We use cookies to improve your browsing experience, analyse website traffic, and enhance our services. By continuing to use our website, you agree to our use of cookies.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#0b1428] hover:bg-[#162444] text-white rounded-xl shadow-md transition-colors cursor-pointer text-center"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="px-4 py-2.5 text-xs font-medium text-[#0b1428] border border-[#0b1428]/30 hover:border-[#0b1428] hover:bg-[#0b1428]/10 rounded-xl transition-colors cursor-pointer"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
