"use client";

import React from "react";
import Image from "next/image";
import { UNIVERSITY_LOGOS } from "@/constants/UniversityLogos";

export default function InfiniteCarousel() {
  // Logic to render the set of logos
  const renderLogos = () => (
    <div className="flex shrink-0 items-center justify-around gap-6 px-3">
      {UNIVERSITY_LOGOS.map((logo) => (
        <div
          key={logo.id}
          className="flex-none flex items-center justify-center w-[18vw] sm:w-[14vw] md:w-[10vw] aspect-square"
        >
          <Image
            src={logo.path}
            alt={logo.name}
            width={128}
            height={128}
            className="object-contain w-full h-full"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden py-8 flex">
      {/* Using w-max and the same animation on the container.
          We render the set twice for a seamless loop.
      */}
      <div className="flex w-max animate-infinite-scroll">
        {renderLogos()}
        {renderLogos()}
      </div>
    </div>
  );
}