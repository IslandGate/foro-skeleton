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
}

const SUBJECT_COLOUR: Record<SubjectName, string> = {
  Maths: "bg-[#a1b866]",
  Engineering: "bg-[#f59e42]",
  Chemistry: "bg-[#ef4a60]",
  Physics: "bg-[#5bc0eb]",
  Biology: "bg-[#66c25e]",
  Medicine: "bg-white",
  Economics: "bg-amber",
  Business: "bg-blue"
};

// 1. Create a dictionary mapping subjects to their file paths
// Note: Files in the "public" folder are served from the root "/"
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

export default function SubjectTag({ subject }: SubjectTagProps) {
  const bgColor = SUBJECT_COLOUR[subject] || "bg-gray-200";
  const iconPath = SUBJECT_ICON_PATHS[subject];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 ${bgColor} 
        rounded-l-full rounded-tr-full rounded-br-sm shadow-sm border border-black/5`}
    >
      <span className="text-[11px] sm:text-xs font-space-grotesk font-semibold text-black tracking-wide">
        {subject}
      </span>
      
      <img 
        src={iconPath} 
        alt={`${subject} icon`} 
        className="w-4 h-4 shrink-0" 
      />
    </div>
  );
}