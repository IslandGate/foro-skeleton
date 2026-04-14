import type { StepProps } from "../types";
import {
  MOTIVATION_OPTIONS,
  TRAVEL_OPTIONS,
  toggleArrayItem,
} from "../types";

export default function StepMotivation({
  formData,
  updateFormData,
}: StepProps) {
  const toggleMotivation = (m: string) => {
    updateFormData({
      motivations: toggleArrayItem(formData.motivations, m),
    });
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-dark-gray">
          What motivates you to compete?
        </h3>
        <p className="mb-4 text-base text-dark-gray/70">
          Select all that apply.
        </p>
        <div className="flex flex-wrap gap-3">
          {MOTIVATION_OPTIONS.map((motivation) => {
            const selected = formData.motivations.includes(motivation);
            return (
              <button
                key={motivation}
                type="button"
                onClick={() => toggleMotivation(motivation)}
                className={`rounded-full border px-5 py-2.5 text-base font-medium transition-all ${
                  selected
                    ? "border-olive bg-olive text-cream"
                    : "border-dark-gray text-dark-gray hover:bg-dark-gray/5"
                }`}
              >
                {motivation}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-dark-gray">
          Willing to travel for competitions?
        </h3>
        <div className="flex flex-wrap gap-3">
          {TRAVEL_OPTIONS.map((option) => {
            const selected = formData.willingToTravel === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => updateFormData({ willingToTravel: option })}
                className={`rounded-full border px-5 py-2.5 text-base font-medium transition-all ${
                  selected
                    ? "border-olive bg-olive text-cream"
                    : "border-dark-gray text-dark-gray hover:bg-dark-gray/5"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
