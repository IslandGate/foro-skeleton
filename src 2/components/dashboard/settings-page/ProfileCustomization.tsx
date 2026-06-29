"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProfileCustomizationProps {
  initialFirstName?: string;
  initialSurname?: string;
  initialUsername?: string;
  initialAge?: number | null;
  initialEmail?: string;
  initialGrade?: string;
}

const GRADE_OPTIONS = [
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

export default function ProfileCustomization({
  initialFirstName = "",
  initialSurname = "",
  initialUsername = "",
  initialAge = null,
  initialEmail = "",
  initialGrade = "",
}: ProfileCustomizationProps) {
  
  const [firstName, setFirstName] = useState(initialFirstName);
  const [surname, setSurname] = useState(initialSurname);
  const [username, setUsername] = useState(initialUsername);
  const [age, setAge] = useState<number | null>(initialAge);
  const [email, setEmail] = useState(initialEmail);
  const [grade, setGrade] = useState(initialGrade);

  const [isShaking, setIsShaking] = useState(false);
  const prevAge = useRef<number | null>(age);
  const direction = (age || 0) > (prevAge.current || 0) ? 1 : -1;

  useEffect(() => {
    prevAge.current = age;
  }, [age]);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  };

  const numberVariants = {
    initial: (dir: number) => ({ 
      y: dir === 1 ? -12 : 12, 
      opacity: 0, 
      filter: "blur(1px)" 
    }),
    animate: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)" 
    },
    exit: (dir: number) => ({ 
      y: dir === 1 ? 12 : -12, 
      opacity: 0, 
      filter: "blur(1px)" 
    }),
  };

  const inputClass =
    "w-full rounded-lg border border-gray-800 bg-cream px-4 py-3 font-space-grotesk text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400";

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8 select-none">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Profile Customisation
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* First Name */}
        <label className="flex flex-col gap-1.5">
          <span className="font-space-grotesk text-sm font-medium text-gray-900">
            Name
          </span>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />
        </label>

        {/* Surname */}
        <label className="flex flex-col gap-1.5 sm:mt-6">
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={inputClass}
          />
        </label>

        {/* Username */}
        <label className="flex flex-col gap-1.5">
          <span className="font-space-grotesk text-sm font-medium text-gray-900">
            Username
          </span>
          <input
            type="text"
            placeholder="My username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
          />
        </label>

        {/* Age */}
        <label className="flex flex-col gap-1.5">
          <span className="font-space-grotesk text-sm font-medium text-gray-900">
            Age
          </span>
          <div className={`${inputClass} flex items-center justify-between relative`}>
            
            <div className="relative flex-1 h-6 flex items-center overflow-hidden">
              <motion.div
                animate={isShaking ? { y: [0, -3, 3, -3, 0] } : { y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
              >
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.span
                    key={age || "empty"}
                    custom={direction}
                    variants={numberVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className={`font-space-grotesk text-base ${age === null ? 'text-gray-500' : 'text-gray-900'}`}
                  >
                    {age || "Age"}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              <input
                type="number"
                value={age || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  
                  // Allows backspacing down to an empty string to instantly reset to "Age"
                  if (rawValue === "") {
                    setAge(null);
                    return;
                  }

                  const val = parseInt(rawValue, 10);
                  
                  // Allows typing intermediate single digits (< 10) but prevents exploding past 120
                  if (!isNaN(val) && val <= 120) {
                    setAge(val);
                  } else {
                    triggerShake();
                  }
                }}
                onBlur={() => {
                  // Fallback: If they click away while the number is incomplete (less than 10), clear it out
                  if (age !== null && age < 10) {
                    triggerShake();
                    setAge(null);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    if (age === 10) {
                      e.preventDefault();
                      setAge(null);
                    } else if (age === null) {
                      e.preventDefault();
                      triggerShake();
                    }
                  } else if (e.key === "ArrowUp") {
                    if (age === null) {
                      e.preventDefault();
                      setAge(10);
                    }
                  }
                }}
                className="w-full h-full bg-transparent text-transparent caret-gray-900 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="flex flex-col justify-center pl-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={() => setAge((prev) => (prev === null ? 10 : Math.min(120, prev + 1)))}
                className="flex h-3.5 w-4 items-center justify-center text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15l-6-6-6 6"/>
                </svg>
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                  if (age === null) {
                    triggerShake();
                  } else if (age === 10) {
                    setAge(null);
                  } else {
                    setAge((prev) => (prev ? prev - 1 : null));
                  }
                }}
                className="flex h-3.5 w-4 items-center justify-center text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </motion.button>
            </div>
          </div>
        </label>

        {/* Email */}
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="font-space-grotesk text-sm font-medium text-gray-900">
            Email Address
          </span>
          <input
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      {/* Grade Selector */}
      <label className="mt-6 flex flex-col gap-1.5">
        <span className="font-space-grotesk text-sm font-medium text-gray-900">
          Grade
        </span>
        <div className="relative w-full">
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className={`${inputClass} appearance-none pr-10`}
          >
            <option value="" disabled>
              My grade
            </option>
            {GRADE_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-800">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
}