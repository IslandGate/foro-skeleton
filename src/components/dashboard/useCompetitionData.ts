"use client";

import { useEffect, useState } from "react";
import type { CompetitionCardData } from "./CompetitionCard";

const COMPETITIONS_API = "/api/competitions";
const SAVED_COMPETITIONS_API = "/api/saved-competitions";

export function useCompetitionData() {
  const [competitions, setCompetitions] = useState<CompetitionCardData[]>([]);
  const [savedCompetitionIds, setSavedCompetitionIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const [competitionsResponse, savedResponse] = await Promise.all([
          fetch(COMPETITIONS_API),
          fetch(SAVED_COMPETITIONS_API),
        ]);

        if (!competitionsResponse.ok) {
          throw new Error(
            `Competitions fetch failed (${competitionsResponse.status})`,
          );
        }
        if (!savedResponse.ok) {
          throw new Error(
            `Saved competitions fetch failed (${savedResponse.status})`,
          );
        }

        const competitionsData =
          (await competitionsResponse.json()) as CompetitionCardData[];
        const savedPayload = (await savedResponse.json()) as {
          savedCompetitionIds: string[];
        };

        setCompetitions(competitionsData ?? []);
        setSavedCompetitionIds(savedPayload.savedCompetitionIds ?? []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load competitions at this time.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  async function toggleSaved(competitionId: string, currentlySaved: boolean) {
    const method = currentlySaved ? "DELETE" : "POST";
    const response = await fetch(SAVED_COMPETITIONS_API, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ competitionId }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      const message =
        payload?.error ||
        `Unable to ${currentlySaved ? "unsave" : "save"} competition.`;
      throw new Error(message);
    }

    setSavedCompetitionIds((prev) =>
      currentlySaved
        ? prev.filter((id) => id !== competitionId)
        : [...prev, competitionId],
    );
  }

  return {
    competitions,
    savedCompetitionIds,
    isLoading,
    error,
    toggleSaved,
  };
}
