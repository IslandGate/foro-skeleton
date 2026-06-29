import type { StepProps } from "../types";
import { FORMAT_OPTIONS, TEAM_OPTIONS, toggleArrayItem } from "../types";

export default function StepCompetitionPrefs({
  formData,
  updateFormData,
}: StepProps) {
  const toggleFormat = (f: string) => {
    updateFormData({
      competitionFormats: toggleArrayItem(formData.competitionFormats, f),
    });
  };

  const toggleTeam = (t: string) => {
    updateFormData({
      teamPreferences: toggleArrayItem(formData.teamPreferences, t),
    });
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-dark-gray">
          Competition Format
        </h3>
        <p className="mb-4 text-base text-dark-gray/70">
          How do you prefer to compete?
        </p>
        <div className="flex flex-wrap gap-3">
          {FORMAT_OPTIONS.map((format) => {
            const selected = formData.competitionFormats.includes(format);
            return (
              <button
                key={format}
                type="button"
                onClick={() => toggleFormat(format)}
                className={`rounded-full border px-6 py-3 text-base font-medium transition-all ${
                  selected
                    ? "border-olive bg-olive text-cream"
                    : "border-dark-gray text-dark-gray hover:bg-dark-gray/5"
                }`}
              >
                {format}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-dark-gray">
          Team Size
        </h3>
        <p className="mb-4 text-base text-dark-gray/70">
          What team sizes do you prefer?
        </p>
        <div className="flex flex-wrap gap-3">
          {TEAM_OPTIONS.map((team) => {
            const selected = formData.teamPreferences.includes(team);
            return (
              <button
                key={team}
                type="button"
                onClick={() => toggleTeam(team)}
                className={`rounded-full border px-6 py-3 text-base font-medium transition-all ${
                  selected
                    ? "border-olive bg-olive text-cream"
                    : "border-dark-gray text-dark-gray hover:bg-dark-gray/5"
                }`}
              >
                {team}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
