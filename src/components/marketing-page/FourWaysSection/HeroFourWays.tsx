import React from "react";

const garamondStyle: React.CSSProperties = {
  fontFamily: "var(--font-eb-garamond, 'EB Garamond', Georgia, serif)",
};

const ASSETS = {
  competitionCards:
    "/marketing-page-assets/FourWays-assets/Easy%20to%20read%20competition%20cards.png",
  aggregator:
    "/marketing-page-assets/FourWays-assets/A%20Competition%20aggregator.png",
  searchFilters: "/marketing-page-assets/FourWays-assets/Easy%20win.png",
  locationMap:
    "/marketing-page-assets/FourWays-assets/Find%20and%20win%20competitions.png",
} as const;

// A subtle shadow to give the cards depth against the background
const shadowClass =
  "drop-shadow-[0_12px_36px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:-translate-y-2";

export default function HeroFourWays() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden px-4 py-6 sm:px-8 md:px-12 lg:px-20"
      // Added a background color that mimics the Figma tone.
      // Update the url() below with your actual painting background asset!
      style={{
        backgroundColor: "#E4DDCB",
        backgroundImage:
          "url('/marketing-page-assets/bg-painting-placeholder.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-labelledby="four-ways-heading"
    >
      {/* Optional overlay to soften the background image if needed */}
      <div className="absolute inset-0 bg-[#E4DDCB]/20 pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] pt-8 md:pt-16">
        {/* Section Heading */}
        <h2
          id="four-ways-heading"
          className="mb-12 text-left text-[clamp(2.5rem,5vw,4.8rem)] font-medium leading-[1.05] text-black md:mb-20"
          style={garamondStyle}
        >
            Four ways {" "} 
          <span
            className="italic text-mauve"
          >
            Il Foro
          </span>{" "}
          makes it easier to find
          <br /> <span className="text-mauve">academic competitions </span>
        </h2>

        {/* 2-Column Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-24 items-start pb-20">
          {/* Left Column */}
          <div className="flex flex-col gap-10 md:gap-16 lg:gap-24 w-full">
            <div className="w-full relative">
              <img
                src={ASSETS.competitionCards}
                alt="Easy to read competition cards"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ width: "100%", height: "auto" }}
                className={shadowClass}
              />
            </div>
            <div className="w-full relative">
              <img
                src={ASSETS.searchFilters}
                alt="Narrow it down. Win it now."
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ width: "100%", height: "auto" }}
                className={shadowClass}
              />
            </div>
          </div>

          {/* Right Column (Staggered Downward) */}
          <div className="flex flex-col gap-10 md:gap-16 lg:gap-20 w-full md:pt-[15%]">
            <div className="w-full relative">
              <img
                src={ASSETS.aggregator}
                alt="A competition aggregator that is personalised."
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ width: "100%", height: "auto" }}
                className={shadowClass}
              />
            </div>
            <div className="w-full relative">
              <img
                src={ASSETS.locationMap}
                alt="Find and win competitions in your backyard."
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ width: "100%", height: "auto" }}
                className={shadowClass}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}