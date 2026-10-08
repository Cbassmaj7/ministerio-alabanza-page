import React from 'react';
import { RecurringRehearsal } from '../types';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { getGroupConfig } from '../utils/groupStyles';

interface RehearsalStripProps {
  rehearsals: RecurringRehearsal[];
}

export const RehearsalStrip: React.FC<RehearsalStripProps> = ({ rehearsals }) => {
  return (
    <div className="bg-church-cream/75 border border-church-beige/90 rounded-3xl p-4 sm:p-5 shadow-neu-raised mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3.5 border-b border-church-beige/70">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-church-ivory border border-church-beige shadow-neu-raised-sm text-church-navy">
            <Clock className="w-4 h-4 text-church-gold" />
          </div>
          <div>
            <h3 className="text-sm font-black text-church-navy uppercase tracking-wider">
              Horario Semanal de Ensayos Regulares
            </h3>
            <p className="text-xs text-church-navy/70">
              Prácticas fijas de preparación musical y ministración
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-church-navy bg-church-ivory px-3 py-1.5 rounded-full border border-church-beige shadow-neu-pressed-sm">
          <Calendar className="w-3.5 h-3.5 text-church-gold" />
          <span>Frecuencia semanal continua</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {rehearsals.map((item) => {
          const groupCfg = getGroupConfig(item.group);

          return (
            <div
              key={item.id}
              className="relative rounded-2xl border border-church-beige/80 bg-church-ivory p-4 shadow-neu-raised-sm hover:shadow-neu-flat transition-all duration-200"
            >
              {/* Day header */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-sm text-church-navy tracking-tight flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${groupCfg.dotColor} shadow-2xs`} />
                  {item.day}
                </span>

                <span
                  className={`text-[11px] font-black px-2.5 py-0.5 rounded-lg shadow-2xs ${groupCfg.badgeBg} ${groupCfg.badgeText}`}
                >
                  {groupCfg.shortLabel}
                </span>
              </div>

              {/* Group name */}
              <div className="text-xs font-bold text-church-navy/80 truncate mb-2.5">
                {item.groupLabel}
              </div>

              {/* Time debossed capsule */}
              <div className="flex items-center gap-2 text-xs font-black text-church-navy bg-church-cream/70 py-1.5 px-2.5 rounded-xl border border-church-beige/70 shadow-neu-pressed-sm">
                <Clock className="w-3.5 h-3.5 text-church-gold flex-shrink-0" />
                <span>{item.time}</span>
              </div>

              {/* Note (e.g. holidays) */}
              {item.note && (
                <div className="mt-2.5 pt-2 border-t border-church-beige/60 flex items-start gap-1.5 text-[11px] text-church-gold-dark font-semibold leading-tight">
                  <AlertCircle className="w-3.5 h-3.5 text-church-gold flex-shrink-0 mt-0.5" />
                  <span>{item.note}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
