export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;

  age: string;
  gradeLevel: string;
  location: string;

  interests: string[];

  competitionFormats: string[];
  teamPreferences: string[];

  experienceLevels: Record<string, string>;
  previousParticipation: string;

  motivations: string[];
  willingToTravel: string;

  additionalInterests: string;
}

export interface StepProps {
  formData: SignupFormData;
  updateFormData: (updates: Partial<SignupFormData>) => void;
}

export const INITIAL_FORM_DATA: SignupFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  age: "",
  gradeLevel: "",
  location: "",
  interests: [],
  competitionFormats: [],
  teamPreferences: [],
  experienceLevels: {},
  previousParticipation: "",
  motivations: [],
  willingToTravel: "",
  additionalInterests: "",
};

export const INTEREST_OPTIONS = [
  "Science",
  "Technology",
  "Medicine",
  "Environmental Issues",
  "Coding",
  "Games",
  "Writing",
  "Mathematics",
  "Business",
  "Arts",
  "Engineering",
  "Social Sciences",
];

export const FORMAT_OPTIONS = ["Online", "In-Person"];

export const TEAM_OPTIONS = [
  "Solo",
  "2-Person",
  "3-Person",
  "4-Person",
  "4+ Person",
];

export const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const MOTIVATION_OPTIONS = [
  "Prizes",
  "Learning",
  "Socializing",
  "Career Growth",
  "Challenge",
  "Recognition",
];

export const TRAVEL_OPTIONS = [
  "Yes, anywhere",
  "Within my region",
  "Only virtual/online",
];

export const GRADE_OPTIONS = [
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "University - Year 1",
  "University - Year 2",
  "University - Year 3",
  "University - Year 4+",
  "Other",
];

export function toggleArrayItem(arr: string[], item: string): string[] {
  return arr.includes(item)
    ? arr.filter((i) => i !== item)
    : [...arr, item];
}
