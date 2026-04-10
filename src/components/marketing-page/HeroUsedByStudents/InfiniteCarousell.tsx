"use client";

import React from "react";
import Image from "next/image";
import { UNIVERSITY_LOGOS } from "@/src/constants/universityLogos";

export default function InfiniteCarousel() {
  return (
    <div className="w-full overflow-hidden flex flex-nowrap py-12">
      {/* First Group */}
      <div
        className="flex min-w-max"
        style={{
          animation: "infinite-scroll 30s linear infinite",
          gap: "10px",
          paddingRight: "10px",
        }}
      >
        {UNIVERSITY_LOGOS.map((logo) => (
          <div
            key={`${logo.id}-1`}
            className="flex-none flex items-center justify-center"
            style={{
              minWidth: "420px",
              height: "400px",
            }}
          >
            <Image
              src={logo.path}
              alt={logo.name}
              width={400}
              height={400}
              quality={95}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "400px",
                maxHeight: "400px",
              }}
            />
          </div>
        ))}
      </div>

      {/* Duplicate Group */}
      <div
        className="flex min-w-max"
        aria-hidden="true"
        style={{
          animation: "infinite-scroll 30s linear infinite",
          gap: "10px",
          paddingRight: "10px",
        }}
      >
        {UNIVERSITY_LOGOS.map((logo) => (
          <div
            key={`${logo.id}-2`}
            className="flex-none flex items-center justify-center"
            style={{
              minWidth: "420px",
              height: "400px",
            }}
          >
            <Image
              src={logo.path}
              alt={logo.name}
              width={400}
              height={400}
              quality={95}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "400px",
                maxHeight: "400px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
