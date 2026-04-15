import HeroAboutUs from "@/src/components/marketing-page/AboutUs/AboutUs";
import HeroFourWays from "@/src/components/marketing-page/FourWaysSection/HeroFourWays";
import HeroWelcome from "@/src/components/marketing-page/Welcome";
import HeroUsedByStudents from "@/src/components/marketing-page/UsedByStudents/UsedByStudents";
  
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
