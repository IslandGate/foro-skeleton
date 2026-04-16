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
  missionDescription = "At Il Foro we believe in equal opportunities for all students. That means making sure information about academic competitions is accessible for every student to challenge themselves. Gatekeeping is a thing of the past.",
  statistics = DEFAULT_STATISTICS,
}: HeroAboutUsProps) {
  return (

    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
      <h2 className="font-garamond mb-10 text-5xl font-medium leading-tight text-black md:text-6xl lg:text-7xl">
        {titlePrefix}{" "}
        <span className="text-cream italic">{titleEmphasis}</span>
      </h2>

      {/* about card*/}
      <article className="flex flex-col items-center gap-10 overflow-hidden rounded-2xl border border-black bg-cream p-8 md:gap-16 lg:p-14">
        
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="w-48 shrink-0 md:w-64 lg:w-80">
            <Image
              src="/marketing-page-assets/il-foro-logo.png"
              alt="Il Foro Logo"
              width={400}
              height={400}
              className="h-auto w-full object-contain"
              priority
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 text-center lg:text-left">
            <h3 className="font-garamond text-4xl font-medium text-black md:text-5xl">
              Mission <span className="italic">Statement</span>
            </h3>

            <h4 className="font-garamond text-2xl font-medium text-black md:text-3xl">
              {missionSubtitle}
            </h4>

            <p className="font-space-grotesk max-w-2xl text-base font-medium leading-relaxed text-black/80 md:text-lg">
              {missionDescription}
            </p>
          </div>
        </div>

        {/* stats */}
        <section 
          className="flex w-full flex-col items-center justify-center gap-8 pt-10 lg:flex-row lg:gap-20"
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