"use client";

import React from "react";
import Image from "next/image";
import { StatCard } from "../StatCard";
import type { HeroAboutUsProps, StatisticItem } from "./AboutUs.types";

const DEFAULT_STATISTICS: StatisticItem[] = [
  { value: "12000+", label: "Competitions available", hasIcon: false },
  { value: "600+", label: "Active users", hasIcon: false },
  { value: "4.8", label: "Average User rating", hasIcon: true },
];

export default function HeroAboutUs({
  titlePrefix = "About",
  titleEmphasis = "us",
  missionSubtitle = "We want to democratise opportunities",
  missionDescription = "At Il Foro we believe in equal opportunities for all students. That means making sure information about academic competitions is accessible for every student.",
  statistics = DEFAULT_STATISTICS,
}: HeroAboutUsProps) {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:px-12 scroll-mt-[120px]"
      id="about"
    >
      <h2 className="font-garamond mb-6 text-5xl font-medium leading-tight text-black md:mb-10 md:text-6xl lg:text-7xl">
        {titlePrefix} <span className="text-mauve italic">{titleEmphasis}</span>
      </h2>

      {/* Reduced padding (p-4) on mobile to give text more room */}
      <article className="flex flex-col gap-6 overflow-hidden rounded-2xl border border-black bg-cream p-5 md:gap-12 md:p-10 lg:p-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
          <div className="w-36 shrink-0 md:w-56 lg:w-72">
            <Image
              src="/marketing-page-assets/il-foro-logo.png"
              alt="Il Foro Logo"
              width={400}
              height={400}
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2 lg:text-left">
            <h3 className="font-garamond text-4xl font-medium text-black md:text-5xl">
              Mission <span className="italic">Statement</span>
            </h3>

            <h4 className="font-garamond text-xl font-medium text-black md:text-2xl">
              {missionSubtitle}
            </h4>

            <p className="font-space-grotesk max-w-2xl text-base font-medium leading-tight text-black/80 md:text-lg md:leading-relaxed">
              {missionDescription}
            </p>
          </div>
        </div>

        {/* Tightened the divider gap (pt-6) for smaller screens */}
        <section
          className="grid w-full grid-cols-1 gap-4 pt-6 sm:grid-cols-3 md:gap-8 lg:gap-12"
          aria-label="Key statistics"
        >
          {statistics.map((stat) => (
            <StatCard
              key={`${stat.value}-${stat.label}`}
              value={stat.value}
              label={stat.label}
              hasIcon={stat.hasIcon}
            />
          ))}
        </section>
      </article>
    </section>
  );
}
