import Sidebar from "@/components/dashboard/Sidebar";
import { type CompetitionCardData } from "@/components/dashboard/CompetitionCard";
import CompetitionSearchPanel from "@/components/dashboard/CompetitionSearchPanel";

export const mockCompetitions: CompetitionCardData[] = [
  {
    title: "Global Robotics Championship 2026",
    image:
      "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=800",
    tags: ["Popular", "Tech"],
    subjects: ["Chemistry", "Physics"],
    registerDeadline: "2026-05-15",
    location: "San Francisco, CA (Hybrid)",
    prizeType: "$50,000 Pool",
    format: "Team (3-5 members)",
    information:
      "Design and program autonomous robots for complex navigation challenges.",
    studentsCount: 1500,
  },
  {
    title: "International Math Olympiad Qualifiers",
    image:
      "https://images.unsplash.com/photo-1635372722656-389f87a941b7?q=80&w=800",
    tags: ["Elite", "Math"],
    subjects: ["Mathematics"],
    registerDeadline: "2026-03-01",
    location: "Online",
    prizeType: "Direct Qualification",
    format: "Individual",
    information:
      "The ultimate proving ground for the world's best young mathematicians.",
    studentsCount: 3200,
  },
  {
    title: "Eco-Innovation Design Challenge",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800",
    tags: ["New", "Science"],
    subjects: ["Environmental Science", "Chemistry"],
    registerDeadline: "2026-04-20",
    location: "London, UK",
    prizeType: "Incubator Access",
    format: "Duo (2 members)",
    information:
      "Pitch sustainable product ideas to a panel of venture capitalists.",
    studentsCount: 420,
  },
  {
    title: "AI Ethics & Policy Symposium",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
    tags: ["Humanities", "Tech"],
    subjects: ["Computer Science", "Economics"],
    registerDeadline: "2026-06-10",
    location: "Washington D.C.",
    prizeType: "Internship Grant",
    format: "Individual",
    information:
      "Debate the future of artificial intelligence and its impact on global policy.",
    studentsCount: 850,
  },
  {
    title: "Bio-Medical Breakthrough Hack",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800",
    tags: ["Medical", "Research"],
    subjects: ["Biology", "Chemistry"],
    registerDeadline: "2026-07-05",
    location: "Boston, MA",
    prizeType: "$10,000 Research Fund",
    format: "Team (2-4 members)",
    information:
      "Solve real-world healthcare problems using data science and lab research.",
    studentsCount: 600,
  },
  {
    title: "Global Markets Trading Challenge",
    image:
      "https://images.unsplash.com/photo-1611974714139-edddce9979ed?q=80&w=800",
    tags: ["Finance", "High-Stakes"],
    subjects: ["Mathematics", "Economics"],
    registerDeadline: "2026-08-12",
    location: "Online",
    prizeType: "Prop Firm Funded Account",
    format: "Individual",
    information:
      "Manage a virtual portfolio and compete for the highest risk-adjusted returns.",
    studentsCount: 5000,
  },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-cream">
      <span className="sticky top-0 h-screen">
        <Sidebar />
      </span>

      <main className="flex-1 p-8">
        <CompetitionSearchPanel competitions={mockCompetitions} />
      </main>
    </div>
  );
}
