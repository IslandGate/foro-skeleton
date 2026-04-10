import Image from "next/image";

interface SubjectTag {
  name: string;
  variant: "grey" | "teal";
}

interface CompetitionCardData {
  title: string;
  image: string;
  tags: string[];
  subjects: SubjectTag[];
  location: string;
  prizeType: string;
  winRate: string;
  format: string;
  information: string;
  studentsCount: number;
  spotsRemaining: string;
}

const MOCK_COMPETITION: CompetitionCardData = {
  title: "VEX® Robotics Competition",
  image: "/images/competition-photo.png",
  tags: ["Popular", "New"],
  subjects: [
    { name: "Maths", variant: "grey" },
    { name: "Engineering", variant: "teal" },
  ],
  location: "Hong Kong, Worldwide",
  prizeType: "Lorem Ipsum",
  winRate: "50/12313, +20% - (2024)",
  format: "Individual, Team - Must be from the same school or organisation.",
  information: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."`,
  studentsCount: 55,
  spotsRemaining: "25/300",
};

const AVATAR_COLORS = ["#60a5fa", "#f472b6", "#4ade80"];

const LocationPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-gray-500 shrink-0"
    aria-hidden="true"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

interface CompetitionCardProps {
  rotation?: number;
}

export default function CompetitionCard({ rotation = 0 }: CompetitionCardProps) {
  const card = MOCK_COMPETITION;

  return (
    <article
      className="w-[325px] shrink-0 rounded-[6px] border border-black/15 bg-white overflow-hidden
        transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer origin-center"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Card Image */}
      <div className="relative h-[208px] w-full">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
          sizes="325px"
        />
      </div>

      {/* Card Body */}
      <div className="px-3.5 pt-3 pb-3 flex flex-col gap-[5.6px]">

        {/* Tags + Sponsor logos */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[7.5px] font-space-grotesk font-bold px-2 py-[1.5px] rounded-sm leading-none ${
                  tag === "Popular"
                    ? "bg-orange-50 text-orange-600 border border-orange-200"
                    : "bg-green-50 text-green-600 border border-green-200"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              <div
                className="w-[18px] h-[18px] rounded-full bg-white border-2 border-gray-100
                  flex items-center justify-center text-[6px] font-extrabold"
                style={{ color: "#4285F4" }}
                aria-label="Google"
              >
                G
              </div>
              <div
                className="w-[18px] h-[18px] rounded-full border-2 border-gray-100
                  flex items-center justify-center text-[5px] font-extrabold text-white leading-none"
                style={{ backgroundColor: "#C53F3F" }}
                aria-label="VEX"
              >
                VEX
              </div>
            </div>
            <span className="text-[9px] font-space-grotesk text-gray-500 font-medium">25+</span>
          </div>
        </div>

        {/* Title + Action Icons */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-garamond text-[13.5px] font-bold leading-tight text-black">
            {card.title}
          </h3>
          <div className="flex gap-1.5 shrink-0 mt-0.5 text-gray-400">
            <button
              aria-label="Add to wishlist"
              className="leading-none text-[10px] hover:text-amber-400 transition-colors"
            >
              ☆
            </button>
            <button
              aria-label="Save competition"
              className="leading-none text-[10px] hover:text-blue-400 transition-colors"
            >
              ⊡
            </button>
            <button
              aria-label="Share competition"
              className="leading-none text-[10px] hover:text-gray-700 transition-colors"
            >
              ↗
            </button>
          </div>
        </div>

        {/* Subject Tags */}
        <div className="flex gap-1.5 flex-wrap">
          {card.subjects.map(({ name, variant }) => (
            <span
              key={name}
              className={`inline-flex items-center gap-0.5 text-[7.5px] font-space-grotesk font-medium px-2 py-[1.5px] rounded-[3px] ${
                variant === "grey"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-teal-50 text-teal-700 border border-teal-200"
              }`}
            >
              {name}
              <span className="text-[7px]" aria-hidden="true">
                {variant === "grey" ? " ✓" : " 🔧"}
              </span>
            </span>
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1">
          <LocationPinIcon />
          <span className="text-[8.5px] font-space-grotesk text-gray-700">
            {card.location}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-[2px]">
          <p className="text-[8px] font-space-grotesk text-gray-800 leading-snug">
            <span className="font-semibold">Prizetype :</span> {card.prizeType}
          </p>
          <p className="text-[8px] font-space-grotesk text-gray-800 leading-snug">
            <span className="font-semibold">Win rate:</span> {card.winRate}
          </p>
          <p className="text-[8px] font-space-grotesk text-gray-800 leading-snug">
            <span className="font-semibold">Format :</span> {card.format}
          </p>
        </div>

        {/* Information */}
        <div>
          <p className="text-[8px] font-space-grotesk font-semibold underline underline-offset-1 mb-[2px]">
            Information :
          </p>
          <p className="text-[7.5px] font-space-grotesk text-gray-600 leading-snug line-clamp-3">
            {card.information}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Footer: Avatars + Spots */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5" aria-hidden="true">
              {AVATAR_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-white"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-[6.8px] font-space-grotesk text-gray-600 font-medium">
              {card.studentsCount}+ Student&apos;s Registered!
            </span>
          </div>
          <span className="text-[6.8px] font-space-grotesk text-gray-600 font-medium">
            {card.spotsRemaining} Spot&apos;s Remaining
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[5.6px]">
          <button
            className="flex-1 py-[5px] text-[7.9px] font-space-grotesk font-bold text-[#393939]
              bg-gray-50 border border-gray-200 rounded-[5px] hover:bg-gray-100 transition-colors"
            aria-label={`More info about ${card.title}`}
          >
            More Info
          </button>
          <button
            className="flex-1 py-[5px] text-[7.9px] font-space-grotesk font-bold text-[#393939]
              rounded-[5px] transition-opacity hover:opacity-90"
            style={{ backgroundColor: "rgb(49 159 67 / 0.70)" }}
            aria-label={`Register for ${card.title}`}
          >
            Register
          </button>
        </div>

      </div>
    </article>
  );
}
