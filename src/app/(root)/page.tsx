import HeroAboutUs from "@/src/components/marketing-page/HeroAboutUs/HeroAboutUs";
import HeroFourWays from "@/src/components/marketing-page/FourWaysSection/HeroFourWays";
import HeroWelcome from "@/src/components/marketing-page/HeroWelcome";
import HeroCatalogueSection from "@/src/components/marketing-page/HeroCatalogueSection";
import HeroUsedByStudents from "@/src/components/marketing-page/HeroUsedByStudents/HeroUsedByStudents";

export default function Page() {
  return (
    <main>
      <HeroWelcome />
      <HeroCatalogueSection />
      <HeroAboutUs />
      <HeroFourWays />
      <HerousedByStudents />
    </>
  );
}
