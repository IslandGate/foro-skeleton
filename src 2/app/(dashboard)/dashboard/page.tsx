"use client";
import React, { useState, useMemo } from "react";
import Sidebar from "@/components/dashboard/Sidebar"; 
import SearchBar from "@/components/dashboard/SearchBar"; 
import Filter, { FilterState } from "@/components/dashboard/Filter"; 
import CompetitionCard, { CompetitionCardData } from "@/components/dashboard/CompetitionCard";

// we could have FilterState and CompetitionCardData prop in a type.ts file if anyone wants to do that..

const mockCompetitions: CompetitionCardData[] = [
  {
    title: "Global Robotics Championship 2026",
    image:
      "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=800",
    tags: ["Popular", "Tech"],
    subjects: ["Chemistry", "Physics"],
    registerDeadline: "2026-05-15",
    location: "San Francisco, CA (Hybrid)",
    prizeType: "$50,000 Cash",
    groupSize: "Team (3-5 members)",
    information:
      "Design and program autonomous robots for complex navigation challenges.",
    studentsCount: 1500,
    competitionWebsite: "https://google.com",
  },
  {
    title: "International Math Olympiad Qualifiers",
    image:
      "https://images.unsplash.com/photo-1635372722656-389f87a941b7?q=80&w=800",
    tags: ["Elite", "Math"],
    subjects: ["Maths"],
    registerDeadline: "2026-03-01",
    location: "Online",
    prizeType: "Certificate",
    groupSize: "Individual",
    information:
      "The ultimate proving ground for the world's best young mathematicians.",
    studentsCount: 3200,
    competitionWebsite: "https://google.com",
  },
  {
    title: "Eco-Innovation Design Challenge",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800",
    tags: ["New", "Science"],
    subjects: ["Environmental Science", "Chemistry"],
    registerDeadline: "2026-04-20",
    location: "London, UK",
    prizeType: "Scholarship",
    groupSize: "Duo (2 members)",
    information:
      "Pitch sustainable product ideas to a panel of venture capitalists.",
    studentsCount: 420,
    competitionWebsite: "https://google.com",
  },
  {
    title: "AI Ethics & Policy Symposium",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
    tags: ["Humanities", "Tech"],
    subjects: ["Computer Science", "Economics"],
    registerDeadline: "2026-06-10",
    location: "Washington D.C.",
    prizeType: "Scholarship",
    groupSize: "Individual",
    information:
      "Debate the future of artificial intelligence and its impact on global policy.",
    studentsCount: 850,
    competitionWebsite: "https://google.com",
  },
  {
    title: "Bio-Medical Breakthrough Hack",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800",
    tags: ["Medical", "Research"],
    subjects: ["Biology", "Chemistry"],
    registerDeadline: "2026-07-05",
    location: "Boston, MA",
    prizeType: "$10,000 Cash",
    groupSize: "Team (2-4 members)",
    information:
      "Solve real-world healthcare problems using data science and lab research.",
    studentsCount: 600,
    competitionWebsite: "https://google.com",
  },
  {
    title: "Global Markets Trading Challenge",
    image:
      "https://images.unsplash.com/photo-1611974714139-edddce9979ed?q=80&w=800",
    tags: ["Finance", "High-Stakes"],
    subjects: ["Maths", "Economics"],
    registerDeadline: "2026-08-12",
    location: "Online",
    prizeType: "$50,000 Cash",
    groupSize: "Team (1-8 members)",
    information:
      "Manage a virtual portfolio and compete for the highest risk-adjusted returns.",
    studentsCount: 5000,
    competitionWebsite: "https://google.com",
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    subjects: [],
    location: "",
    prizes: [],
    groupTypes: [],
    teamSize: null,
  });

  const filteredCompetitions = useMemo(() => {
    return mockCompetitions.filter((comp) => {

      // search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!comp.title.toLowerCase().includes(query) && !comp.information.toLowerCase().includes(query)) {
          return false;
        }
      }

      // location
      if (filters.location) {
        if (!comp.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // subjects
      if (filters.subjects.length > 0) {
        const hasMatchingSubject = comp.subjects.some((sub) => filters.subjects.includes(sub));
        if (!hasMatchingSubject) return false;
      }

      // prizes
      if (filters.prizes.length > 0) {
        const matchesPrize = filters.prizes.some((prize) => comp.prizeType.includes(prize));
        if (!matchesPrize) return false;
      }

      // group size checks
      const hasGroupFilters = filters.groupTypes.length > 0 || filters.teamSize !== null;
      if (hasGroupFilters) {
        let matchesGroup = false;

        // match the group size string with option
        if (filters.groupTypes.includes(comp.groupSize)) {
          matchesGroup = true;
        }

        // match the group size range with typed option
        if (!matchesGroup && comp.groupSize.startsWith("Team")) {
          const bounds = comp.groupSize.match(/\d+/g); 
          if (bounds && bounds.length >= 2) {
            const min = parseInt(bounds[0], 10);
            const max = parseInt(bounds[1], 10);
            
            //  if typed team size fits the range
            if (filters.teamSize !== null && filters.teamSize >= min && filters.teamSize <= max) {
              matchesGroup = true;
            }

            // if Individual is checked, does team range include 1?
            if (filters.groupTypes.includes("Individual") && min <= 1 && max >= 1) {
              matchesGroup = true;
            }

            // if Individual is checked, does team range include 1?
            if (filters.groupTypes.includes("Duo (2 members)") && min <= 2 && max >= 2) {
              matchesGroup = true;
            }
          }
        }

        if (!matchesGroup) return false;
      }

      return true; 
    });
  }, [searchQuery, filters]);

  return (
    <div className="flex min-h-screen bg-cream">
      <span className="sticky top-0 h-screen">
        <Sidebar />
      </span>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">

          <h1 className="font-garamond font-semibold text-2xl p-2">Dashboard</h1>
          
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isFilterOpen={isFilterOpen} 
            toggleFilter={() => setIsFilterOpen(!isFilterOpen)} 
          />
          
          <Filter 
            isOpen={isFilterOpen} 
            filters={filters} 
            setFilters={setFilters} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitions.length > 0 ? (
              filteredCompetitions.map((comp, index) => (
                <CompetitionCard key={index} data={comp} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500 font-space-grotesk">
                No competitions found matching your criteria.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}