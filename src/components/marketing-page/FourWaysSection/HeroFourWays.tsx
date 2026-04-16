"use client";

import React from "react";
import Image from "next/image";

const ASSETS = {
  competitionCards: "/marketing-page-assets/FourWays-assets/Easy%20to%20read%20competition%20cards.png",
  aggregator: "/marketing-page-assets/FourWays-assets/A%20Competition%20aggregator.png",
  searchFilters: "/marketing-page-assets/FourWays-assets/Easy%20win.png",
  locationMap: "/marketing-page-assets/FourWays-assets/Find%20and%20win%20competitions.png",
} as const;

const cardStyle = "w-full h-auto drop-shadow-md transition-transform duration-500 hover:-translate-y-2 rounded-lg object-contain";

export default function HeroFourWays() {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-16 md:px-8 lg:px-12 bg-[#E4DDCB]"
      aria-labelledby="four-ways-heading"
    >
      {/* Background Painting Overlay */}
      <div 
        className="absolute inset-0 bg-[url('/marketing-page-assets/bg-painting-placeholder.jpg')] bg-cover bg-center opacity-20 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-screen-2xl">
        {/* Section Heading - Matches HeroWelcome scaling */}
        <h2
          id="four-ways-heading"
          className="font-garamond mb-12 text-left text-4xl font-medium leading-[1.1] text-black md:mb-20 md:text-6xl lg:text-7xl"
        >
          Four ways <span className="italic text-mauve">Il Foro</span> makes it
          easier to find
          <br /> 
          <span className="text-mauve italic lg:not-italic">academic competitions</span>
        </h2>

        {/* 2-Column Staggered Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
          
          {/* Left Column */}
          <div className="flex flex-col gap-8 md:gap-16 lg:gap-24">
            <div className="relative w-full">
              <Image
                src={ASSETS.competitionCards}
                alt="Easy to read competition cards"
                width={700}
                height={500}
                className={cardStyle}
                priority
              />
            </div>
            <div className="relative w-full">
              <Image
                src={ASSETS.searchFilters}
                alt="Narrow it down. Win it now."
                width={700}
                height={500}
                className={cardStyle}
              />
            </div>
          </div>

          {/* Right Column (Offset downward slightly on desktop) */}
          <div className="flex flex-col gap-8 md:mt-24 md:gap-16 lg:gap-24">
            <div className="relative w-full">
              <Image
                src={ASSETS.aggregator}
                alt="Personalised competition aggregator"
                width={700}
                height={500}
                className={cardStyle}
              />
            </div>
            <div className="relative w-full">
              <Image
                src={ASSETS.locationMap}
                alt="Find competitions in your backyard"
                width={700}
                height={500}
                className={cardStyle}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}