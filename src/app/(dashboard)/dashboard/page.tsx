import Sidebar from "@/components/dashboard/Sidebar";
import CompetitionCard, { type CompetitionCardData } from "@/components/dashboard/CompetitionCard";

const mockCompetitions: CompetitionCardData[] = [
  {
    title: "Global Robotics Championship 2026",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=800&auto=format&fit=crop",
    tags: ["Popular", "Tech"],
    subjects: ["Maths"],
    location: "San Francisco, CA (Hybrid)",
    prizeType: "$50,000 Pool",
    winRate: "Top 5%",
    format: "Team (3-5 members)",
    information: "Join the ultimate robotics showdown! Design, build, and program autonomous robots to solve complex challenges. Perfect for high school students looking to boost their STEM portfolios.",
    studentsCount: 1500,
    spotsRemaining: "45",
  },
  {
    title: "International Math Olympiad Qualifiers",
    image: "https://images.unsplash.com/photo-1635372722656-389f87a941b7?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Elite", "Math"],
    subjects: ["Biology", "Medicine"],
    location: "Online",
    prizeType: "Direct Qualification",
    winRate: "Top 1%",
    format: "Individual",
    information: "Test your mathematical prowess against the best minds globally. This qualifier is the first step towards representing your country at the prestigious IMO.",
    studentsCount: 3200,
    spotsRemaining: "Unlimited",
  },
  {
    title: "Eco-Innovation Design Challenge",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop",
    tags: ["New", "Science"],
    subjects: ["Engineering", "Physics"],
    location: "London, UK",
    prizeType: "Incubator Access",
    winRate: "Top 10%",
    format: "Duo (2 members)",
    information: "Pitch your sustainable product ideas to a panel of industry experts. Looking for innovative solutions to everyday environmental problems utilizing renewable materials.",
    studentsCount: 420,
    spotsRemaining: "12",
  }
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompetitions.map((comp, index) => (
            <CompetitionCard key={index} data={comp} />
          ))}
        </div>
      </main>
    </div>
  );
}