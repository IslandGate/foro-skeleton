import React from "react";
import Image from "next/image";

const garamondStyle: React.CSSProperties = {
  fontFamily: "var(--font-eb-garamond, 'EB Garamond', Georgia, serif)",
};

export default function HeroCatalogueSection() {
  return (
    <section
      className="w-full overflow-hidden"
      aria-label="Il Foro competition catalogue"
    >
      {/* Heading */}
      <h2
        className="font-medium text-black text-center text-[clamp(2rem,5.35vw,4.82rem)] leading-[0.94] px-[clamp(24px,3vw,48px)] pt-[clamp(32px,3.47vw,50px)] mb-[clamp(24px,2.5vw,36px)]"
        style={garamondStyle}
      >
        {/* "Il Foro" — italic, brand accent colour */}
        <em className="text-cream italic">
          Il Foro
        </em>
        {
          " has a near endless catalogue of competitions and opportunities for you to seize"
        }
      </h2>

      {/* Competition cards image */}
      <div
        className="relative w-full overflow-hidden flex justify-center"
        aria-hidden="true"
      >
        <Image
          src="/marketing-page-assets/HeroCatalogue-assets/competition-cards.svg"
          alt="A row of competition cards"
          width={2000}
          height={600}
          className="w-full h-auto select-none"
        />
      </div>
    </section>
  );
}