import HeroAboutUs from "@/components/marketing-page/HeroAboutUs/HeroAboutUs";
import HeroFourWays from "@/components/marketing-page/FourWaysSection/HeroFourWays";
import HeroWelcome from "@/components/marketing-page/HeroWelcome";
import HeroUsedByStudents from "@/components/marketing-page/HeroUsedByStudents/HeroUsedByStudents";
  
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
