import React from 'react';
import { ScheduleMonthData } from '../types';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface MonthNavigatorProps {
  availableMonths: ScheduleMonthData[];
  selectedMonth: ScheduleMonthData;
  onSelectMonth: (month: ScheduleMonthData) => void;
}

export const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  availableMonths,
  selectedMonth,
  onSelectMonth,
}) => {
  const currentIndex = availableMonths.findIndex(
    (m) => m.year === selectedMonth.year && m.month === selectedMonth.month
  );

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectMonth(availableMonths[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < availableMonths.length - 1) {
      onSelectMonth(availableMonths[currentIndex + 1]);
    }
  };

  return (
    <div className="bg-church-cream/75 border border-church-beige/90 rounded-3xl p-4 sm:p-5 shadow-neu-raised mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Current Month Title with arrows */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-2">
          {/* Neumorphic Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            aria-label="Mes anterior"
            className="p-2.5 rounded-2xl border border-church-beige/90 bg-church-ivory hover:bg-church-cream/70 disabled:opacity-30 disabled:cursor-not-allowed text-church-navy transition-all shadow-neu-raised-sm active:shadow-neu-pressed hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 text-church-navy" />
          </button>

          <div className="text-center md:text-left min-w-[180px]">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs uppercase font-extrabold text-church-gold tracking-wider">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Cronograma Mensual</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-church-navy capitalize tracking-tight">
              {selectedMonth.monthName} {selectedMonth.year}
            </h2>
          </div>

          {/* Neumorphic Next Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex >= availableMonths.length - 1}
            aria-label="Mes siguiente"
            className="p-2.5 rounded-2xl border border-church-beige/90 bg-church-ivory hover:bg-church-cream/70 disabled:opacity-30 disabled:cursor-not-allowed text-church-navy transition-all shadow-neu-raised-sm active:shadow-neu-pressed hover:scale-105"
          >
            <ChevronRight className="w-5 h-5 text-church-navy" />
          </button>
        </div>

        {/* Quick event count debossed badge */}
        <span className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-church-ivory text-church-navy border border-church-beige/80 shadow-neu-pressed-sm">
          {selectedMonth.events.length} actividades
        </span>
      </div>

      {/* Segmented Month Selector with Neumorphic Inset Groove */}
      <div className="flex items-center gap-1.5 bg-church-ivory/80 p-1.5 rounded-2xl border border-church-beige/80 shadow-neu-pressed-sm w-full md:w-auto justify-center">
        {availableMonths.map((m) => {
          const isActive = m.year === selectedMonth.year && m.month === selectedMonth.month;

          return (
            <button
              key={`${m.year}-${m.month}`}
              type="button"
              onClick={() => onSelectMonth(m)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                isActive
                  ? 'bg-church-navy text-church-white-warm shadow-neu-navy scale-[1.02] border border-church-gold/40'
                  : 'text-church-navy/70 hover:text-church-navy hover:bg-church-cream/50'
              }`}
            >
              <span>{m.monthName}</span>
              <span className="ml-1 text-[11px] opacity-75">'{String(m.year).slice(2)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
