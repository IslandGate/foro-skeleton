"use client";

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
  
  const buttonClass = "flex items-center justify-center rounded-2xl border border-black px-8 py-5 text-xl font-medium font-space-grotesk transition-all duration-200 hover:brightness-90 hover:shadow-md w-full sm:w-64";

  return (
    <section
      className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center px-6 py-10 text-center"
      aria-label="Il Foro hero"
    >
      <div className="flex w-full max-w-4xl flex-col items-center gap-10">
        {/* Title */}
        <h1 className="w-full text-7xl lg:text-8xl font-medium leading-[1.1] font-garamond">
          <span className="block text-black">{titleFirstLine}</span>
          <span className="block italic text-brand-accent">
            {titleSecondLine}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg md:text-xl font-medium text-black/80 font-space-grotesk">
          {subtitle}
        </p>

        {/* CTA Buttons - flex-col ensures they stack and stretch on mobile */}
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={signUpHref}
            className={`${buttonClass} bg-olive text-cream gap-3 group transition-transform duration-300 ease-in-out hover:scale-102`}
          >
            <span>Sign Up</span>
            <Image
              src="/marketing-page-assets/HeroWelcome-assets/arrow-up-right.svg"
              alt=""
              width={20}
              height={20}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href={logInHref}
            className={`${buttonClass} bg-mauve text-cream transition-transform duration-300 ease-in-out hover:scale-102`}
          >
            Log In
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 pt-4">
          <SocialIcon
            href={linkedInHref}
            src="/marketing-page-assets/HeroWelcome-assets/linkedin.svg"
            alt="LinkedIn"
          />
          <SocialIcon
            href={instagramHref}
            src="/marketing-page-assets/HeroWelcome-assets/instagram.svg"
            alt="Instagram"
          />
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ href, src, alt }: { href: string; src: string; alt: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-all duration-200 hover:scale-110 hover:opacity-70"
    >
      <Image src={src} alt={alt} width={36} height={36} />
    </Link>
  );
}