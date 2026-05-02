"use client";

import { useMemo, useState } from "react";
import CompetitionCard, { type CompetitionCardData } from "@/components/dashboard/CompetitionCard";

type FilterCategory = {
  label: "SUBJECT" | "LOCATION" | "PRIZE TYPE" | "GROUP SIZE";
  options: string[];
};

type CompetitionSearchPanelProps = {
  competitions: CompetitionCardData[];
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function matchesSearchQuery(comp: CompetitionCardData, query: string): boolean {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return true;
  }

  const searchableFields = [
    comp.title,
    comp.location,
    comp.prizeType,
    comp.format,
    ...comp.tags,
    ...comp.subjects,
  ];

  return searchableFields.some((field) => normalize(field).includes(normalizedQuery));
}

function getGroupSize(format: string): "Solo" | "Pairs" | "Team" {
  const normalized = normalize(format);
  if (normalized.includes("individual")) {
    return "Solo";
  }
  if (normalized.includes("duo") || normalized.includes("pair")) {
    return "Pairs";
  }
  return "Team";
}

function buildFilterCategories(competitions: CompetitionCardData[]): FilterCategory[] {
  const subjects = new Set<string>();
  const locations = new Set<string>();

  for (const comp of competitions) {
    for (const subject of comp.subjects) {
      subjects.add(subject);
    }
    locations.add(comp.location);
  }

  return [
    {
      label: "SUBJECT",
      options: Array.from(subjects).sort(),
    },
    {
      label: "LOCATION",
      options: Array.from(locations).sort(),
    },
    {
      label: "PRIZE TYPE",
      options: ["Cash", "Certificate", "Scholarship"],
    },
    {
      label: "GROUP SIZE",
      options: ["Solo", "Pairs", "Team"],
    },
  ];
}

function matchesPrizeType(prizeType: string, selectedOptions: string[]): boolean {
  const normalizedPrize = normalize(prizeType);
  return selectedOptions.some((option) => {
    const normalizedOption = normalize(option);
    if (normalizedOption === "cash") {
      return normalizedPrize.includes("$") || normalizedPrize.includes("cash") || normalizedPrize.includes("fund");
    }
    if (normalizedOption === "certificate") {
      return normalizedPrize.includes("certificate") || normalizedPrize.includes("qualification");
    }
    if (normalizedOption === "scholarship") {
      return normalizedPrize.includes("scholarship") || normalizedPrize.includes("grant");
    }
    return normalizedPrize.includes(normalizedOption);
  });
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      className="relative h-5 w-5 shrink-0 rounded-xs focus:outline-none focus:ring-2 focus:ring-olive"
      type="button"
    >
      <svg viewBox="0 0 20 20" fill="none" className="h-full w-full">
        <rect
          x="2"
          y="2"
          width="16"
          height="16"
          rx="2"
          stroke="black"
          strokeWidth="1.5"
          fill={checked ? "var(--olive)" : "none"}
        />
        {checked && (
          <path
            d="M6 10l2.5 2.5L14 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

export default function CompetitionSearchPanel({ competitions }: CompetitionSearchPanelProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const filterCategories = useMemo(() => buildFilterCategories(competitions), [competitions]);

  const isChecked = (category: string, option: string): boolean => {
    return (selected[category] ?? []).includes(option);
  };

  const toggle = (category: string, option: string): void => {
    setSelected((prev: Record<string, string[]>) => {
      const current = prev[category] ?? [];
      const next = current.includes(option)
        ? current.filter((item: string) => item !== option)
        : [...current, option];
      return { ...prev, [category]: next };
    });
  };

  const filteredCompetitions = useMemo(() => {
    return competitions.filter((comp) => {
      if (!matchesSearchQuery(comp, query)) {
        return false;
      }

      const subjectFilter = selected.SUBJECT ?? [];
      if (subjectFilter.length > 0 && !subjectFilter.some((item: string) => comp.subjects.some((s) => s === item))) {
        return false;
      }

      const locationFilter = selected.LOCATION ?? [];
      if (
        locationFilter.length > 0 &&
        !locationFilter.some((item: string) => normalize(comp.location).includes(normalize(item)))
      ) {
        return false;
      }

      const prizeTypeFilter = selected["PRIZE TYPE"] ?? [];
      if (prizeTypeFilter.length > 0 && !matchesPrizeType(comp.prizeType, prizeTypeFilter)) {
        return false;
      }

      const groupSizeFilter = selected["GROUP SIZE"] ?? [];
      if (groupSizeFilter.length > 0 && !groupSizeFilter.includes(getGroupSize(comp.format))) {
        return false;
      }

      return true;
    });
  }, [competitions, query, selected]);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl border border-black/10 bg-white/70 p-4">
        <label htmlFor="competition-search" className="mb-2 block text-xs font-medium tracking-[2px] text-black/70">
          SEARCH COMPETITIONS
        </label>
        <input
          id="competition-search"
          value={query}
          onChange={(event: { target: { value: string } }) => setQuery(event.target.value)}
          placeholder="Search by title, subject, location, prize..."
          className="w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm text-black outline-none focus:border-olive"
        />
        <p className="mt-2 text-xs text-black/60">
          Showing {filteredCompetitions.length} of {competitions.length} competitions
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-[18px] font-light leading-[39.8px] tracking-[4px] text-black">SEARCH FILTERS</p>
        <div className="flex flex-wrap gap-6">
          {filterCategories.map((cat: FilterCategory) => (
            <div key={cat.label} className="flex min-w-[180px] max-w-[240px] flex-1 flex-col px-[5px]">
              <p className="h-10 text-[10px] font-light leading-[39.8px] tracking-[4px] text-black/60">{cat.label}</p>
              <div className="h-px w-full bg-black/60" />
              <div className="flex flex-col px-[5px] pt-[5px]" role="group" aria-label={`Filter by ${cat.label}`}>
                {cat.options.map((opt: string) => (
                  <div key={opt} className="flex w-full items-center justify-between">
                    <span className="text-[12px] font-medium leading-[34.4px] text-black">{opt}</span>
                    <Checkbox
                      checked={isChecked(cat.label, opt)}
                      onChange={() => toggle(cat.label, opt)}
                      label={`${opt} (${cat.label})`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {filteredCompetitions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/30 bg-white/60 p-8 text-center text-sm text-black/70">
          No competitions match your search or selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompetitions.map((comp: CompetitionCardData) => (
            <CompetitionCard key={comp.title} data={comp} />
          ))}
        </div>
      )}
    </div>
  );
}
