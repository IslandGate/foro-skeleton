import HeroAboutUs from "@/src/components/marketing-page/HeroAboutUs/HeroAboutUs";
import HeroFourWays from "@/src/components/marketing-page/FourWaysSection/HeroFourWays";
import HeroWelcome from "@/src/components/marketing-page/HeroWelcome";
import HerousedByStudents from "@/src/components/marketing-page/HeroUsedByStudents/HeroUsedByStudents";

export default function page() {
  return (
    <>
      <HeroWelcome />
      <HeroAboutUs />
      <HeroFourWays />
      <HerousedByStudents />
    </>
  );
}
