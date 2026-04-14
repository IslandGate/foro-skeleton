import type { StepProps } from "../types";
import { GRADE_OPTIONS } from "../types";

export default function StepAboutYou({
  formData,
  updateFormData,
}: StepProps) {
  return (
    <div className="grid grid-cols-1 gap-x-[39px] gap-y-[40px] sm:grid-cols-2">
      <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px]">
        <legend className="px-2 text-base font-medium text-dark-gray">
          Age
        </legend>
        <input
          type="number"
          min="10"
          max="99"
          value={formData.age}
          onChange={(e) => updateFormData({ age: e.target.value })}
          className="w-full bg-transparent text-base text-dark-gray focus:outline-none"
          required
        />
      </fieldset>

      <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px]">
        <legend className="px-2 text-base font-medium text-dark-gray">
          Grade / Year Level
        </legend>
        <select
          value={formData.gradeLevel}
          onChange={(e) => updateFormData({ gradeLevel: e.target.value })}
          className="w-full bg-transparent text-base text-dark-gray focus:outline-none"
          required
        >
          <option value="" disabled>
            Select your level
          </option>
          {GRADE_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px] sm:col-span-2">
        <legend className="px-2 text-base font-medium text-dark-gray">
          Location / Region
        </legend>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => updateFormData({ location: e.target.value })}
          placeholder="e.g. Hong Kong, New York, London"
          className="w-full bg-transparent text-base text-dark-gray placeholder:text-dark-gray/40 focus:outline-none"
          required
        />
      </fieldset>
    </div>
  );
}
