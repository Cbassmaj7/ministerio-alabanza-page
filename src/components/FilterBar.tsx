import React from 'react';
import { MinistryGroupId } from '../types';
import { MINISTRY_GROUPS } from '../utils/groupStyles';
import { Calendar, LayoutList, Filter } from 'lucide-react';

interface FilterBarProps {
  selectedGroup: MinistryGroupId;
  onSelectGroup: (group: MinistryGroupId) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  filteredCount: number;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedGroup,
  onSelectGroup,
  viewMode,
  onViewModeChange,
  filteredCount,
  totalCount,
}) => {
  const filterOptions: MinistryGroupId[] = ['all', 'united', 'herederos', 'rafael', 'congregational'];

  return (
    <div className="bg-church-cream/75 border border-church-beige/90 rounded-3xl p-3.5 sm:p-4 shadow-neu-raised mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Left: Group Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full lg:w-auto">
        <div className="flex items-center gap-1.5 text-xs font-black text-church-navy uppercase tracking-wider mr-1">
          <Filter className="w-3.5 h-3.5 text-church-gold" />
          <span>Filtrar:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((gid) => {
            const cfg = MINISTRY_GROUPS[gid];
            const isActive = selectedGroup === gid;

            return (
              <button
                key={gid}
                type="button"
                onClick={() => onSelectGroup(gid)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                  isActive
                    ? 'bg-church-navy text-church-white-warm shadow-neu-navy border border-church-gold/40 scale-[1.02]'
                    : 'bg-church-ivory text-church-navy/80 hover:text-church-navy border border-church-beige/80 shadow-neu-raised-sm hover:shadow-neu-flat active:shadow-neu-pressed'
                }`}
              >
                {gid !== 'all' && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-church-gold' : cfg.dotColor
                    }`}
                  />
                )}
                <span>{cfg.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Counter badge & Dual-View Toggle */}
      <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0 border-church-beige/70">
        <span className="text-xs font-bold text-church-navy/70">
          Mostrando <b className="text-church-navy font-black">{filteredCount}</b> de {totalCount} eventos
        </span>

        {/* Neumorphic Dual-View Inset Toggle */}
        <div className="inline-flex bg-church-ivory/80 p-1.5 rounded-2xl border border-church-beige/80 shadow-neu-pressed-sm">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              viewMode === 'grid'
                ? 'bg-church-navy text-church-white-warm shadow-neu-navy border border-church-gold/30'
                : 'text-church-navy/70 hover:text-church-navy'
            }`}
            title="Vista de Cuadrícula Mensual"
          >
            <Calendar className="w-3.5 h-3.5 text-church-gold" />
            <span>Cuadrícula</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              viewMode === 'list'
                ? 'bg-church-navy text-church-white-warm shadow-neu-navy border border-church-gold/30'
                : 'text-church-navy/70 hover:text-church-navy'
            }`}
            title="Vista de Lista / Agenda Cronológica"
          >
            <LayoutList className="w-3.5 h-3.5 text-church-gold" />
            <span>Lista</span>
          </button>
        </div>
      </div>
    </div>
  );
};
