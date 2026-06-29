"use client";

import HeroWelcome from "@/components/marketing-page/Welcome";
import HeroAboutUs from "@/components/marketing-page/AboutUs/AboutUs";
import HeroFourWays from "@/components/marketing-page/FourWaysSection/HeroFourWays";
import HeroUsedByStudents from "@/components/marketing-page/UsedByStudents/UsedByStudents";
import Parallax from "@/components/Parallax"
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();

  return (
    <main>
      <Parallax
        bgImage="/images/hero-catalogue-bg.png"
        strength={1000}
        key={pathname}
      >
        <div className="pt-24">
          <HeroWelcome />
        </div>

        <div className="relative z-20">
          <div className="mt-110">
            <HeroAboutUs />
          </div>
          <HeroFourWays />
          <HeroUsedByStudents />
        </div>
      </Parallax>
    </main>
  );
}