"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import SubjectTag, { type SubjectName } from "./SubjectTag";
import { Button } from "@/components/Button";
import Link from "next/link";
import CopyToClipboardPopup from "./CopyToClipboardPopup";
import { createPortal } from "react-dom";
import { useConfetti } from "@/hooks/useConfetti";



export type BadgeTag = "Popular" | "Elite" | "New" | "Tech" | "Math" | "Science" | "Humanities" | "Research" | "Medical" | "Finance" | "High-Stakes"; // change to actual tags cuz im just copying whatever the dummy data says this makes no sense irl
export type DateString = `${number}-${number}-${number}`;
export type PrizeType = `$${string} Cash` | "Certificate" | "Scholarship";
export type GroupType = "Individual" | "Duo (2 members)" | `Team (${number}-${number} members)`;

export interface CompetitionCardData {
  title: string;
  image: string;
  tags: BadgeTag[]; // unstandarized, what badges are we taking? implement that into filter later.
  subjects: SubjectName[];
  registerDeadline: DateString;
  location: string;
  prizeType: PrizeType;
  groupSize: GroupType;
  information: string;
  studentsCount: number;
  competitionWebsite: string; 
}

interface CompetitionCardProps {
  data: CompetitionCardData;
  rotation?: number;
}

// temp colours for footer avatars
const AVATAR_COLORS = ["#60a5fa", "#f472b6", "#4ade80"];



