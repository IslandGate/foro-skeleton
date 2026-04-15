"use client";

import React from "react";
import Image from "next/image";
import { StatCard } from "../StatCard";
import type { HeroAboutUsProps, StatisticItem } from "./AboutUs.types";

const garamondStyle: React.CSSProperties = {
  fontFamily: "var(--font-eb-garamond, 'EB Garamond', Georgia, serif)",
};

const groteskStyle: React.CSSProperties = {
  fontFamily:
    "var(--font-space-grotesk, 'Space Grotesk', system-ui, sans-serif)",
};

const DEFAULT_STATISTICS: StatisticItem[] = [
  { value: "12000+", label: "Competitions available", hasIcon: false },
  { value: "600+", label: "Active users", hasIcon: false },
  { value: "4.8", label: "Average User rating", hasIcon: true },
];

export default function HeroAboutUs({
  titlePrefix = "About",
  titleEmphasis = "us",
  logoSrc = "/marketing-page-assets/il-foro-logo.png",
  logoAlt = "Il Foro Logo",
  logoWidth = 393,
  logoHeight = 393,
  missionHeadingPrefix = "Mission",
  missionHeadingEmphasis = "Statement",
  missionSubtitle = "We want to democratise opportunities",
  missionDescription = "At Il Foro we believe in equal opportunities for all students That means making sure information about academic competitions are available and accessible for each and every student to challenge themselves and have their interests flourish. With Il Foro, gatekeeping is a thing of the past.",
  statistics = DEFAULT_STATISTICS,
  containerBackgroundColor = "#f0ead8",
  borderColor = "black",
  borderRadius = "10px",
}: HeroAboutUsProps) {
  return (
    <section className="w-full mx-auto px-26 py-12">
      <h2
        className="text-8xl font-medium leading-tight mb-12 text-black"
        style={garamondStyle}
      >
        {titlePrefix}{" "}
        <span className="italic" style={{ color: "var(--color-cream)" }}>
          {titleEmphasis}
        </span>
      </h2>

      <article
        className="w-full flex flex-col gap-12 md:gap-16 rounded-[10px] border border-black p-8 md:p-12 lg:p-16 justify-center items-center overflow-hidden"
        style={{
          backgroundColor: containerBackgroundColor,
          borderColor: borderColor,
          borderRadius: borderRadius,
        }}
      >
        <div className="flex justify-center">
          <section className="flex flex-col lg:flex-row gap-8 md:gap-10 items-start">
            <div className="w-full md:w-96 shrink-0">
              <figure className="m-0">
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className="w-full h-auto object-contain"
                  aria-label={`${logoAlt} branding image`}
                />
              </figure>
            </div>

            <div className="flex flex-col gap-4 md:gap-6 flex-1">
              <h3
                className="text-6xl font-medium leading-tight text-black"
                style={garamondStyle}
              >
                {missionHeadingPrefix}{" "}
                <span className="italic">{missionHeadingEmphasis}</span>
              </h3>

              <h4
                className="text-4xl font-medium leading-tight text-black"
                style={garamondStyle}
              >
                {missionSubtitle}
              </h4>

              <p
                className="text-xl font-medium leading-relaxed text-black max-w-3xl"
                style={groteskStyle}
              >
                {missionDescription}
              </p>
            </div>
          </section>
        </div>

        <section
          className="flex flex-col lg:flex-row gap-12 md:gap-15 items-center justify-center pt-8 md:pt-0 pb-8"
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