export interface StatisticItem {
  value: string;
  label: string;
  hasIcon?: boolean;
}

export interface HeroAboutUsProps {
  titlePrefix?: string;
  titleEmphasis?: string;
  missionSubtitle?: string;
  missionDescription?: string;
  statistics?: StatisticItem[];
}