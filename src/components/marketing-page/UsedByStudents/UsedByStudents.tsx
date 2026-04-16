"use client";

import React from "react";
import InfiniteCarousel from "./InfiniteCarousel";

export default function HeroUsedByStudents() {
  return (
    <section
      className="relative w-full overflow-hidden bg-white py-16 md:py-24"
      aria-label="Used by students at top universities"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Heading: Matches the scale of HeroAboutUs and HeroFourWays */}
        <h2 className="font-garamond mb-10 text-4xl font-medium leading-tight text-black md:text-6xl lg:text-7xl">
          <span>Used By </span>
          <span className="text-cream italic">Students</span>
          <span> At</span>
        </h2>

        {/* University logos strip */}
        <div className="w-full">
          <InfiniteCarousel />
        </div>
      </div>
    </section>
  );
}