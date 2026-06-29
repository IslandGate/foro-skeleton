"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Interactive Checkbox
function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="flex w-full items-center justify-between py-1.5 px-2 -mx-2 cursor-pointer hover:bg-black/5 rounded-md transition-all text-left focus:outline-none group"
      type="button"
    >
      <span className="text-[12px] font-medium text-black truncate pr-2">{label}</span>
      <div className={`relative h-5 w-5 shrink-0 rounded-sm border-2 border-black transition-colors duration-200 ${checked ? 'bg-black' : 'bg-transparent'}`}>
        {checked && (
          // TODO: can someone change this svg into Image tag from next.js, turn the svg code into a .svg file first.
          <motion.svg 
            viewBox="0 0 20 20" 
            fill="none" 
            className="h-full w-full text-cream absolute inset-0"
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
                pathLength: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } 
              }} 
            />
          </motion.svg>
        )}
      </div>
    </button>
  );
}

export interface FilterState {
  subjects: string[];
  location: string;
  prizes: string[];
  groupTypes: string[]; // for Individual and Duo
  teamSize: number | null; // for the exact team number search
}

interface FilterProps {
  isOpen: boolean;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const SUBJECTS = ["Chemistry", "Physics", "Maths", "Environmental Science", "Computer Science", "Economics", "Biology"];
const PRIZES = ["Cash", "Certificate", "Scholarship"];
const GROUPS = ["Individual", "Duo (2 members)"];

export default function Filter({ isOpen, filters, setFilters }: FilterProps) {
  
  const toggleArrayItem = (key: keyof FilterState, item: string) => {
    setFilters((prev) => {
      const currentArray = prev[key] as string[];
      return {
        ...prev,
        [key]: currentArray.includes(item)
          ? currentArray.filter((i) => i !== item)
          : [...currentArray, item],
      };
    });
  };

  const prevSize = useRef(filters.teamSize);
  // direction is 1 (up). If smaller, direction is -1 (down).
  const direction = (filters.teamSize || 0) > (prevSize.current || 0) ? 1 : -1;

  useEffect(() => {
    prevSize.current = filters.teamSize;
  }, [filters.teamSize]);

  // when increasing (1), it drops from top (-15). When decreasing (-1), it slides from bottom (15).
  const numberVariants = {
    initial: (dir: number) => ({ 
      y: dir === 1 ? -10 : 10, 
      opacity: 0, 
      filter: "blur(1px)" 
    }),
    animate: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)" 
    },
    // The old number gets pushed out the opposite way
    exit: (dir: number) => ({ 
      y: dir === 1 ? 10 : -10, 
      opacity: 0, 
      filter: "blur(1px)" 
    }),
  };

  // Make sure you have useState imported!
const [isShaking, setIsShaking] = useState(false);

