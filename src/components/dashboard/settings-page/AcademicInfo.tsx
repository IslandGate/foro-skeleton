"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubjectTag from "../SubjectTag"; // Adjust the dots depending on how deep the folder is

// --- Types & Constants ---
export type SubjectName =
  | "Maths"
  | "Engineering"
  | "Chemistry"
  | "Physics"
  | "Biology"
  | "Medicine"
  | "Economics"
  | "Business";

const ALL_SUBJECTS: SubjectName[] = [
  "Maths",
  "Engineering",
  "Chemistry",
  "Physics",
  "Biology",
  "Medicine",
  "Economics",
  "Business",
];

// --- Filter-Style Checkbox Component ---
function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="group flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-left transition-all hover:bg-black/5 focus:outline-none"
      type="button"
    >
      <span className="truncate pr-2 font-space-grotesk text-[13px] font-medium text-black">
        {label}
      </span>
      <div
        className={`relative h-5 w-5 shrink-0 rounded-sm border-2 border-black transition-colors duration-200 ${checked ? "bg-black" : "bg-transparent"}`}
      >
        {checked && (
          <motion.svg
            viewBox="0 0 20 20"
            fill="none"
            className="absolute inset-0 h-full w-full text-cream"
          >
            <motion.path
              d="M5 10.5L8.5 14L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              style={{ translateZ: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                pathLength: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
              }}
            />
          </motion.svg>
        )}
      </div>
    </button>
  );
}

// --- Main Component ---
export interface AcademicInfoProps {
  initialSubjects?: SubjectName[];
}

export default function AcademicInfo({
  initialSubjects = ["Engineering", "Maths"],
}: AcademicInfoProps) {
  const [selectedSubjects, setSelectedSubjects] =
    useState<SubjectName[]>(initialSubjects);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSubject = (subject: SubjectName) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );
  };

  return (
    <div className="mx-auto w-full max-w-6xl rounded-xl border border-gray-800 bg-cream p-8 select-none">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Academic Information
      </h2>

      <div className="mt-6 flex flex-col gap-2">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">
          Subjects and interests
        </span>

        {/* subject contiainer */}
        <div className="relative min-h-14 w-full rounded-lg border border-gray-800 bg-cream pr-14">
          <div className="flex flex-wrap items-center gap-2.5 p-3">
            <AnimatePresence mode="popLayout">
              {selectedSubjects.map((subject) => (
                <motion.div
                  key={subject}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                >
                  <SubjectTag
                    subject={subject}
                    onRemove={() => toggleSubject(subject)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {selectedSubjects.length === 0 && (
              <span className="ml-1 font-space-grotesk text-sm text-gray-500 absolute inset-y-0 left-4 flex items-center">
                No subjects selected
              </span>
            )}
          </div>

          {/* add button */}
          <div className="absolute right-3 top-3" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-label="Toggle subjects menu"
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xl text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                isDropdownOpen ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              +
            </button>

            {/* dropdown to select, matches filter btw */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-black/30 bg-cream shadow-xl"
                >
                  <div className="flex flex-col p-2 max-h-60 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.2)_transparent]">
                    {ALL_SUBJECTS.map((subject) => (
                      <Checkbox
                        key={subject}
                        checked={selectedSubjects.includes(subject)}
                        onChange={() => toggleSubject(subject)}
                        label={subject}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
