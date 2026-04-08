'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";

const garamondStyle: React.CSSProperties = {
  fontFamily: "var(--font-eb-garamond, 'EB Garamond', Georgia, serif)",
};

const groteskStyle: React.CSSProperties = {
  fontFamily:
    "var(--font-space-grotesk, 'Space Grotesk', system-ui, sans-serif)",
};

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Disclaimers", href: "/disclaimers" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-start gap-25 px-[92px] py-10 md:flex-row">
        {/* Left Column */}
        <div className="flex flex-col items-start gap-4">
          <button
            onClick={handleScrollToTop}
            className="cursor-pointer transition-opacity hover:opacity-80"
            aria-label="Scroll to top"
          >
            <Image
              src="/marketing-page-assets/il-foro-logo-no-padding.png"
              alt="Il Foro Logo"
              width={400}
              height={200}
              className="h-[200px] w-auto object-contain object-left"
            />
          </button>

          <p
            className="max-w-[500px] text-xl font-medium leading-relaxed text-black/50"
            style={groteskStyle}
          >
            A centralised solution to finding competitions in fields of your
            interest and like-minded teammates.
          </p>

          <p
            className="max-w-[400px] text-xl font-medium text-black/50"
            style={groteskStyle}
          >
            &copy; {currentYear} ilforo LLC. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/ilforo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/dashboard-assets/HeroWelcome-assets/linkedin.svg"
                alt="LinkedIn"
                width={31}
                height={31}
              />
            </a>
            <a
              href="https://www.instagram.com/ilforo.web/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/dashboard-assets/HeroWelcome-assets/instagram.svg"
                alt="Instagram"
                width={31}
                height={31}
              />
            </a>
            <a
              href="mailto:contact@ilforo.com"
              aria-label="Email"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/dashboard-assets/Footer Assets/mail.svg"
                alt="Email"
                width={37}
                height={37}
              />
            </a>
          </div>
        </div>

        {/* Right Column – Legal */}
        <div className="flex flex-col gap-3 pt-[69px]">
          <h3
            className="text-4xl font-semibold text-black"
            style={garamondStyle}
          >
            Legal
          </h3>

          <ul className="space-y-1">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-1 py-2.5 text-xl font-medium text-black/50 transition-colors hover:text-black"
                  style={groteskStyle}
                >
                  <span className="text-sm">▶</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
