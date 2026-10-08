import React from 'react';
import { Tag, Sparkles } from 'lucide-react';

export const Legend: React.FC = () => {
  const items = [
    {
      label: 'United Worship',
      color: 'bg-church-navy',
      description: 'Miércoles y Viernes 7PM • Domingos',
    },
    {
      label: 'Herederos del Reino',
      color: 'bg-[#6D28D9]',
      description: 'Martes 7PM • Domingos',
    },
    {
      label: 'Grupo Rafael Quiñonez',
      color: 'bg-church-gold',
      description: 'Lunes 4PM (o Martes festivo) • Domingos',
    },
    {
      label: 'Congregacional / Unida',
      color: 'bg-[#0E7490]',
      description: 'Vigilias, caminatas y cultos especiales',
    },
    {
      label: 'Festivo / Reprogramación',
      color: 'bg-church-crimson',
      description: 'Días no laborables y ajustes de horario',
    },
  ];

  return (
    <div className="bg-church-cream/75 border border-church-beige/90 rounded-3xl p-4 sm:p-5 shadow-neu-raised mb-6">
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-church-beige/70">
        <Tag className="w-4 h-4 text-church-gold" />
        <h4 className="text-xs font-black uppercase tracking-wider text-church-navy">
          Convenciones y Grupos del Ministerio
        </h4>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-church-gold-dark ml-auto">
          <Sparkles className="w-3 h-3 text-church-gold" />
          A.I.E.C San Marcos
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-2.5 p-3 rounded-2xl bg-church-ivory border border-church-beige/80 shadow-neu-raised-sm"
          >
            <span
              className={`w-3.5 h-3.5 rounded-full mt-0.5 flex-shrink-0 ${item.color} ring-2 ring-church-cream shadow-2xs`}
            />
            <div className="min-w-0">
              <span className="text-xs font-black text-church-navy block truncate">
                {item.label}
              </span>
              <span className="text-[10px] text-church-navy/70 leading-tight block mt-0.5">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
