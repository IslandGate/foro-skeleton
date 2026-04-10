import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  hasIcon?: boolean;
}

const garamondStyle: React.CSSProperties = {
  fontFamily: "var(--font-eb-garamond, 'EB Garamond', Georgia, serif)",
};

/**
 * StatCard Component
 * Reusable component for displaying individual statistics
 * Supports optional star icon for ratings
 *
 * Dimensions follow Figma exactly:
 * - Stat 1 (Competitions): 383x146px
 * - Stat 2 (Users): 260x146px
 * - Stat 3 (Rating): 275x146px
 */
export function StatCard({ value, label, hasIcon = false }: StatCardProps) {
  // Determine width based on label for Figma accuracy
  const getWidth = () => {
    if (label.includes("Competitions")) return "w-[383px]";
    if (label.includes("Active")) return "w-[260px]";
    return "w-[275px]";
  };

  return (
    <div className={`flex flex-col items-center gap-0 h-[146px] ${getWidth()}`}>
      {/* Statistic Value - Exact Figma: 73px height, 128px font, 72px line-height */}
      <div className="h-[73px] flex items-center justify-center w-full">
        <span
          className="text-[128px] font-normal leading-[72px] tracking-tight text-black whitespace-nowrap"
          style={garamondStyle}
        >
          {value}
          {hasIcon && (
            <span className="text-[100px] ml-1 align-middle inline-block relative -top-1">
              ★
            </span>
          )}
        </span>
      </div>

      {/* Statistic Label - Exact Figma: 73px height, 36px font, 72px line-height, center aligned */}
      <p
        className="text-[36px] font-normal leading-[72px] text-center w-full h-[73px] text-black"
        style={garamondStyle}
      >
        {label}
      </p>
    </div>
  );
}
