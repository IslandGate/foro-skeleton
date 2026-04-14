import React from "react";

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
        style={{
          ...garamondStyle,
          fontSize: "clamp(2rem, 5.35vw, 4.82rem)",
          lineHeight: 0.94,
          fontWeight: 500,
          color: "#000000",
          textAlign: "center",
          paddingLeft: "clamp(24px, 3vw, 48px)",
          paddingRight: "clamp(24px, 3vw, 48px)",
          paddingTop: "clamp(32px, 3.47vw, 50px)",
          marginBottom: "clamp(24px, 2.5vw, 36px)",
        }}
      >
        {/* "Il Foro" — italic, brand accent colour */}
        <em
          style={{ color: "var(--color-cream, #f0ead8)", fontStyle: "italic" }}
        >
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
        <img
          src="/marketing-page-assets/HeroCatalogue-assets/competition-cards.svg"
          alt="A row of competition cards"
          style={{
            // Increased the base pixel width and the vw percentage drastically
            // to force the edge cards off the screen.
            // Tweak the "160vw" up to 180vw if you want even MORE clipping.
            width: "clamp(1800px, 160vw, 4000px)",
            maxWidth: "none",
            display: "block",
          }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
