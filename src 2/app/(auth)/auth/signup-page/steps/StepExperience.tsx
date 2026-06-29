import type { StepProps } from "../types";
import { EXPERIENCE_LEVELS } from "../types";

export default function StepExperience({
  formData,
  updateFormData,
}: StepProps) {
  const setLevel = (interest: string, level: string) => {
    updateFormData({
      experienceLevels: { ...formData.experienceLevels, [interest]: level },
    });
  };

  const selectedInterests = formData.interests;

  return (
    <div className="space-y-8">
      {selectedInterests.length > 0 ? (
        <>
          <p className="text-base text-dark-gray/70">
            Rate your experience level in each area you selected.
          </p>
          <div className="space-y-5">
            {selectedInterests.map((interest) => (
              <div key={interest}>
                <label className="mb-2 block text-base font-medium text-dark-gray">
                  {interest}
                </label>
                <div className="flex overflow-hidden rounded-full border border-dark-gray">
                  {EXPERIENCE_LEVELS.map((level) => {
                    const selected =
                      formData.experienceLevels[interest] === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setLevel(interest, level)}
                        className={`flex-1 py-2.5 text-center text-sm font-medium transition-all ${
                          selected
                            ? "bg-olive text-cream"
                            : "text-dark-gray hover:bg-dark-gray/5"
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-base text-dark-gray/70">
          Go back and select some interests first to rate your experience.
        </p>
      )}

      <div>
        <fieldset className="rounded-lg border border-dark-gray px-[23px] py-[10px]">
          <legend className="px-2 text-base font-medium text-dark-gray">
            Previous Competition Participation
          </legend>
          <textarea
            value={formData.previousParticipation}
            onChange={(e) =>
              updateFormData({ previousParticipation: e.target.value })
            }
            placeholder="Tell us about any competitions you've participated in before..."
            rows={4}
            className="w-full resize-none bg-transparent text-base text-dark-gray placeholder:text-dark-gray/40 focus:outline-none"
          />
        </fieldset>
      </div>
    </div>
  );
}