const triggerShake = () => {
  setIsShaking(true);
  // reset shake after to use again.
  setTimeout(() => setIsShaking(false), 300); 
};

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0, marginBottom: 0 }}
          animate={{ 
            height: "auto", 
            opacity: 1, 
            marginBottom: 24,
          }}
          exit={{ 
            height: 0, 
            opacity: 0, 
            marginBottom: 0 
          }}
          transition={{ 
            height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
            opacity: { duration: 0.2 } 
          }}
          className="overflow-hidden w-full bg-cream border border-black/30 rounded-xl"
        >
          <section className="flex flex-col gap-3 p-6 w-full">
            <div className="flex flex-wrap items-start gap-6">
              
              {/* subjects */}
              <div className="flex min-w-45 max-w-60 flex-1 flex-col px-2">
                <p className="h-10 font-medium text-12 leading-10 text-black">Subject</p>
                <div className="h-px w-full bg-black/60 mb-2" />
                <div className="flex flex-col px-2 pt-2 max-h-40 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.2)_transparent] pr-1">
                  {SUBJECTS.map((opt) => (
                    <Checkbox key={opt} checked={filters.subjects.includes(opt)} onChange={() => toggleArrayItem("subjects", opt)} label={opt} />
                  ))}
                </div>
              </div>

              {/* location (typed) */}
              <div className="flex min-w-45 max-w-60 flex-1 flex-col px-2">
                <p className="h-10 font-medium text-12 leading-10 text-black">Location</p>
                <div className="h-px w-full bg-black/60 mb-2" />
                <div className="flex flex-col px-2 pt-2">
                  <input
                    type="text"
                    placeholder="Search location (e.g. Online)"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full bg-transparent border-b border-black/40 text-[12px] py-1 text-black placeholder:text-gray-500 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* prize type */}
              <div className="flex min-w-45 max-w-60 flex-1 flex-col px-2">
                <p className="h-10 font-medium text-12 leading-10 text-black">Prize</p>
                <div className="h-px w-full bg-black/60 mb-2" />
                <div className="flex flex-col px-2 pt-2">
                  {PRIZES.map((opt) => (
                    <Checkbox key={opt} checked={filters.prizes.includes(opt)} onChange={() => toggleArrayItem("prizes", opt)} label={opt} />
                  ))}
                </div>
              </div>

              {/* group size */}
              <div className="flex min-w-45 max-w-60 flex-1 flex-col px-2">
                <p className="h-10 font-medium text-12 leading-10 text-black">Group Size</p>
                <div className="h-px w-full bg-black/60 mb-2" />
                <div className="flex flex-col px-2 pt-2">
                  {GROUPS.map((opt) => (
                    <Checkbox key={opt} checked={filters.groupTypes.includes(opt)} onChange={() => toggleArrayItem("groupTypes", opt)} label={opt} />
                  ))}
                  
                  {/* value input */}
                  <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-[12px] font-medium text-black truncate pr-2">Team size:</span>
                    <div className="flex items-center border-b border-black/40 transition-colors focus-within:border-black">
                      <div className="relative w-8 flex items-center justify-center overflow-hidden">
                        
                        {/* shake */}
                        <motion.div
                          animate={isShaking ? { y: [0, -3, 0] } : { y: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          {/* odometer */}
                          <AnimatePresence mode="popLayout" custom={direction}>
                            <motion.span
                              key={filters.teamSize || "empty"}
                              custom={direction}
                              variants={numberVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ type: "spring", stiffness: 450, damping: 30 }}
                              className={`text-[12px] ${filters.teamSize === null ? 'text-black/40' : 'text-black'}`}
                            >
                              {filters.teamSize || "#"}
                            </motion.span>
                          </AnimatePresence>
                        </motion.div>

                        {/* input */}
                        <input
                          type="number"
                          min="3"
                          value={filters.teamSize || ""}
                          onChange={(e) => setFilters(prev => ({ ...prev, teamSize: e.target.value ? parseInt(e.target.value) : null }))}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              if (filters.teamSize === 3) {
                                e.preventDefault();
                                setFilters(prev => ({ ...prev, teamSize: null })); 
                              } else if (filters.teamSize === null) {
                                e.preventDefault();
                                triggerShake();
                              }
                            } else if (e.key === "ArrowUp") {
                              if (filters.teamSize === null) {
                                e.preventDefault();
                                setFilters(prev => ({ ...prev, teamSize: 3 }));
                              }
                            }
                          }}
                          className="w-full relative z-10 bg-transparent text-transparent caret-black text-[12px] py-1 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      {/* arrows */}
                      <div className="flex flex-col justify-center pl-1 relative z-10">
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setFilters(prev => ({ 
                            ...prev, 
                            teamSize: prev.teamSize ? prev.teamSize + 1 : 3 
                          }))}
                          className="flex h-3 w-4 items-center justify-center text-black/40 hover:text-black transition-colors focus:outline-none pb-px"
                        >
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 15l-6-6-6 6"/>
                          </svg>
                        </motion.button>

                        <motion.button
                          type="button"
                          onClick={() => {
                            if (filters.teamSize === null) {
                              triggerShake();
                            } else {
                              setFilters(prev => ({ 
                                ...prev, 
                                teamSize: prev.teamSize && prev.teamSize > 3 ? prev.teamSize - 1 : null 
                              }));
                            }
                          }}
                          className="flex h-3 w-4 items-center justify-center text-black/40 hover:text-black transition-colors focus:outline-none pt-px"
                        >
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6"/>
                          </svg>
                        </motion.button>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}