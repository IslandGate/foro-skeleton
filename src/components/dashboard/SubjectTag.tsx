import React from "react";

export type SubjectName =
  | "Maths"
  | "Engineering"
  | "Chemistry"
  | "Physics"
  | "Biology"
  | "Economics"
  | "Business"
  | "Medicine";

interface SubjectTagProps {
  subject: SubjectName;
  onRemove?: () => void;
}

const SUBJECT_COLOUR: Record<SubjectName, string> = {
  Maths: "bg-[#a1b866]",
  Engineering: "bg-[#f59e42]",
  Chemistry: "bg-[#ef4a60]",
  Physics: "bg-[#5bc0eb]",
  Biology: "bg-[#66c25e]",
  Medicine: "bg-white",
  Economics: "bg-amber-400",
  Business: "bg-purple-500",
};

const SUBJECT_ICON_PATHS: Record<SubjectName, string> = {
  Maths: "/tags/Math.svg",
  Engineering: "/tags/Engineering.svg",
  Chemistry: "/tags/Chemistry.svg",
  Physics: "/tags/Physics.svg",
  Biology: "/tags/Biology.svg",
  Medicine: "/tags/Medicine.svg",
  Economics: "/tags/Econ.svg",
  Business: "/tags/Business.svg",
};

export default function SubjectTag({ subject, onRemove }: SubjectTagProps) {
  const bgColor = SUBJECT_COLOUR[subject] || "bg-gray-200";
  const iconPath = SUBJECT_ICON_PATHS[subject];

  return (
    <div
      className={`group inline-flex items-center px-3 py-1.5 ${bgColor} 
        rounded-l-full rounded-tr-full rounded-br-sm shadow-sm border border-black/5 transition-all duration-200 ease-in-out`}
    >
      <span className="text-[11px] sm:text-xs font-space-grotesk font-semibold text-black tracking-wide whitespace-nowrap">
        {subject}
      </span>

      <div className="flex items-center ml-2">
        <img
          src={iconPath}
          alt={`${subject} icon`}
          className="w-4 h-4 shrink-0 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* The X button now takes up absolutely 0px space until hovered */}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="flex h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-1.5 items-center justify-center rounded-full bg-black/5 text-black/60 transition-all duration-200 ease-in-out hover:bg-black/20 hover:text-black focus:outline-none overflow-hidden shrink-0"
            aria-label={`Remove ${subject}`}
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="shrink-0"
            >
              <path d="M1 1l12 12m0-12L1 13" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
