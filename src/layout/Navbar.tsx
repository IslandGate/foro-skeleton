// Proper links need to be filled 

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  links?: NavLink[];
  logoSrc?: string;
  logoAlt?: string;
  newsletterHref?: string;
  newsletterLabel?: string;
}

// Hrefs need to match! 
const defaultLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "For Hosts", href: "/for-hosts" },
  { label: "Winners", href: "/winners-showcase" },
];

const groteskStyle: React.CSSProperties = {
  fontFamily:
    "var(--font-space-grotesk, 'Space Grotesk', system-ui, sans-serif)",
};

function NewsletterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 23.9719 22.4841"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.3922,5.7875c0,-1.1655 -0.45,-2.2831 -1.24,-3.1071c-0.8,-0.824 -1.88,-1.287 -3.01,-1.287h-6.38v16.4771h7.44c0.85,0 1.66,0.348 2.26,0.966c0.6,0.618 0.93,1.456 0.93,2.33M12.3922,5.7875v15.379M12.3922,5.7875c0,-1.1655 0.45,-2.2831 1.25,-3.1071c0.79,-0.824 1.88,-1.287 3,-1.287h6.38v16.4771h-7.44c-0.84,0 -1.66,0.348 -2.25,0.966c-0.6,0.618 -0.94,1.456 -0.94,2.33"
        stroke="#F0EAD8"
        strokeWidth="2.71818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar({
  links = defaultLinks,
  logoSrc = "/marketing-page-assets/il-foro-logo.png",
  logoAlt = "Il Foro",
  newsletterHref = "/newsletter", // Updated to a standard route format
  newsletterLabel = "Newsletter",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const leftLinks = links.slice(0, 2);
  const rightLinks = links.slice(2);

  return (
    <nav className="relative w-full bg-white" aria-label="Main navigation">
      {/* ── Main row ── */}
      <div className="mx-auto flex h-[80px] w-full max-w-[1193px] items-center justify-between px-6 lg:h-[213px] lg:justify-center lg:gap-[100px]">
        {/* Left Links (Desktop) */}
        <div className="hidden items-center gap-[100px] lg:flex">
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={groteskStyle}
              className="text-[27px] font-medium text-black transition-opacity duration-200 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <Link
          href="/"
          aria-label="Il Foro – go to homepage"
          className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80"
        >
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={213}
            height={213}
            priority
            className="h-[60px] w-auto object-contain lg:h-[213px]"
          />
        </Link>

        {/* Right Links + Button (Desktop) */}
        <div className="hidden items-center gap-[100px] lg:flex">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={groteskStyle}
              className="text-[27px] font-medium text-black transition-opacity duration-200 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={newsletterHref}
            style={groteskStyle}
            className="flex items-center gap-[6px] rounded-[16px] border border-black bg-(--color-brand-accent) px-8 py-[16px] text-[22px] font-medium text-(--color-cream) transition-all duration-200 hover:bg-[#6d3d3d] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-cream)"
            aria-label="Subscribe to Il Foro newsletter"
          >
            <span>{newsletterLabel}</span>
            <NewsletterIcon
              width={22}
              height={22}
              style={{
                color: "var(--color-cream)",
                stroke: "var(--color-cream)",
                fill: "none",
              }}
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Mobile hamburger (Stays on the right via justify-between when lg:justify-center is turned off on small screens) */}
        <button
          className="flex flex-col gap-[5px] p-2 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block h-[2px] w-6 origin-center bg-black transition-all duration-300 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-black transition-all duration-300 ${
              menuOpen ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 origin-center bg-black transition-all duration-300 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* ── Mobile dropdown menu ── */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-black/10 bg-white transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-4 px-6 py-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={groteskStyle}
              className="text-[22px] font-medium text-black transition-opacity duration-200 hover:opacity-60"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={newsletterHref}
            style={groteskStyle}
            className="mt-1 flex w-fit items-center gap-[6px] rounded-[16px] border border-black bg-(--color-brand-accent) px-8 py-[14px] text-[22px] font-medium text-(--color-cream) transition-all duration-200 hover:bg-[#6d3d3d]"
            aria-label="Subscribe to Il Foro newsletter"
            onClick={() => setMenuOpen(false)}
          >
            <span>{newsletterLabel}</span>
            <NewsletterIcon
              width={22}
              height={22}
              style={{
                color: "var(--color-cream)",
                stroke: "var(--color-cream)",
                fill: "none",
              }}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

