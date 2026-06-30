"use client";
import React, { useState, useMemo } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import SearchBar from "@/components/dashboard/SearchBar";
import Filter, { FilterState } from "@/components/dashboard/Filter";
import CompetitionCard from "@/components/dashboard/CompetitionCard";
import { useCompetitionData } from "@/components/dashboard/useCompetitionData";

export default function SavedCompetitions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { competitions, savedCompetitionIds, isLoading, error, toggleSaved } = useCompetitionData();
  const [filters, setFilters] = useState<FilterState>({
    subjects: [],
    location: "",
    prizes: [],
    groupTypes: [],
    teamSize: null,
  });

  const savedCompetitions = useMemo(
    () => competitions.filter((comp) => savedCompetitionIds.includes(comp.id)),
    [competitions, savedCompetitionIds],
  );

  const filteredCompetitions = useMemo(() => {
    return savedCompetitions.filter((comp) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!comp.title.toLowerCase().includes(query) && !comp.information.toLowerCase().includes(query)) {
          return false;
        }
      }

      if (filters.location) {
        if (!comp.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      if (filters.subjects.length > 0) {
        const hasMatchingSubject = comp.subjects.some((sub) => filters.subjects.includes(sub));
        if (!hasMatchingSubject) return false;
      }

      if (filters.prizes.length > 0) {
        const matchesPrize = filters.prizes.some((prize) => comp.prizeType.includes(prize));
        if (!matchesPrize) return false;
      }

      const hasGroupFilters = filters.groupTypes.length > 0 || filters.teamSize !== null;
      if (hasGroupFilters) {
        let matchesGroup = false;

        if (filters.groupTypes.includes(comp.groupSize)) {
          matchesGroup = true;
        }

        if (!matchesGroup && comp.groupSize.startsWith("Team")) {
          const bounds = comp.groupSize.match(/\d+/g);
          if (bounds && bounds.length >= 2) {
            const min = parseInt(bounds[0], 10);
            const max = parseInt(bounds[1], 10);

            if (filters.teamSize !== null && filters.teamSize >= min && filters.teamSize <= max) {
              matchesGroup = true;
            }

            if (filters.groupTypes.includes("Individual") && min <= 1 && max >= 1) {
              matchesGroup = true;
            }

            if (filters.groupTypes.includes("Duo (2 members)") && min <= 2 && max >= 2) {
              matchesGroup = true;
            }
          }
        }

        if (!matchesGroup) return false;
      }

      return true;
    });
  }, [savedCompetitions, searchQuery, filters]);

  return (
    <div className="flex min-h-screen bg-cream">
      <span className="sticky top-0 h-screen">
        <Sidebar />
      </span>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-garamond font-semibold text-2xl p-2">Saved Competitions</h1>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isFilterOpen={isFilterOpen}
            toggleFilter={() => setIsFilterOpen(!isFilterOpen)}
          />

          <Filter isOpen={isFilterOpen} filters={filters} setFilters={setFilters} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full py-20 text-center text-gray-500 font-space-grotesk">
                Loading saved competitions...
              </div>
            ) : error ? (
              <div className="col-span-full py-20 text-center text-red-500 font-space-grotesk">{error}</div>
            ) : filteredCompetitions.length > 0 ? (
              filteredCompetitions.map((comp) => (
                <CompetitionCard
                  key={comp.id}
                  data={comp}
                  initialSaved={true}
                  onToggleSaved={() => toggleSaved(comp.id, true)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500 font-space-grotesk">
                No saved competitions found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
