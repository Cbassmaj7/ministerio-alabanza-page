import React from 'react';
import { ScheduleEvent } from '../types';
import { getGroupConfig } from '../utils/groupStyles';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { X, Clock, Calendar, Users, Share2, Star, AlertCircle, Info } from 'lucide-react';
import { generateWhatsAppShareUrl } from '../utils/exportImage';

interface EventModalProps {
  event: ScheduleEvent | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  const groupCfg = getGroupConfig(event.group);
  const parsedDate = parseISO(event.date);
  const formattedFullDate = format(parsedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });

  const handleShareEventWhatsApp = () => {
    let msg = `📅 *${event.title}* - Ministerio de Alabanza AIEC Nueva Jerusalén\n`;
    msg += `📆 *Fecha:* ${formattedFullDate}\n`;
    if (event.time) msg += `⏰ *Hora:* ${event.time}\n`;
    msg += `👥 *Responsable:* ${event.groupLabel}\n`;
    msg += `🏷️ *Tipo:* ${event.categoryLabel}\n`;
    if (event.participants && event.participants.length > 0) {
      msg += `👤 *Participantes:* ${event.participants.join(', ')}\n`;
    }
    if (event.description) {
      msg += `📝 *Detalles:* ${event.description}\n`;
    }
    msg += `\n📍 *Lugar:* AIEC Nueva Jerusalén - San Marcos, Sucre`;

    const waUrl = generateWhatsAppShareUrl(msg, window.location.href);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-church-navy/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-church-cream border border-church-beige shadow-neu-raised-lg rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Temple Photo Header Banner */}
        <div className="relative h-28 sm:h-36 w-full overflow-hidden bg-church-navy">
          <img
            src="./images/image_iglesia.jpeg"
            alt="Templo Iglesia Nueva Jerusalén San Marcos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-church-cream via-transparent to-black/50" />
          
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-3 right-3 p-1.5 rounded-full bg-church-navy/70 backdrop-blur-xs hover:bg-church-navy text-church-white-warm transition-colors shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-2.5 left-6 flex items-center gap-2">
            <span
              className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-lg shadow-md ${groupCfg.badgeBg} ${groupCfg.badgeText}`}
            >
              {event.groupLabel}
            </span>
            <span className="text-xs text-church-navy font-extrabold bg-church-ivory/95 px-2.5 py-0.5 rounded-md border border-church-beige shadow-sm">
              {event.categoryLabel}
            </span>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-church-gold-dark text-xs font-black uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5 text-church-gold" />
              <span className="capitalize">{formattedFullDate}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-church-navy leading-tight">
              {event.title}
            </h3>
          </div>

          {/* Time & Highlight status */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {event.time && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-church-ivory text-church-navy font-black text-xs border border-church-beige shadow-neu-pressed-sm">
                <Clock className="w-4 h-4 text-church-gold" />
                <span>{event.time}</span>
              </div>
            )}

            {event.isImportant && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-church-ivory text-church-gold-dark font-black text-xs border border-church-gold/40 shadow-neu-raised-sm">
                <Star className="w-3.5 h-3.5 fill-current text-church-gold" />
                <span>Actividad Especial Destacada</span>
              </div>
            )}

            {event.isHoliday && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FDF0F2] text-church-crimson font-black text-xs border border-[#F4C5CC] shadow-neu-raised-sm">
                <AlertCircle className="w-3.5 h-3.5 text-church-crimson" />
                <span>Festivo Nacional</span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div className="p-4 rounded-2xl bg-church-ivory border border-church-beige shadow-neu-pressed-sm">
              <div className="flex items-center gap-1.5 text-xs font-black text-church-navy mb-1.5">
                <Info className="w-3.5 h-3.5 text-church-gold" />
                <span>Observaciones / Descripción:</span>
              </div>
              <p className="text-xs sm:text-sm text-church-navy/80 leading-relaxed font-medium">
                {event.description}
              </p>
            </div>
          )}

          {/* Participants */}
          {event.participants && event.participants.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-church-navy mb-2">
                <Users className="w-3.5 h-3.5 text-church-gold" />
                <span>Encargados / Participantes:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.participants.map((person) => (
                  <span
                    key={person}
                    className="px-3 py-1 rounded-xl text-xs font-bold bg-church-ivory text-church-navy border border-church-beige shadow-neu-raised-sm"
                  >
                    {person}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-church-cream/90 border-t border-church-beige flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-black text-church-navy/70 hover:text-church-navy transition-colors"
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={handleShareEventWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-white bg-[#25D366] hover:bg-[#20ba59] transition-all shadow-neu-raised-sm active:shadow-neu-pressed hover:scale-102"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartir este evento</span>
          </button>
        </div>
      </div>
    </div>
  );
};
