import React from "react";
import InfiniteCarousel from "./InfiniteCarousell";

const garamondStyle: React.CSSProperties = {
  fontFamily: "var(--font-eb-garamond, 'EB Garamond', Georgia, serif)",
};

export default function HerousedByStudents() {
  return (
    <main>
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "clamp(400px, 44.1vw, 700px)" }}
        aria-label="Used by students at top universities"
      >
        {/* Hero content */}
        <div
          className="relative z-10 flex flex-col"
          style={{
            paddingTop: "clamp(130px, 14.17vw, 204px)",
            paddingLeft: "clamp(40px, 6.53vw, 94px)",
            paddingRight: "clamp(24px, 5.83vw, 84px)",
            paddingBottom: "clamp(60px, 10.97vw, 158px)",
            gap: "clamp(10px, 1.39vw, 20px)",
          }}
        >
          {/* Heading: "Used By Students At" */}
          <h1
            style={{
              ...garamondStyle,
              fontSize: "clamp(36px, 5.35vw, 77px)",
              lineHeight: 0.94,
              color: "#000000",
              fontWeight: 500,
            }}
          >
            <span>Used By </span>
            <em style={{ color: "var(--color-cream)" }}>Students</em>
            <span> At</span>
          </h1>

          {/* University logos strip */}
          <InfiniteCarousel />
        </div>
      </section>
    </main>
  );
}
// fill with HerousedByStudents. Under Landing page 14. Logos need to be put inside public
