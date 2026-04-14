"use client";

import React from "react";
import Image from "next/image";
import { StatCard } from "../StatCard";
import type { HeroAboutUsProps } from "./HeroAboutUs.types";

const DEFAULT_STATS = [
  { value: "12000+", label: "Competitions available", hasIcon: false },
  { value: "600+", label: "Active users", hasIcon: false },
  { value: "4.8", label: "Average User rating", hasIcon: true },
];

export default function HeroAboutUs({
  titlePrefix = "About",
  titleEmphasis = "us",
  missionSubtitle = "We want to democratise opportunities",
  missionDescription = "At Il Foro we believe in equal opportunities for all students That means making sure information about academic competitions are available and accessible for each and every student to challenge themselves and have their interests flourish. With Il Foro, gatekeeping is a thing of the past.",
  statistics = DEFAULT_STATS,
}: HeroAboutUsProps) {
  return (
    <section className="mx-auto w-full px-6 py-12 md:px-26">
      <h2 className="mb-12 font-garamond text-8xl font-medium leading-tight text-black">
        {titlePrefix} <span className="italic text-cream">{titleEmphasis}</span>
      </h2>

      <article className="flex flex-col items-center justify-center gap-12 overflow-hidden rounded-lg border border-black bg-cream p-8 md:gap-16 md:p-12 lg:p-16">
        <div className="flex flex-col items-start gap-8 lg:flex-row md:gap-10">
          {/* Logo Section */}
          <div className="w-full shrink-0 md:w-96">
            <Image
              src="/marketing-page-assets/Il-Foro-Logo-No-Padding.png"
              alt="Il Foro Logo"
              width={393}
              height={393}
              className="h-auto w-full object-contain"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-1 flex-col gap-4 md:gap-6">
            <h3 className="font-garamond text-6xl font-medium leading-tight text-black">
              Mission <span className="italic">Statement</span>
            </h3>

            <h4 className="font-garamond text-4xl font-medium leading-tight text-black">
              {missionSubtitle}
            </h4>

            <p className="max-w-3xl font-space-grotesk text-xl font-medium leading-relaxed text-black">
              {missionDescription}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col items-center justify-center gap-12 pt-8 pb-8 md:pt-0 lg:flex-row md:gap-15">
          {statistics.map((stat) => (
            <StatCard key={`${stat.value}-${stat.label}`} {...stat} />
          ))}
        </div>
      </article>
    </section>
  );
}