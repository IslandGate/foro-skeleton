/**
 * HeroAboutUs Component Props Interface
 * Defines all configurable properties for the About section
 */

export interface StatisticItem {
  value: string;
  label: string;
  hasIcon?: boolean; // For star icon on rating
}

export interface HeroAboutUsProps {
  // Title Section
  titlePrefix?: string;
  titleEmphasis?: string;

  // Logo Section
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;

  // Mission Section
  missionHeadingPrefix?: string;
  missionHeadingEmphasis?: string;
  missionSubtitle?: string;
  missionDescription?: string;

  // Statistics
  statistics?: StatisticItem[];

  // Optional customization
  containerBackgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
}
