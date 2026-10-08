export type MinistryGroupId = 'all' | 'rafael' | 'herederos' | 'united' | 'congregational';

export interface MinistryGroupInfo {
  id: MinistryGroupId;
  name: string;
  shortName: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentColor: string;
}

export type EventCategory = 
  | 'escuela_dominical' 
  | 'culto' 
  | 'vigilia' 
  | 'actividad' 
  | 'ensayo_especial' 
  | 'festivo';

export interface ScheduleEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  time?: string;
  group: 'rafael' | 'herederos' | 'united' | 'congregational' | 'holiday';
  groupLabel: string;
  category: EventCategory;
  categoryLabel: string;
  description?: string;
  participants?: string[];
  isHoliday?: boolean;
  isImportant?: boolean;
}

export interface RecurringRehearsal {
  id: string;
  day: string;
  dayNumber: number; // 1 = Lunes, 2 = Martes, etc.
  group: 'rafael' | 'herederos' | 'united';
  groupLabel: string;
  time: string;
  note?: string;
}

export interface ChurchInfo {
  name: string;
  subtitle: string;
  address: string;
  legalText: string;
  motto: string;
  ministryName: string;
  city: string;
}

export interface ScheduleMonthData {
  year: number;
  month: number; // 1-12
  monthName: string;
  events: ScheduleEvent[];
}

export interface ScheduleData {
  recurringRehearsals: RecurringRehearsal[];
  months: ScheduleMonthData[];
}
