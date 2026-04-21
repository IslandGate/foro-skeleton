import HeroWelcome from "@/components/marketing-page/Welcome";
import HeroAboutUs from "@/components/marketing-page/AboutUs/AboutUs";
import HeroFourWays from "@/components/marketing-page/FourWaysSection/HeroFourWays";
import HeroUsedByStudents from "@/components/marketing-page/UsedByStudents/UsedByStudents";

export default function Page() {
  return (
    <main>
      <HeroWelcome />
      <HeroAboutUs />
      <HeroFourWays />
      <HeroUsedByStudents />
    </main>
  );
}


