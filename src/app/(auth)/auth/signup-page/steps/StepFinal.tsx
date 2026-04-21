import type { StepProps } from "../types";

export default function StepFinal({ formData, updateFormData }: StepProps) {
  return (
    <div className="space-y-8">
      <p className="text-base text-dark-gray/70">
        One last thing — is there anything else you&apos;d like us to know?
      </p>

      <fieldset className="rounded-lg border border-dark-gray px-[23px] py-[10px]">
        <legend className="px-2 text-base font-medium text-dark-gray">
          Additional Interests or Categories
        </legend>
        <textarea
          value={formData.additionalInterests}
          onChange={(e) =>
            updateFormData({ additionalInterests: e.target.value })
          }
          placeholder="Any competition categories or interests you'd like to see on Il Foro..."
          rows={4}
          className="w-full resize-none bg-transparent text-base text-dark-gray placeholder:text-dark-gray/40 focus:outline-none"
        />
      </fieldset>

      <div className="rounded-xl border border-dark-gray/20 bg-olive/5 p-6">
        <h3 className="mb-4 text-lg font-semibold text-dark-gray">
          Your Profile Summary
        </h3>
        <div className="space-y-3 text-sm text-dark-gray/80">
          <div className="flex justify-between border-b border-dark-gray/10 pb-2">
            <span className="font-medium">Name</span>
            <span>
              {formData.firstName} {formData.lastName}
            </span>
          </div>
          <div className="flex justify-between border-b border-dark-gray/10 pb-2">
            <span className="font-medium">Username</span>
            <span>@{formData.username || "—"}</span>
          </div>
          <div className="flex justify-between border-b border-dark-gray/10 pb-2">
            <span className="font-medium">Email</span>
            <span>{formData.email || "—"}</span>
          </div>
          <div className="flex justify-between border-b border-dark-gray/10 pb-2">
            <span className="font-medium">Grade</span>
            <span>{formData.gradeLevel || "—"}</span>
          </div>
          <div className="flex justify-between border-b border-dark-gray/10 pb-2">
            <span className="font-medium">Location</span>
            <span>{formData.location || "—"}</span>
          </div>
          {formData.interests.length > 0 && (
            <div className="flex justify-between border-b border-dark-gray/10 pb-2">
              <span className="font-medium">Interests</span>
              <span className="text-right">
                {formData.interests.join(", ")}
              </span>
            </div>
          )}
          {formData.competitionFormats.length > 0 && (
            <div className="flex justify-between border-b border-dark-gray/10 pb-2">
              <span className="font-medium">Format</span>
              <span>{formData.competitionFormats.join(", ")}</span>
            </div>
          )}
          {formData.teamPreferences.length > 0 && (
            <div className="flex justify-between">
              <span className="font-medium">Team Size</span>
              <span>{formData.teamPreferences.join(", ")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
