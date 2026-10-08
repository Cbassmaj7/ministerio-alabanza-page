import React from 'react';
import { ScheduleEvent, MinistryGroupId } from '../types';
import { getGroupConfig } from '../utils/groupStyles';
import { parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, Users, Star, ArrowRight, CalendarDays, Sparkles } from 'lucide-react';

interface AgendaListProps {
  events: ScheduleEvent[];
  selectedGroup: MinistryGroupId;
  onSelectEvent: (event: ScheduleEvent) => void;
}

export const AgendaList: React.FC<AgendaListProps> = ({
  events,
  selectedGroup,
  onSelectEvent,
}) => {
  // Filter events
  const filteredEvents = React.useMemo(() => {
    return events
      .filter((evt) => {
        if (selectedGroup === 'all') return true;
        if (evt.isHoliday) return true;
        return evt.group === selectedGroup;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events, selectedGroup]);

  if (filteredEvents.length === 0) {
    return (
      <div className="bg-church-cream/75 border border-church-beige/90 rounded-3xl p-10 text-center shadow-neu-raised mb-6">
        <CalendarDays className="w-12 h-12 text-church-gold/60 mx-auto mb-3" />
        <h4 className="text-base font-black text-church-navy">No hay eventos para el filtro seleccionado</h4>
        <p className="text-xs text-church-navy/70 mt-1">
          Prueba seleccionando "Todos" u otro ministerio en la barra superior.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {filteredEvents.map((evt) => {
        const groupCfg = getGroupConfig(evt.group);
        const parsedDate = parseISO(evt.date);
        const dayNumber = format(parsedDate, 'd');
        const dayName = format(parsedDate, 'EEEE', { locale: es });
        const monthShort = format(parsedDate, 'MMM', { locale: es }).toUpperCase();

        return (
          <div
            key={evt.id}
            onClick={() => onSelectEvent(evt)}
            className={`group cursor-pointer bg-church-cream/75 rounded-3xl border border-church-beige/90 transition-all duration-200 p-4 sm:p-5 shadow-neu-raised hover:shadow-neu-flat relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              evt.isHoliday
                ? 'border-church-crimson/30 bg-[#FDF0F2]'
                : evt.isImportant
                ? 'border-church-gold/60 bg-[#FDF6E8] ring-1 ring-church-gold/30'
                : ''
            }`}
          >
            {/* Left Accent Bar */}
            <div
              className={`absolute top-0 left-0 bottom-0 w-2 ${
                evt.isHoliday ? 'bg-church-crimson' : groupCfg.accentBar
              }`}
            />

            {/* Date Block & Main Details */}
            <div className="flex items-start sm:items-center gap-4 pl-2">
              {/* Neumorphic Inset Date Box */}
              <div
                className={`flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex flex-col items-center justify-center text-center border shadow-neu-pressed-sm ${
                  evt.isHoliday
                    ? 'bg-[#FDF0F2] border-[#F4C5CC] text-church-crimson'
                    : 'bg-church-ivory border-church-beige text-church-navy'
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-church-gold-dark">
                  {monthShort}
                </span>
                <span className="text-2xl sm:text-3xl font-black leading-none text-church-navy">
                  {dayNumber}
                </span>
                <span className="text-[10px] font-bold text-church-navy/70 capitalize truncate max-w-[55px]">
                  {dayName.slice(0, 3)}
                </span>
              </div>

              {/* Event Content */}
              <div className="flex-1">
                {/* Badges line */}
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-lg shadow-2xs ${
                      evt.isHoliday
                        ? 'bg-church-crimson text-white'
                        : `${groupCfg.badgeBg} ${groupCfg.badgeText}`
                    }`}
                  >
                    {evt.isImportant && <Sparkles className="w-3 h-3 text-church-gold" />}
                    {evt.groupLabel}
                  </span>

                  <span className="text-[11px] font-bold text-church-navy/80 bg-church-ivory px-2.5 py-0.5 rounded-lg border border-church-beige shadow-neu-raised-sm">
                    {evt.categoryLabel}
                  </span>

                  {evt.isImportant && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-church-gold-dark bg-church-ivory px-2.5 py-0.5 rounded-lg border border-church-gold/40 shadow-neu-raised-sm">
                      <Star className="w-3 h-3 fill-current text-church-gold" />
                      Destacado
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-black text-church-navy group-hover:text-church-navy-light transition-colors leading-tight">
                  {evt.title}
                </h3>

                {/* Description snippet */}
                {evt.description && (
                  <p className="text-xs text-church-navy/70 mt-1 line-clamp-2 max-w-xl font-medium">
                    {evt.description}
                  </p>
                )}

                {/* Participants tags */}
                {evt.participants && evt.participants.length > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-church-navy/80 mt-2 font-medium">
                    <Users className="w-3.5 h-3.5 text-church-gold flex-shrink-0" />
                    <span>{evt.participants.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Time & Details Action */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 pl-2 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-church-beige/60">
              {evt.time && (
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-church-navy bg-church-ivory px-3 py-1.5 rounded-xl border border-church-beige shadow-neu-pressed-sm">
                  <Clock className="w-3.5 h-3.5 text-church-gold" />
                  <span>{evt.time}</span>
                </div>
              )}

              <span className="inline-flex items-center gap-1 text-xs font-black text-church-gold hover:text-church-gold-dark group-hover:translate-x-1 transition-all">
                Ver detalle
                <ArrowRight className="w-3.5 h-3.5 text-church-gold" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
