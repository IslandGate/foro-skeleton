"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export interface ProfilePreviewProps {
  firstName?: string;
  surname?: string;
  username?: string;
  email?: string;
  age?: number | null;
  grade?: string;
  profileImageUrl?: string | null;
  // New prop to send the selected file to your parent component
  onImageChange?: (file: File) => void;
}

export default function ProfilePreview({
  firstName = "First Name",
  surname = "Surname",
  username = "username",
  email = "hello@example.com",
  age = null,
  grade = "Grade",
  profileImageUrl = null,
  onImageChange,
}: ProfilePreviewProps) {
  // combine names for display, fallback to a placeholder if empty
  const displayName =
    firstName || surname ? `${firstName} ${surname}`.trim() : "Your Name";

  // State for instant image preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(profileImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep preview in sync if the prop changes from the outside
  useEffect(() => {
    setPreviewUrl(profileImageUrl);
  }, [profileImageUrl]);

  const handleImageClick = () => {
    // Trigger the hidden file input when the image is clicked
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a temporary local URL to instantly show the selected image
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Pass the actual file to the parent component for uploading
      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-cream p-8 select-none">
      <h2 className="mb-8 font-garamond text-3xl font-bold text-black sm:text-4xl">
        Profile Preview
      </h2>

      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {/* Profile image with hover state and click handler */}
        <div
          onClick={handleImageClick}
          className="group relative flex h-28 w-28 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-800 bg-[#D4D4D4] transition-all hover:ring-2 hover:ring-gray-400"
        >
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*" // Only allow image files
            className="hidden"
          />

          {previewUrl ? (
            <Image
              src={previewUrl}
              alt={`${username}'s profile picture`}
              fill
              className="object-cover transition-opacity group-hover:opacity-50"
              sizes="112px"
            />
          ) : (
            <svg
              className="h-12 w-12 text-gray-500 transition-opacity group-hover:opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          )}

          {/* Hover overlay text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-xs font-medium text-white shadow-sm">
              Change
            </span>
          </div>
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
