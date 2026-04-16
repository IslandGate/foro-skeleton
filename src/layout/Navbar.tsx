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

const defaultLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "For Hosts", href: "/for-hosts" },
  { label: "Winners", href: "/winners-showcase" },
];

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
        stroke="currentColor"
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
  newsletterHref = "/newsletter",
  newsletterLabel = "Newsletter",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const leftLinks = links.slice(0, 2);
  const rightLinks = links.slice(2);

  return (
    <nav className="w-full bg-white px-6 py-4 lg:px-12" aria-label="Main navigation">
      {/* Container to keep navbar content centered and constrained */}
      <div className="mx-auto max-w-7xl flex justify-between items-center relative gap-10">
        
        {/* Left Links (Desktop) */}
        <div className="hidden items-center gap-8 lg:flex flex-1 justify-end">
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-space-grotesk text-base font-medium text-black transition-opacity duration-200 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <div className="flex shrink-0 items-center px-8 lg:px-12">
          <Link
            href="/"
            aria-label="Il Foro – go to homepage"
            className="transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={160}
              height={160}
              priority
              className="h-auto w-20 sm:w-24 lg:w-32 object-contain"
            />
          </Link>
        </div>

        {/* Right Links + Button (Desktop) */}
        <div className="hidden items-center gap-8 lg:flex flex-1 justify-start">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-space-grotesk text-base font-medium text-black transition-opacity duration-200 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={newsletterHref}
            className="font-space-grotesk flex items-center gap-2 rounded-xl border border-black bg-mauve px-5 py-2 text-base font-medium text-cream transition-all duration-200 hover:bg-[#6d3d3d] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            aria-label="Subscribe to Il Foro newsletter"
          >
            <span>{newsletterLabel}</span>
            <NewsletterIcon
              width={18}
              height={18}
              className="text-cream"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1 p-2 lg:hidden absolute right-0"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block h-[2px] w-6 origin-center bg-black transition-all duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-6 bg-black transition-all duration-300 ${menuOpen ? "scale-x-0 opacity-0" : ""}`} />
          <span className={`block h-[2px] w-6 origin-center bg-black transition-all duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* mobile dropdown menu after hamburger*/}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col items-start gap-4 py-8 pl-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-space-grotesk text-xl font-medium text-black"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={newsletterHref}
            className="font-space-grotesk mt-2 flex w-fit items-center gap-2 rounded-xl border border-black bg-mauve px-6 py-2.5 text-xl font-medium text-cream transition-all duration-200 hover:bg-[#6d3d3d]"
            onClick={() => setMenuOpen(false)}
          >
            <span>{newsletterLabel}</span>
            <NewsletterIcon width={20} height={20} className="text-cream" />
          </Link>
        </div>
      </div>
    </nav>
  );
}