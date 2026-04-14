import React from "react";
import InfiniteCarousel from "./InfiniteCarousell";

const garamondStyle: React.CSSProperties = {
  fontFamily: "var(--font-eb-garamond, 'EB Garamond', Georgia, serif)",
};

export default function HeroUsedByStudents() {
  return (
    <section
      className="relative w-full overflow-hidden min-h-[clamp(400px,44.1vw,700px)]"
      aria-label="Used by students at top universities"
    >
      {/* Hero content */}
      <div
        className="relative z-10 flex flex-col pt-[clamp(130px,14.17vw,204px)] pl-[clamp(40px,6.53vw,94px)] pr-[clamp(24px,5.83vw,84px)] pb-[clamp(60px,10.97vw,158px)] gap-[clamp(5px,0.7vw,10px)]"
      >
        {/* Heading: "Used By Students At" */}
        <h2
          className="font-medium text-black text-[clamp(36px,5.35vw,77px)] leading-[0.94]"
          style={garamondStyle}
        >
          <span>Used By </span>
          <em className="text-[var(--color-cream,#f0ead8)] not-italic md:italic">
            Students
          </em>
          <span> At</span>
        </h2>

        {/* University logos strip */}
        <InfiniteCarousel />
      </div>
    </section>
  );
}