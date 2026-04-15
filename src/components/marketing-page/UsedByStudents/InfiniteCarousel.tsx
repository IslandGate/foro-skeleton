"use client";

import React from "react";
import Image from "next/image";
import { UNIVERSITY_LOGOS } from "@/src/constants/UniversityLogos";

const logos = UNIVERSITY_LOGOS.map((logo) => (
  <div
    key={logo.id}
    className="flex-none flex items-center justify-center w-32 aspect-square"
  >
    <Image
      src={logo.path}
      alt={logo.name}
      width={128}
      height={128}
      className="object-contain w-full h-full"
    />
  </div>
));

export default function InfiniteCarousel() {
  return (
    <div className="w-full overflow-hidden py-8 flex">
      <div
        className="flex gap-6 animate-infinite-scroll"
      >
        {logos}
        
      </div>
      <div
        className="flex gap-6 -left-full ml-6 animate-infinite-scroll"
      >
      {logos}
      </div>
    </div>
  );
}