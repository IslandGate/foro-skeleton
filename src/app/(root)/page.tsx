import HeroAboutUs from "@/src/components/marketing-page/HeroAboutUs/HeroAboutUs";
import HeroWelcome from "@/src/components/marketing-page/HeroWelcome";
import HerousedByStudents from "@/src/components/marketing-page/HeroUsedByStudents/HeroUsedByStudents";
import HeroCatalogueSection from "@/src/components/marketing-page/HeroCatalogueSection";

export default function page() {
  return (
    <>
      <HeroWelcome />
      <HeroCatalogueSection />
      <HeroAboutUs />
      <HerousedByStudents />
    </>
  );
}
