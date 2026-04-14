import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface HeroWelcomeProps {
  titleFirstLine?: string;
  titleSecondLine?: string;
  subtitle?: string;
  signUpHref?: string;
  logInHref?: string;
  linkedInHref?: string;
  instagramHref?: string;
}

export default function HeroWelcome({
  titleFirstLine = "Welcome to",
  titleSecondLine = "Il Foro",
  subtitle = "A centralised solution to finding competitions in fields of your interest and like-minded teammates.",
  signUpHref = "/auth/signup-page",
  logInHref = "/auth/login-page",
  linkedInHref = "https://www.linkedin.com/company/il-foro1/",
  instagramHref = "https://www.instagram.com/ilforo.web/",
}: HeroWelcomeProps) {
  return (
    <section
      className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16 text-center"
      aria-label="Il Foro hero"
    >
      <div className="flex w-full max-w-[965px] flex-col items-center gap-14">
        {/* Title — font-weight 500 per Figma spec */}
        <h1 className="w-full text-[clamp(2.5rem,12vw,7.25rem)] font-medium leading-[0.94] font-garamond">
          <span className="block text-black">{titleFirstLine}</span>
          <span className="block italic text-brand-accent">
            {titleSecondLine}
          </span>
        </h1>

        {/* Subtitle — 32.62px at design width, scales down on mobile */}
        <p className="text-xl sm:text-2xl font-medium leading-[1.3] text-black font-space-grotesk">
          {subtitle}
        </p>

        {/* CTA Buttons — each 310.78px wide, gap 37.15px */}
        <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-9">
          {/* Sign Up — bg #4B4B30, border 1px solid #000, border-radius 22.65px, py 23px */}
          <Link
            href={signUpHref}
            className="group flex items-center justify-center gap-[9px] rounded-3xl border border-black bg-olive py-[23px] px-9 text-xl font-medium text-cream font-space-grotesk transition-all duration-200 hover:brightness-80 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 sm:min-w-[310px] w-full sm:w-auto
"
            aria-label="Sign up for Il Foro"
          >
            <span>Sign Up</span>
            <Image
              src="/marketing-page-assets/HeroWelcome-assets/arrow-up-right.svg"
              alt=""
              width={22}
              height={22}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          {/* Log In — bg #834A4A, border 1px solid #000, border-radius 23.56px, py 23px */}
          <Link
            href={logInHref}
            className="flex items-center justify-center rounded-[23px] border border-black bg-mauve py-[23px] px-9 text-xl font-medium text-cream font-space-grotesk transition-all duration-200 hover:brightness-80 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 sm:min-w-[310px] w-full sm:w-auto
"
            aria-label="Log in to Il Foro"
          >
            Log In
          </Link>
        </div>

        {/* Social Links — gap 22.65px */}
        <div
          className="flex items-center gap-6"
          role="list"
          aria-label="Social media links"
        >
          <Link
            href={linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Il Foro on LinkedIn"
            role="listitem"
            className="transition-all duration-200 hover:scale-110 hover:opacity-70"
          >
            <Image
              src="/marketing-page-assets/HeroWelcome-assets/linkedin.svg"
              alt="LinkedIn"
              width={40}
              height={38}
            />
          </Link>

          <Link
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Il Foro on Instagram"
            role="listitem"
            className="transition-all duration-200 hover:scale-110 hover:opacity-70"
          >
            <Image
              src="/marketing-page-assets/HeroWelcome-assets/instagram.svg"
              alt="Instagram"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
