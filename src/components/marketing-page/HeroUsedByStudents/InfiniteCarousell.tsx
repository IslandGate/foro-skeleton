"use client";

import React from "react";
import Image from "next/image";
import { UNIVERSITY_LOGOS } from "@/src/constants/universityLogos";

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
    <div className="w-full overflow-hidden flex flex-nowrap py-8">
      <div
        className="flex min-w-max gap-6"
        style={{ animation: "infinite-scroll 30s linear infinite" }}
      >
        {logos}
      </div>
      <div
        className="flex min-w-max gap-6"
        aria-hidden="true"
        style={{ animation: "infinite-scroll 30s linear infinite" }}
      >
        {logos}
      </div>
    </div>
  );
}