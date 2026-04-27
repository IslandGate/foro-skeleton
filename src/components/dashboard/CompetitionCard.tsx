// CompetitionCard.tsx
import Image from "next/image";
import SubjectTag, { type SubjectName } from "./SubjectTag";
import { Button } from "@/components/Button";
// 1. Updated Interfaces
export interface CompetitionCardData {
  title: string;
  image: string;
  tags: string[];
  subjects: SubjectName[];
  location: string;
  prizeType: string;
  winRate: string;
  format: string;
  information: string;
  studentsCount: number;
  spotsRemaining: string;
}

const AVATAR_COLORS = ["#60a5fa", "#f472b6", "#4ade80"]; //temp

const LocationPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-gray-400 shrink-0"
    aria-hidden="true"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

interface CompetitionCardProps {
  data: CompetitionCardData;
  rotation?: number;
}

export default function CompetitionCard({ data, rotation = 0 }: CompetitionCardProps) {
   if (!data) {
     return null;
   }
  
  return (
    <article
      className="w-full flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer origin-center"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Responsive Image Header */}
      <div className="relative w-full aspect-[3/2] bg-gray-100">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] sm:text-[11px] font-space-grotesk font-bold px-2 py-1 rounded-md leading-none border ${
                  tag === "Popular"
                    ? "bg-rose-50 text-rose-600 border-rose-100"
                    : "bg-blue-50 text-blue-600 border-blue-100"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* TODO: implement with proper svg icon sourcing from server. */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div
                className="w-5.5 h-5.5 rounded-full bg-white border border-gray-200 shadow-sm
                  flex items-center justify-center text-[10px] font-extrabold text-blue-500 z-10"
              >
                G
              </div>
              <div
                className="w-5.5 h-5.5 rounded-full border border-gray-200 bg-red-600 shadow-sm
                  flex items-center justify-center text-[7px] font-extrabold text-white leading-none z-0"
              >
                VEX
              </div>
            </div>
            <span className="text-[11px] font-space-grotesk text-gray-400 font-semibold">25+</span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3 className="font-garamond text-lg sm:text-xl font-bold leading-tight text-gray-900 line-clamp-2">
            {data.title}
          </h3>

            {/* TODO add svg of the icons here. */}
            {/* note that we can't import from file becasue we need it to change colour, if someone has a better solution please change. */}
          <div className="flex gap-2.5 shrink-0 mt-1 text-gray-400">
              <button aria-label="Add to wishlist" className="hover:text-amber-400 transition-colors">
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
              </button>

              <button aria-label="Save competition" className="hover:text-blue-500 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              {/* Share Icon */}
              <button aria-label="Share competition" className="hover:text-gray-800 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        {/* subject tags */}
        <div className="flex gap-2 flex-wrap">
          {data.subjects.map((subjectName) => (
            <SubjectTag key={subjectName} subject={subjectName} />
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5">
          <LocationPinIcon />
          <span className="text-[12px] font-space-grotesk font-medium text-gray-500">
            {data.location}
          </span>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5 mt-0">
          <p className="text-[11px] sm:text-xs font-space-grotesk text-gray-600 leading-snug">
            <span className="font-bold text-gray-800">Prize Type:</span> {data.prizeType}
          </p>
          <p className="text-[11px] sm:text-xs font-space-grotesk text-gray-600 leading-snug">
            <span className="font-bold text-gray-800">Win rate:</span> {data.winRate}
          </p>
          <p className="text-[11px] sm:text-xs font-space-grotesk text-gray-600 leading-snug">
            <span className="font-bold text-gray-800">Format:</span> {data.format}
          </p>
        </div>

        {/* Info Paragraph */}
        <div className="mt-0.5">
          <p className="text-[11px] sm:text-xs font-space-grotesk font-bold text-gray-800 underline underline-offset-2 mb-1.5">
            Information:
          </p>
          <p className="text-[11px] sm:text-xs font-space-grotesk text-gray-500 leading-relaxed line-clamp-3">
            {data.information}
          </p>
        </div>

        <div className="border-t border-gray-100 my-0.5" />

        {/* TODO: implement with proper svg icon sourcing from server. */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {AVATAR_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] font-space-grotesk text-gray-500 font-semibold">
              {data.studentsCount}+ Students Registered!
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-space-grotesk text-gray-500 font-semibold">
            {data.spotsRemaining} Spots Remaining
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-1">
          <Button
            bg="white"
            size="sm"
            className="flex-1 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
          >
            More Info
          </Button>
          
          <Button
            bg="success"
            size="sm"
            className="flex-1 hover:bg-[#66ae71] shadow-sm"
          >
            Register
          </Button>
        </div>
      </div>
    </article>
  );
}