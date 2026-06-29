import type { StepProps } from "../types";
import { INTEREST_OPTIONS, toggleArrayItem } from "../types";

export default function StepInterests({
  formData,
  updateFormData,
}: StepProps) {
  const toggle = (interest: string) => {
    updateFormData({
      interests: toggleArrayItem(formData.interests, interest),
    });
  };

  return (
    <div>
      <p className="mb-6 text-base text-dark-gray/70">
        Select all the subjects that interest you.
      </p>
      <div className="flex flex-wrap gap-3">
        {INTEREST_OPTIONS.map((interest) => {
          const selected = formData.interests.includes(interest);
          return (
            <button
              key={interest}
              type="button"
              onClick={() => toggle(interest)}
              className={`rounded-full border px-5 py-2.5 text-base font-medium transition-all ${
                selected
                  ? "border-olive bg-olive text-cream"
                  : "border-dark-gray text-dark-gray hover:bg-dark-gray/5"
              }`}
            >
              {interest}
            </button>
          );
        })}
      </div>
      {formData.interests.length > 0 && (
        <p className="mt-6 text-sm text-dark-gray/50">
          {formData.interests.length} selected
        </p>
      )}
    </div>
  );
}
