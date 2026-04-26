"use client";

import HeroWelcome from "@/components/marketing-page/Welcome";
import HeroAboutUs from "@/components/marketing-page/AboutUs/AboutUs";
import HeroFourWays from "@/components/marketing-page/FourWaysSection/HeroFourWays";
import HeroUsedByStudents from "@/components/marketing-page/UsedByStudents/UsedByStudents";
import Parallax from "@/components/Parallax"

export default function Page() {
  return (
    <main>
      <Parallax bgImage="/images/hero-catalogue-bg.png" strength={1000}>
        
        <div className="pt-24">
          <HeroWelcome />
        </div>

        <div className="relative z-20">
          <div className="mt-[400px]">
            <HeroAboutUs />
          </div>
          <HeroFourWays />
          <HeroUsedByStudents />
        </div>

      </Parallax>
    </main>
  );
}