import HeroWelcome from "@/components/marketing-page/Welcome";
import HeroAboutUs from "@/components/marketing-page/AboutUs/AboutUs";
import HeroFourWays from "@/components/marketing-page/FourWaysSection/HeroFourWays";
import HeroUsedByStudents from "@/components/marketing-page/UsedByStudents/UsedByStudents";

export default function Page() {
  return (
    <main className="bg-[url('/images/hero-catalogue-bg.png')] bg-contain bg-no-repeat">
      {" "}
      <HeroWelcome />
      <div className="bg-white">
        <div className="mt-[375px]">
          <HeroAboutUs />
        </div>
        <HeroFourWays />
        <HeroUsedByStudents />
      </div>
    </main>
  );
}


