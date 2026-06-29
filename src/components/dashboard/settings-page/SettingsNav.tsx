"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "profile-picture", label: "Profile Picture" },
  { id: "profile-customisation", label: "Profile Customisation" },
  { id: "academic-information", label: "Academic Information" },
  { id: "language-and-region", label: "Language & Region" },
  { id: "account-settings", label: "Account Settings" },
];

export default function SettingsNav() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
  
  // Flag and timeout refs to lock out the observer during manual clicks
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const headingElements = NAV_ITEMS.map((item) => document.getElementById(item.id));
    
    const callback = (entries: IntersectionObserverEntry[]) => {
      // if user clicked a nav item, ignore scroll-by intersections
      if (isProgrammaticScroll.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    headingElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      isProgrammaticScroll.current = true;
      setActiveId(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // reset flag after 800ms of scroll?
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 800);
    }
  }

  return (
    <nav className="sticky top-8 w-56 shrink-0 self-start select-none" aria-label="Settings sections">
      <p className="mb-4 font-space-grotesk text-xs font-bold uppercase tracking-[2px] text-gray-400">
        On this page
      </p>
      
      <ul className="flex flex-col gap-1 relative">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          
          return (
            <li key={item.id} className="relative">
              <button
                onClick={() => scrollTo(item.id)}
                className={`w-full rounded-lg px-4 py-2.5 text-left font-space-grotesk text-sm font-medium transition-colors relative z-10 focus:outline-none ${
                  isActive 
                    ? "text-gray-900 font-semibold" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>

              {/* sliding bg thing */}
              {isActive && (
                <motion.div
                  layoutId="activeSettingsPill"
                  className="absolute inset-0 rounded-lg bg-black/6"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}