"use client";
import React from "react";
import Image from "next/image";

export interface ProfilePreviewProps {
  firstName?: string;
  surname?: string;
  username?: string;
  email?: string;
  age?: number | null;
  grade?: string;
  profileImageUrl?: string | null;
}

export default function ProfilePreview({
  firstName = "First Name",
  surname = "Surname",
  username = "username",
  email = "hello@example.com",
  age = null,
  grade = "Grade",
  profileImageUrl = null,
}: ProfilePreviewProps) {
  
  // combine names for display, fallback to a placeholder if empty
  const displayName = firstName || surname ? `${firstName} ${surname}`.trim() : "Your Name";

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8 select-none">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Profile Preview
      </h2>

      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        
        {/* profile image */}
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-800 bg-[#D4D4D4]">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt={`${username}'s profile picture`}
              fill
              className="object-cover"
              sizes="112px"
            />
          ) : (
            // Fallback placeholder icon
            <svg 
              className="h-12 w-12 text-gray-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          )}
        </div>

        {/* profile details */}
        <div className="flex flex-col gap-1">
          <span className="font-space-grotesk text-2xl font-semibold text-gray-900">
            {displayName}
          </span>
          <span className="font-space-grotesk text-lg text-gray-600">
            @{username || "username"}
          </span>
          
          {/* info Badges (Only show if data exists) */}
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {email && (
              <span className="inline-flex items-center rounded-md border border-gray-300 bg-black/5 px-2.5 py-1 font-space-grotesk text-sm text-gray-800">
                {email}
              </span>
            )}
            {age && (
              <span className="inline-flex items-center rounded-md border border-gray-300 bg-black/5 px-2.5 py-1 font-space-grotesk text-sm text-gray-800">
                {age} years old
              </span>
            )}
            {grade && (
              <span className="inline-flex items-center rounded-md border border-gray-300 bg-black/5 px-2.5 py-1 font-space-grotesk text-sm text-gray-800">
                {grade}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}