export default function CompetitionCard({ data, rotation = 0 }: CompetitionCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const triggerConfetti = useConfetti({ particleCount: 150, spread: 60 });

  if (!data) return null;

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowPopup(true);
      triggerConfetti(shareButtonRef.current || undefined);
      setTimeout(() => setShowPopup(false), 4000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <article
      className="flex w-full origin-center cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ transform: `rotate(${rotation}deg)` }} // what are we sing rotation for?
    >
      <div className="relative aspect-[3/2] w-full bg-gray-100">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        {/* badgest at the top*/}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-md border px-2 py-1 font-space-grotesk text-[10px] font-bold leading-none sm:text-[11px] ${
                  tag === "Popular" || tag === "Elite" || tag === "New"
                    ? "border-rose-100 bg-rose-50 text-rose-600"
                    : "border-blue-100 bg-blue-50 text-blue-600"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* TEMP organizer tags, we need to change this to accept an array of organizers from server*/}
          {/* <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div className="z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full border border-gray-200 bg-white text-[10px] font-extrabold text-blue-500 shadow-sm">
                G
              </div>
              <div className="z-0 flex h-5.5 w-5.5 items-center justify-center rounded-full border border-gray-200 bg-red-600 text-[7px] font-extrabold leading-none text-white shadow-sm">
                VEX
              </div>
            </div>
              <span className="font-space-grotesk text-[11px] font-semibold text-gray-400">
                25+
              </span>
            </div> */}
        </div>

        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 font-garamond text-lg font-bold leading-tight text-gray-900 sm:text-xl">
            {data.title}
          </h3>

          {/* TEMP we need these to actually do something as buttons. */}
          <div className="mt-1 flex shrink-0 gap-2.5 text-gray-400">
            {/* <button aria-label="Add to wishlist" className="transition-colors hover:text-amber-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path 
                    d="M2.33496 10.3368C2.02171 10.0471 2.19187 9.52339 2.61557 9.47316L8.61914 8.76107C8.79182 8.74059 8.94181 8.63215 9.01465 8.47425L11.5469 2.98446C11.7256 2.59703 12.2764 2.59695 12.4551 2.98439L14.9873 8.47413C15.0601 8.63204 15.2092 8.74077 15.3818 8.76124L21.3857 9.47316C21.8094 9.52339 21.9791 10.0472 21.6659 10.3369L17.2278 14.4419C17.1001 14.56 17.0433 14.7357 17.0771 14.9063L18.255 20.8359C18.3382 21.2544 17.8928 21.5787 17.5205 21.3703L12.2451 18.4166C12.0934 18.3317 11.9091 18.3321 11.7573 18.417L6.48144 21.3695C6.10913 21.5779 5.66294 21.2544 5.74609 20.8359L6.92414 14.9066C6.95803 14.7361 6.90134 14.5599 6.77367 14.4419L2.33496 10.3368Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button> */}
            <button
              onClick={handleSave}
              aria-label={isSaved ? "Unsave competition" : "Save competition"}
              className={`transition-all duration-200 ${
                isSaved ? "text-blue-600" : "text-gray-400 hover:text-blue-500"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isSaved ? "currentColor" : "none"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              ref={shareButtonRef}
              onClick={() => handleCopy(data.competitionWebsite)}
              aria-label="Share competition"
              className="transition-colors hover:text-gray-800 confetti-button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 18.5088C1 13.1679 4.90169 8.77098 9.99995 7.84598V5.51119C9.99995 3.63887 12.1534 2.58563 13.6313 3.73514L21.9742 10.224C23.1323 11.1248 23.1324 12.8752 21.9742 13.7761L13.6314 20.2649C12.1534 21.4144 10 20.3612 10 18.4888V16.5189C7.74106 16.9525 5.9625 18.1157 4.92778 19.6838C4.33222 20.5863 3.30568 20.7735 2.55965 20.5635C1.80473 20.3511 1.00011 19.6306 1 18.5088ZM12.4034 5.31385C12.2392 5.18613 11.9999 5.30315 11.9999 5.51119V9.41672C11.9999 9.55479 11.8873 9.66637 11.7493 9.67008C8.09094 9.76836 4.97774 12.0115 3.66558 15.1656C3.46812 15.6402 3.31145 16.1354 3.19984 16.6471C3.07554 17.217 3.00713 17.8072 3.00053 18.412C3.00018 18.4442 3 18.4765 3 18.5088C3.00001 18.6437 3.18418 18.6948 3.25846 18.5822C3.27467 18.5577 3.29101 18.5332 3.30747 18.5088C3.30748 18.5088 3.30746 18.5088 3.30747 18.5088C3.63446 18.0244 4.01059 17.5765 4.42994 17.168C4.71487 16.8905 5.01975 16.6313 5.34276 16.3912C7.05882 15.1158 9.28642 14.3823 11.7496 14.3357C11.8877 14.3331 12 14.4453 12 14.5834V18.4888C12 18.6969 12.2393 18.8139 12.4035 18.6862L20.7463 12.1973C20.875 12.0973 20.875 11.9028 20.7463 11.8027L12.4034 5.31385Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Subject Tags */}
        <div className="flex flex-wrap gap-2">
          {data.subjects.map((subjectName) => (
            <SubjectTag key={subjectName} subject={subjectName} />
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5">
          <Image
            src="/dashboard-assets/location-icon.svg"
            width={12}
            height={12}
            alt="location-icon"
            className="h-auto w-3"
          />
          <span className="font-space-grotesk text-[12px] font-medium text-gray-500">
            {data.location}
          </span>
        </div>

        {/* Description Details */}
        <div className="mt-0 flex flex-col gap-1.5">
          <p className="font-space-grotesk text-[11px] leading-snug text-gray-600 sm:text-xs">
            <span className="font-bold text-gray-800">Register Deadline:</span>{" "}
            {data.registerDeadline}
          </p>
          <p className="font-space-grotesk text-[11px] leading-snug text-gray-600 sm:text-xs">
            <span className="font-bold text-gray-800">Prize Type:</span>{" "}
            {data.prizeType}
          </p>
          <p className="font-space-grotesk text-[11px] leading-snug text-gray-600 sm:text-xs">
            <span className="font-bold text-gray-800">Format:</span>{" "}
            {data.groupSize}
          </p>
        </div>

        {/* Info Paragraph */}
        <div className="mt-0.5">
          <p className="mb-1.5 font-space-grotesk text-[11px] font-bold text-gray-800 underline underline-offset-2 sm:text-xs">
            Information:
          </p>
          <p className="line-clamp-3 font-space-grotesk text-[11px] leading-relaxed text-gray-500 sm:text-xs">
            {data.information}
          </p>
        </div>

        <div className="my-0.5 border-t border-gray-100" />

        {/* TODO: footer becomes responsive to server. */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {AVATAR_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="font-space-grotesk text-[10px] font-semibold text-gray-500 sm:text-[11px]">
              {data.studentsCount}+ Students registered on Il Foro!
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-1 flex gap-2.5">
          <Button
            bg="success"
            size="sm"
            className="flex-1 shadow-sm hover:bg-[#66ae71]"
          >
            <Link href={data.competitionWebsite}>Register</Link>
          </Button>
        </div>
      </div>
      {showPopup &&
        createPortal(
          <CopyToClipboardPopup onClose={() => setShowPopup(false)} />,
          document.body,
        )}
    </article>
  );
}