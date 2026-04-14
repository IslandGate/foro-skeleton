export interface StatisticItem {
  value: string;
  label: string;
  hasIcon?: boolean;
}

export interface HeroAboutUsProps {
  titlePrefix?: string;
  titleEmphasis?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  missionHeading?: string;
  missionSubtitle?: string;
  missionDescription?: string;
  statistics?: StatisticItem[];
}