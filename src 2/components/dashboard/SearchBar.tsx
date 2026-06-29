"use client";
import React from "react";

interface SearchBarProps {
  isFilterOpen: boolean;
  toggleFilter: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ isFilterOpen, toggleFilter, searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex w-full gap-4 mb-6 items-center">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
          {/* TODO: can someone change this svg into Image tag from next.js, turn the svg code into a .svg file first. */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className="w-full bg-white border border-black text-gray-900 font-bold text-md font-space-grotesk px-4 py-2.5 pl-11 focus:outline-none focus:ring-1 focus:ring-black transition-all rounded-lg placeholder:text-gray-400 placeholder:font-bold"
        />
      </div>

      <button
        type="button"
        className="flex items-center gap-2 px-6 py-3 bg-dark-cream border border-black text-black font-space-grotesk text-sm font-semibold hover:brightness-90 transition-all shrink-0 rounded-lg"
        onClick={toggleFilter}
      >
        <span>Filter</span>

        {/* TODO: can someone change this svg into Image tag from next.js, turn the svg code into a .svg file first. */}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-400 ${isFilterOpen ? "rotate-180 ease-out" : ""}`}
        >
          <path d="M4 6H20M7 12H17M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}