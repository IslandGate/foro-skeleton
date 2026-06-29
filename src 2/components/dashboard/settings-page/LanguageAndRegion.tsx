"use client";
import React from "react";

export interface LanguageAndRegionProps {
  language?: string;
  region?: string;
  onLanguageChange?: (value: string) => void;
  onRegionChange?: (value: string) => void;
}

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium",
  "Bolivia", "Bosnia and Herzegovina", "Brazil", "Brunei", "Bulgaria", "Cambodia",
  "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Estonia", "Ethiopia", "Finland", "France", "Georgia", "Germany",
  "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "Hungary", "Iceland",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Malaysia", "Maldives", "Malta",
  "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Myanmar",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Nigeria", "North Korea",
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Paraguay",
  "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Romania",
  "Russia", "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia",
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Thailand", "Tunisia", "Turkey", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Venezuela", "Vietnam", "Yemen", "Zimbabwe",
];

export default function LanguageAndRegion({
  language = "",
  region = "",
  onLanguageChange,
  onRegionChange,
}: LanguageAndRegionProps) {
  const selectClass =
    "w-full rounded-lg border border-gray-800 bg-cream px-4 py-3 font-space-grotesk text-base text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-400";

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Language and Region
      </h2>

      <label className="flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Language</span>
        <select value={language} onChange={(e) => onLanguageChange?.(e.target.value)} className={selectClass}>
          <option value="" disabled>Your Language</option>
          <option value="en">English</option>
          <option value="zh">Chinese</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </label>

      <label className="mt-6 flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">Region</span>
        <select value={region} onChange={(e) => onRegionChange?.(e.target.value)} className={selectClass}>
          <option value="" disabled>Your Region</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
