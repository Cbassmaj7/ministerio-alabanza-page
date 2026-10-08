import React from 'react';
import { ScheduleEvent, MinistryGroupId } from '../types';
import { getGroupConfig } from '../utils/groupStyles';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
} from 'date-fns';
import { Clock, Star, Users } from 'lucide-react';

interface CalendarGridProps {
  year: number;
  month: number; // 1-12
  events: ScheduleEvent[];
  selectedGroup: MinistryGroupId;
  onSelectEvent: (event: ScheduleEvent) => void;
}

const WEEKDAYS = [
  { short: 'Lun', full: 'Lunes' },
  { short: 'Mar', full: 'Martes' },
  { short: 'Mié', full: 'Miércoles' },
  { short: 'Jue', full: 'Jueves' },
  { short: 'Vie', full: 'Viernes' },
  { short: 'Sáb', full: 'Sábado' },
  { short: 'Dom', full: 'Domingo' },
];

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  events,
  selectedGroup,
  onSelectEvent,
}) => {
  // Construct Date object for month (0-indexed in JS Date)
  const monthDate = new Date(year, month - 1, 1);
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);

  // Week starts on Monday (weekStartsOn: 1)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  // Map events by date (YYYY-MM-DD)
  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, ScheduleEvent[]>();
    events.forEach((evt) => {
      const list = map.get(evt.date) || [];
      list.push(evt);
      map.set(evt.date, list);
    });
    return map;
  }, [events]);

  const matchesFilter = (evt: ScheduleEvent) => {
    if (selectedGroup === 'all') return true;
    if (evt.isHoliday) return true;
    return evt.group === selectedGroup;
  };

  return (
    <div className="bg-church-cream/75 border border-church-beige/90 rounded-3xl shadow-neu-raised overflow-hidden mb-6">
      {/* Table / Grid Header */}
      <div className="grid grid-cols-7 border-b border-church-beige/80 bg-church-cream/90 text-center text-xs font-black uppercase tracking-wider text-church-navy">
        {WEEKDAYS.map((wd, index) => {
          const isSunday = index === 6;
          return (
            <div
              key={wd.full}
              className={`py-3.5 px-1 sm:px-2 ${
                isSunday ? 'text-church-gold-dark bg-church-gold/15 font-black' : ''
              }`}
            >
              <span className="hidden md:inline">{wd.full}</span>
              <span className="md:hidden">{wd.short}</span>
            </div>
          );
        })}
      </div>

      {/* Grid Days */}
      <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-church-beige/60 bg-church-cream/30">
        {calendarDays.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const isCurrentMonth = isSameMonth(day, monthDate);
          const isCurrentToday = isToday(day);
          const dayEvents = eventsByDate.get(dateStr) || [];
          const dayNumber = format(day, 'd');
          const dayOfWeek = day.getDay(); // 0 is Sunday
          const isSunday = dayOfWeek === 0;

          return (
            <div
              key={dateStr}
              className={`min-h-[110px] sm:min-h-[135px] lg:min-h-[150px] p-2 flex flex-col transition-colors relative ${
                !isCurrentMonth
                  ? 'bg-church-cream/25 opacity-35 text-church-navy/40'
                  : isSunday
                  ? 'bg-[#FDF8EE]'
                  : 'bg-church-ivory/80 hover:bg-church-cream/60'
              }`}
            >
              {/* Day Header inside cell */}
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`inline-flex items-center justify-center text-xs font-black w-6 h-6 rounded-full transition-transform ${
                    isCurrentToday
                      ? 'bg-church-navy text-church-white-warm shadow-neu-navy scale-105 border border-church-gold/40'
                      : isSunday
                      ? 'text-church-gold-dark font-black'
                      : isCurrentMonth
                      ? 'text-church-navy'
                      : 'text-church-navy/40'
                  }`}
                >
                  {dayNumber}
                </span>

                {dayEvents.length > 0 && isCurrentMonth && (
                  <span className="text-[10px] font-bold text-church-navy/50 px-1">
                    {dayEvents.length} {dayEvents.length === 1 ? 'act.' : 'acts.'}
                  </span>
                )}
              </div>

              {/* Events in Day */}
              <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
                {dayEvents.map((evt) => {
                  const isMatch = matchesFilter(evt);
                  const groupCfg = getGroupConfig(evt.group);

                  return (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => onSelectEvent(evt)}
                      className={`text-left w-full rounded-xl p-2 text-xs transition-all duration-150 border shadow-neu-raised-sm hover:shadow-neu-flat hover:scale-[1.01] group relative ${
                        evt.isHoliday
                          ? 'bg-[#FDF0F2] border-[#F4C5CC] text-[#881329] font-bold'
                          : `${groupCfg.bgLight} ${groupCfg.border}`
                      } ${!isMatch ? 'opacity-25 grayscale pointer-events-none' : ''}`}
                    >
                      {/* Top badge line */}
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-2xs ${
                            evt.isHoliday
                              ? 'bg-church-crimson text-white'
                              : `${groupCfg.badgeBg} ${groupCfg.badgeText}`
                          }`}
                        >
                          {evt.isImportant && <Star className="w-2.5 h-2.5 fill-current text-church-gold" />}
                          {groupCfg.shortLabel}
                        </span>

                        {evt.time && (
                          <span className="text-[10px] font-bold text-church-navy/70 flex items-center gap-0.5 truncate">
                            <Clock className="w-2.5 h-2.5 flex-shrink-0 text-church-gold" />
                            <span className="truncate">{evt.time.split('-')[0].trim()}</span>
                          </span>
                        )}
                      </div>

                      {/* Event Title */}
                      <p className="font-extrabold text-[11px] sm:text-xs leading-tight line-clamp-2 text-church-navy group-hover:text-church-navy-light">
                        {evt.title}
                      </p>

                      {/* Participants snippet if present */}
                      {evt.participants && evt.participants.length > 0 && (
                        <p className="hidden xl:flex items-center gap-1 text-[10px] text-church-navy/70 mt-1 truncate font-medium">
                          <Users className="w-2.5 h-2.5 flex-shrink-0 text-church-gold" />
                          <span className="truncate">{evt.participants.join(', ')}</span>
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
