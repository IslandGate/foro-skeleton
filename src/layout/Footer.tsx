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
    <footer className="w-full bg-cream">
      <div className="mx-auto flex max-w-screen-2xl flex-col justify-start gap-24 px-8 py-10 md:flex-row">
        {/* Left Column */}
        <div className="flex flex-col items-start gap-4">
          <Link
            href="#"
            aria-label="Scroll to top"
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src="/marketing-page-assets/il-foro-logo.png"
              alt="Il Foro Logo"
              width={400}
              height={200}
              className="h-auto w-auto object-contain object-left p-8"
            />
          </Link>

          <p
            className="font-space-grotesk max-w-lg text-xl font-medium leading-relaxed text-black/50"
          >
            A centralised solution to finding competitions in fields of your
            interest and like-minded teammates.
          </p>

          <p
            className="font-space-grotesk max-w-md text-xl font-medium text-black/50"
          >
            &copy; {currentYear} ilforo LLC. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com/company/ilforo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/marketing-page-assets/HeroWelcome-assets/linkedin.svg"
                alt="LinkedIn"
                width={32}
                height={32}
              />
            </Link>

            <Link
              href="https://www.instagram.com/ilforo.web/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/marketing-page-assets/HeroWelcome-assets/instagram.svg"
                alt="Instagram"
                width={32}
                height={32}
              />
            </Link>

            <Link
              href="mailto:contact@ilforo.com"
              aria-label="Email"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/marketing-page-assets/Footer Assets/mail.svg"
                alt="Email"
                width={32}
                height={32}
              />
            </Link>
          </div>
        </div>

        {/* Right Column – Legal */}
        <div className="flex flex-col gap-3 mt-16">
          <h3
            className="font-garamond text-4xl font-semibold text-black"
          >
            Legal
          </h3>

          <ul className="space-y-1">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-space-grotesk flex items-center gap-1 py-2.5 text-xl font-medium text-black/50 transition-colors hover:text-black"
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
