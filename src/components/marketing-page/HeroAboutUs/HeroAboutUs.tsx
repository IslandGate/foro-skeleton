"use client";

import React from "react";
import Image from "next/image";
import { StatCard } from "../StatCard";
import type { HeroAboutUsProps, StatisticItem } from "./HeroAboutUs.types";

// Font style constants
const garamondStyle: React.CSSProperties = {
  fontFamily: "var(--font-eb-garamond, 'EB Garamond', Georgia, serif)",
};

const groteskStyle: React.CSSProperties = {
  fontFamily:
    "var(--font-space-grotesk, 'Space Grotesk', system-ui, sans-serif)",
};

// Default statistics data
const DEFAULT_STATISTICS: StatisticItem[] = [
  {
    value: "12000+",
    label: "Competitions available",
    hasIcon: false,
  },
  {
    value: "600+",
    label: "Active users",
    hasIcon: false,
  },
  {
    value: "4.8",
    label: "Average User rating",
    hasIcon: true,
  },
];

/**
 * HeroAboutUs Component
 *
 * Production-ready About section component with:
 * - Full TypeScript support with configurable props
 * - Semantic HTML (section, article, headings)
 * - Responsive design (mobile, tablet, desktop)
 * - Accessibility features (aria-labels, alt text)
 * - Reusable StatCard sub-component
 * - Exact Figma design fidelity
 *
 * @example
 * <HeroAboutUs
 *   statistics={customStats}
 *   missionDescription="Custom description..."
 * />
 */
export default function HeroAboutUs({
  // Title props
  titlePrefix = "About",
  titleEmphasis = "us",

  // Logo props
  logoSrc = "/marketing-page-assets/il-foro-logo.png",
  logoAlt = "Il Foro Logo",
  logoWidth = 393,
  logoHeight = 393,

  // Mission props
  missionHeadingPrefix = "Mission",
  missionHeadingEmphasis = "Statement",
  missionSubtitle = "We want to democratise opportunities",
  missionDescription = "At Il Foro we believe in equal opportunities for all students That means making sure information about academic competitions are available and accessible for each and every student to challenge themselves and have their interests flourish. With Il Foro, gatekeeping is a thing of the past.",

  // Statistics
  statistics = DEFAULT_STATISTICS,

  // Optional styling
  containerBackgroundColor = "#f0ead8",
  borderColor = "black",
  borderRadius = "10px",
}: HeroAboutUsProps) {
  return (
    <main className="w-full">
      {/* Main content container with max-width constraint */}
      <section className="w-full mx-auto px-26 py-12 ">
        {/* Title with emphasis */}
        <h1
          className="text-[77.09px] md:text-7.5xl font-medium leading-tight mb-12 text-black"
          style={garamondStyle}
        >
          {titlePrefix}{" "}
          <span className="italic" style={{ color: "var(--color-cream)" }}>
            {titleEmphasis}
          </span>
        </h1>

        {/* Main content card */}
        <article
          className="w-full flex flex-col gap-12 md:gap-16 rounded-[10px] border border-black p-8 md:p-12 lg:p-16 justify-center align-center overflow-hidden"
          style={{
            backgroundColor: containerBackgroundColor,
            borderColor: borderColor,
            borderRadius: borderRadius,
          }}
        >
          <div className="flex justify-center">
          {/* Mission Section: Logo + Text Content */}
          <section className="flex flex-col lg:flex-row gap-8 md:gap-[42px] items-start">
            {/* Logo Container */}
            <div className="w-full md:w-[393px] flex-shrink-0">
              <figure className="m-0">
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className="w-full h-auto object-contain"
                  priority
                  aria-label={`${logoAlt} branding image`}
                />
              </figure>
            </div>

            {/* Mission Content */}
            <div className="flex flex-col gap-4 md:gap-6 flex-1">
              {/* Mission Heading */}
              <h2
                className="text-[64px] font-medium leading-tight text-black"
                style={garamondStyle}
              >
                {missionHeadingPrefix}{" "}
                <span className="italic">{missionHeadingEmphasis}</span>
              </h2>

              {/* Mission Subtitle */}
              <h3
                className="text-[36px] font-medium leading-tight text-black"
                style={garamondStyle}
              >
                {missionSubtitle}
              </h3>

              {/* Mission Description */}
              <p
                className="text-[20px] font-medium leading-relaxed text-black max-w-[786px]"
                style={groteskStyle}
              >
                {missionDescription}
              </p>
            </div>
          </section>
          </div>
          {/* Statistics Section */}
          <section
            className="flex flex-col lg:flex-row gap-12 md:gap-[60px] items-center justify-center pt-8 md:pt-0 pb-8"
            aria-label="Key statistics"
          >
            {statistics.map((stat, index) => (
              <StatCard
                key={`stat-${index}`}
                value={stat.value}
                label={stat.label}
                hasIcon={stat.hasIcon}
              />
            ))}
          </section>
          
        </article>
      </section>
    </main>
  );
}
