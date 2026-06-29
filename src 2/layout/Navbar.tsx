"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

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
  onLinkClick?: (href: string) => void; 
}

const defaultLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "For Hosts", href: "/for-hosts" },
  { label: "Winners", href: "/winners-showcase" },
];

function NewsletterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.3922,5.7875c0,-1.1655 -0.45,-2.2831 -1.24,-3.1071c-0.8,-0.824 -1.88,-1.287 -3.01,-1.287h-6.38v16.4771h7.44c0.85,0 1.66,0.348 2.26,0.966c0.6,0.618 0.93,1.456 0.93,2.33M12.3922,5.7875v15.379M12.3922,5.7875c0,-1.1655 0.45,-2.2831 1.25,-3.1071c0.79,-0.824 1.88,-1.287 3,-1.287h6.38v16.4771h-7.44c-0.84,0 -1.66,0.348 -2.25,0.966c-0.6,0.618 -0.94,1.456 -0.94,2.33"
        stroke="currentColor"
        strokeWidth="2.7"
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
  onLinkClick,
}: NavbarProps) {
  
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick =
    onLinkClick ??
    ((href: string) => {
      if (href === "/#about" && window.location.pathname === "/") {
        const el = document.getElementById("about");
        el?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          router.replace("/", { scroll: false });
        }, 600);
      } else {
        router.push(href);
      }
    });

  const leftLinks = links.slice(0, 2);
  const rightLinks = links.slice(2);

  const isNavActive = isScrolled || menuOpen;

  return (
    <header className="fixed top-0 z-50 w-full transition-all duration-300">
      <div
        className={`absolute left-0 top-0 w-full h-full -z-10 transition-all duration-300 ease-out ${
          isNavActive ? "bg-white/70 backdrop-blur-md opacity-100" : "bg-transparent opacity-0"
        } ${isScrolled && !menuOpen ? "shadow-sm" : ""}`}
      />

      <nav className={`relative z-10 w-full px-6 lg:px-12 transition-all duration-300 ease-out ${
        isScrolled ? "py-4" : "py-8"
      }`}>
        <div className="mx-auto max-w-7xl flex justify-between items-center transition-all duration-300 gap-4 lg:gap-10">
          
          <div className={`hidden items-center lg:flex flex-1 justify-end transition-all duration-300 ease-out ${
            isScrolled ? "gap-8" : "gap-12"
          }`}>
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-space-grotesk text-base font-medium text-black hover:opacity-60 transition-transform duration-300 ease-in-out hover:scale-105"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center lg:px-6">
            <Link
              href="/"
              aria-label="Il Foro – go to homepage or scroll to top"
              className="transition-transform hover:opacity-80 active:scale-95 cursor-pointer"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={160}
                height={160}
                priority
                className={`h-auto object-contain transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-80 ${
                  isScrolled ? "w-16 sm:w-20 lg:w-24" : "w-20 sm:w-24 lg:w-28"
                }`}
              />
            </Link>
          </div>

          <div className={`hidden items-center lg:flex flex-1 justify-start transition-all duration-300 ease-out ${
            isScrolled ? "gap-8" : "gap-12"
          }`}>
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-space-grotesk text-base font-medium text-black transition-all hover:opacity-60 duration-300 ease-in-out hover:scale-105"
              >
                {link.label}
              </Link>
            ))}

            <Button
              href={newsletterHref}
              bg="mauve"
              size="md"
              className="px-4 py-2 text-sm gap-2 hover:scale-105"
            >
              <span>{newsletterLabel}</span>
              <NewsletterIcon width={16} height={16} className="text-cream" />
            </Button>
          </div>

          <button
            className="flex flex-col gap-1.5 p-2 lg:hidden absolute right-6 z-50"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`absolute left-0 top-full w-full transition-all duration-300 ease-out lg:hidden bg-white/70 backdrop-blur-md ${
          menuOpen
            ? "max-h-[80vh] opacity-100 translate-y-0 py-6 border-t border-black/10 shadow-md"
            : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start gap-6 pl-8 pr-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                handleNavClick(link.href);
              }}
              className="font-space-grotesk text-xl font-medium text-black duration-200 hover:opacity-60 transition-transform ease-in-out hover:scale-105"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={newsletterHref}
            className="font-space-grotesk mt-2 flex w-fit items-center gap-2 rounded-xl border border-black bg-mauve px-6 py-3 text-xl font-medium text-cream transition-all hover:brightness-90 duration-200 ease-in-out hover:scale-105"
            onClick={() => setMenuOpen(false)}
          >
            <span>{newsletterLabel}</span>
            <NewsletterIcon width={20} height={20} className="text-cream" />
          </Link>
        </div>
      </div>
    </header>
  );
}