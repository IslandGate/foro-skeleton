"use client";

import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  hasIcon?: boolean;
}

export function StatCard({ value, label, hasIcon = false }: StatCardProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center leading-none">
        <span className="font-garamond text-6xl text-black sm:text-5xl md:text-6xl lg:text-8xl flex items-center">
          {value}
          {hasIcon && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 h-[0.5em] w-[0.5em] text-black md:ml-2"
              aria-hidden="true"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}
        </span>
      </div>

      <p className="font-garamond text-xl font-medium text-black sm:text-2xl md:text-3xl lg:text-4xl max-w-70 md:max-w-none">
        {label}
      </p>
    </div>
  );
}