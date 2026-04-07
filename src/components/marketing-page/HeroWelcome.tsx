export interface HeroWelcomeProps {
  titleFirstLine?: string;
  titleSecondLine?: string;
  subtitle?: string;
  signUpHref?: string;
  logInHref?: string;
  linkedInHref?: string;
  instagramHref?: string;
}

const garamondStyle: React.CSSProperties = {
  fontFamily: "var(--font-eb-garamond, 'EB Garamond', Georgia, serif)",
};

const groteskStyle: React.CSSProperties = {
  fontFamily:
    "var(--font-space-grotesk, 'Space Grotesk', system-ui, sans-serif)",
};

export default function LandingHero({
  titleFirstLine = "Welcome to",
  titleSecondLine = "Il Foro",
  subtitle = "A centralised solution to finding competitions in fields of your interest and like-minded teammates.",
  signUpHref = "/signup",
  logInHref = "/login",
  linkedInHref = "#",
  instagramHref = "#",
}: HeroWelcomeProps) {
  return (
    <section
      className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16 text-center"
      aria-label="Il Foro hero"
    >
      {/* Max-width container matching Figma frame (965px), gap ≈ 54px from element-box calc */}
      <div className="flex w-full max-w-[965px] flex-col items-center gap-[54px]">
        {/* Title — font-weight 500 per Figma spec */}
        <h1
          className="w-full text-[clamp(2.5rem,12vw,7.25rem)] font-medium leading-[0.94]"
          style={garamondStyle}
        >
          <span className="block text-black">{titleFirstLine}</span>
          <span
            className="block italic"
            style={{ color: "var(--color-brand-accent)" }}
          >
            {titleSecondLine}
          </span>
        </h1>

        {/* Subtitle — 32.62px at design width, scales down on mobile */}
        <p
          className="text-[clamp(1rem,3.3vw,2.04rem)] font-medium leading-[1.3] text-black"
          style={groteskStyle}
        >
          {subtitle}
        </p>

        {/* CTA Buttons — each 310.78px wide, gap 37.15px */}
        <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-[37px]">
          {/* Sign Up — bg #4B4B30, border 1px solid #000, border-radius 22.65px, py 23px */}
          <a
            href={signUpHref}
            className="group flex items-center justify-center gap-[9px] rounded-[23px] border border-black bg-(--color-olive) py-[23px] px-9 text-[clamp(1rem,3.3vw,2.04rem)] font-medium text-(--color-cream) transition-all duration-200 hover:bg-[#3a3a22] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0ead8] focus-visible:ring-offset-2 sm:w-[311px]"
            style={groteskStyle}
            aria-label="Sign up for Il Foro"
          >
            <span>Sign Up</span>
            <img
              src="/dashboard-assets/HeroWelcome-assets/arrow-up-right.svg"
              alt=""
              width={22}
              height={22}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          {/* Log In — bg #834A4A, border 1px solid #000, border-radius 23.56px, py 23px */}
          <a
            href={logInHref}
            className="flex items-center justify-center rounded-[23px] border border-black bg-(--color-mauve) py-[23px] px-9 text-[clamp(1rem,3.3vw,2.04rem)] font-medium text-(--color-cream) transition-all duration-200 hover:bg-[#6e3c3c] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0ead8] focus-visible:ring-offset-2 sm:w-[311px]"
            style={groteskStyle}
            aria-label="Log in to Il Foro"
          >
            Log In
          </a>
        </div>

        {/* Social Links — gap 22.65px */}
        <div
          className="flex items-center gap-[23px]"
          role="list"
          aria-label="Social media links"
        >
          <a
            href={linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Il Foro on LinkedIn"
            role="listitem"
            className="transition-all duration-200 hover:scale-110 hover:opacity-70"
          >
            <img
              src="/dashboard-assets/HeroWelcome-assets/linkedin.svg"
              alt="LinkedIn"
              width={40}
              height={38}
            />
          </a>

          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Il Foro on Instagram"
            role="listitem"
            className="transition-all duration-200 hover:scale-110 hover:opacity-70"
          >
            <img
              src="/dashboard-assets/HeroWelcome-assets/instagram.svg"
              alt="Instagram"
              width={40}
              height={40}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
