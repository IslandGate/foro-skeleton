'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Disclaimers", href: "/disclaimers" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-cream border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16 flex flex-col justify-start gap-12 md:flex-row">
        {/* Left Column: Branding & Social */}
        <div className="flex flex-col items-start gap-6 max-w-md">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="transition-opacity hover:opacity-80 active:scale-95 appearance-none bg-transparent border-none cursor-pointer p-0"
          >
            <Image
              src="/marketing-page-assets/il-foro-logo.png"
              alt="Il Foro Logo"
              width={120}
              height={60}
              className="h-auto w-32 object-contain transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-80"
            />
          </button>

          <p className="font-space-grotesk text-base font-medium leading-relaxed text-black/60">
            A centralised solution to finding competitions in fields of your
            interest and like-minded teammates.
          </p>

          <div className="flex items-center gap-5">
            <SocialIcon
              href="https://www.linkedin.com/company/ilforo"
              src="/marketing-page-assets/HeroWelcome-assets/linkedin.svg"
              alt="LinkedIn"
            />
            <SocialIcon
              href="https://www.instagram.com/ilforo.web/"
              src="/marketing-page-assets/HeroWelcome-assets/instagram.svg"
              alt="Instagram"
            />
            <SocialIcon
              href="mailto:contactilforo@gmail.com"
              src="/marketing-page-assets/Footer Assets/mail.svg"
              alt="Email"
            />
          </div>

          <p className="font-space-grotesk text-sm font-medium text-black/40">
            &copy; {currentYear} ilforo LLC. All rights reserved.
          </p>
        </div>

        {/* Right Column: Legal */}
        <div className="flex flex-col gap-4 min-w-38">
          <h3 className="font-garamond text-2xl font-semibold text-black">
            Legal
          </h3>

          <ul className="flex flex-col gap-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-space-grotesk flex items-center gap-2 text-base font-medium text-black/60 transition-colors hover:text-black"
                >
                  <span className="text-[10px] opacity-50">▶</span>
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

function SocialIcon({ href, src, alt }: { href: string; src: string; alt: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-all hover:scale-110 hover:opacity-70"
    >
      <Image src={src} alt={alt} width={24} height={24} className="h-6 w-6" />
    </Link>
  );
}