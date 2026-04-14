import type { StepProps } from "../types";

export default function StepCreateAccount({
  formData,
  updateFormData,
}: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 gap-x-[39px] gap-y-[40px] sm:grid-cols-2">
      <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px]">
        <legend className="px-2 text-base font-medium text-dark-gray">
          First Name
        </legend>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full bg-transparent text-base text-dark-gray focus:outline-none"
          required
        />
      </fieldset>

      <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px]">
        <legend className="px-2 text-base font-medium text-dark-gray">
          Last Name
        </legend>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full bg-transparent text-base text-dark-gray focus:outline-none"
          required
        />
      </fieldset>

      <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px] sm:col-span-2">
        <legend className="px-2 text-base font-medium text-dark-gray">
          Email
        </legend>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-transparent text-base text-dark-gray focus:outline-none"
          required
        />
      </fieldset>

      <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px] sm:col-span-2">
        <legend className="px-2 text-base font-medium text-dark-gray">
          Password
        </legend>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-transparent text-base text-dark-gray focus:outline-none"
          required
        />
      </fieldset>

      <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px] sm:col-span-2">
        <legend className="px-2 text-base font-medium text-dark-gray">
          Confirm Password
        </legend>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full bg-transparent text-base text-dark-gray focus:outline-none"
          required
        />
      </fieldset>

      <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px] sm:col-span-2">
        <legend className="px-2 text-base font-medium text-dark-gray">
          Create Username
        </legend>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full bg-transparent text-base text-dark-gray focus:outline-none"
          required
        />
      </fieldset>
    </div>
  );
}
