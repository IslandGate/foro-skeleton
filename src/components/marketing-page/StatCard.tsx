import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  hasIcon?: boolean;
}

/**
 * StatCard Component
 * Reusable component for displaying individual statistics
 * Supports optional star icon for ratings
 */
export function StatCard({ value, label, hasIcon = false }: StatCardProps) {
  // Determine min-width based on label, allowing it to adapt on smaller screens
  const getMinWidth = () => {
    if (label.includes("Competitions")) return "min-w-full md:min-w-[383px]";
    if (label.includes("Active")) return "min-w-full md:min-w-[260px]";
    return "min-w-full md:min-w-[275px]";
  };

  return (
    <div className={`flex flex-col items-center gap-2 py-4 ${getMinWidth()}`}>
      {/* Statistic Value */}
      <div className="flex items-center justify-center w-full">
        <span
          className="font-garamond text-7xl md:text-[128px] font-normal leading-18 tracking-tight text-black whitespace-nowrap flex items-center"
        >
          {value}
          {hasIcon && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[0.75em] h-[0.75em] ml-2 inline-block relative -top-1"
              aria-label="Rating Star"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}
        </span>
      </div>

      {/* Statistic Label */}
      <p
        className="font-garamond text-2xl md:text-[36px] font-normal leading-18 text-center w-full text-black"
      >
        {label}
      </p>
    </div>
  );
}