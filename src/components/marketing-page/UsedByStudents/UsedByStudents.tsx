"use client";

import React from "react";
import InfiniteCarousel from "./InfiniteCarousel";

export default function HeroUsedByStudents() {
  return (
    <section
      className="relative w-full overflow-hidden py-12 md:py-24"
      aria-label="Used by students at top universities"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h2 className="font-garamond mb-4 text-4xl font-medium leading-tight text-black md:mb-10 md:text-6xl lg:text-7xl">
          <span>Used By </span>
          <span className="text-mauve italic">Students</span>
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