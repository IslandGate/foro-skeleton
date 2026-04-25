"use client";

import { Parallax } from "react-parallax";
import HeroWelcome from "@/components/marketing-page/Welcome";
import HeroAboutUs from "@/components/marketing-page/AboutUs/AboutUs";
import HeroFourWays from "@/components/marketing-page/FourWaysSection/HeroFourWays";
import HeroUsedByStudents from "@/components/marketing-page/UsedByStudents/UsedByStudents";

export default function Page() {
  return (
    <main>
      <Parallax 
        bgImage="/images/hero-catalogue-bg.png" 
        strength={800} 
        bgImageStyle={{ 
          width: "100%",
          minWidth: "1500px", // THE FIX: Physically prevents the image from shrinking on mobile
          height: "auto",     // Keeps the natural desktop height
          objectFit: "cover", 
          objectPosition: "top center" 
        }}
      >
        
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