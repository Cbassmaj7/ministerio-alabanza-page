import { MinistryGroupId } from '../types';

export interface GroupConfig {
  id: MinistryGroupId;
  label: string;
  shortLabel: string;
  bgLight: string;
  textDark: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  dotColor: string;
  accentBar: string;
}

export const MINISTRY_GROUPS: Record<MinistryGroupId, GroupConfig> = {
  all: {
    id: 'all',
    label: 'Todos los Grupos',
    shortLabel: 'Todos',
    bgLight: 'bg-church-cream/80',
    textDark: 'text-church-navy',
    border: 'border-church-beige',
    badgeBg: 'bg-church-navy',
    badgeText: 'text-church-white-warm',
    dotColor: 'bg-church-navy',
    accentBar: 'bg-church-navy',
  },
  united: {
    id: 'united',
    label: 'United Worship',
    shortLabel: 'United',
    bgLight: 'bg-[#EBF3F9]',
    textDark: 'text-church-navy',
    border: 'border-[#BDD6E8]',
    badgeBg: 'bg-church-navy',
    badgeText: 'text-church-white-warm',
    dotColor: 'bg-church-navy-light',
    accentBar: 'bg-church-navy',
  },
  herederos: {
    id: 'herederos',
    label: 'Herederos del Reino',
    shortLabel: 'Herederos',
    bgLight: 'bg-[#F5EFFC]',
    textDark: 'text-[#4C1D95]',
    border: 'border-[#DDD0F3]',
    badgeBg: 'bg-[#6D28D9]',
    badgeText: 'text-white',
    dotColor: 'bg-[#7C3AED]',
    accentBar: 'bg-[#6D28D9]',
  },
  rafael: {
    id: 'rafael',
    label: 'Grupo Rafael Quiñonez',
    shortLabel: 'Rafael Q.',
    bgLight: 'bg-[#FDF6E8]',
    textDark: 'text-[#784C0C]',
    border: 'border-[#EBD4A8]',
    badgeBg: 'bg-church-gold',
    badgeText: 'text-church-white-warm',
    dotColor: 'bg-church-gold',
    accentBar: 'bg-church-gold',
  },
  congregational: {
    id: 'congregational',
    label: 'Congregacional / General',
    shortLabel: 'Congregación',
    bgLight: 'bg-[#EEF7F4]',
    textDark: 'text-[#064E3B]',
    border: 'border-[#BBE3D5]',
    badgeBg: 'bg-[#0E7490]',
    badgeText: 'text-white',
    dotColor: 'bg-[#0E7490]',
    accentBar: 'bg-[#0E7490]',
  },
};

export function getGroupConfig(group: string): GroupConfig {
  if (group === 'holiday') {
    return {
      id: 'all',
      label: 'Festivo',
      shortLabel: 'Festivo',
      bgLight: 'bg-[#FDF0F2]',
      textDark: 'text-[#881329]',
      border: 'border-[#F4C5CC]',
      badgeBg: 'bg-church-crimson',
      badgeText: 'text-white',
      dotColor: 'bg-church-crimson',
      accentBar: 'bg-church-crimson',
    };
  }
  return MINISTRY_GROUPS[group as MinistryGroupId] || MINISTRY_GROUPS.all;
}
