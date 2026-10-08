import React from 'react';
import { Download, Share2, Printer, Loader2 } from 'lucide-react';

interface ExportToolbarProps {
  onExportPng: () => Promise<void>;
  isExporting: boolean;
  onShareWhatsApp: () => void;
  selectedMonthName: string;
  selectedYear: number;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({
  onExportPng,
  isExporting,
  onShareWhatsApp,
  selectedMonthName,
  selectedYear,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      data-export-ignore="true"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl"
    >
      <div className="bg-church-cream/95 backdrop-blur-md border border-church-beige shadow-neu-raised-lg rounded-3xl p-2.5 sm:p-3.5 flex items-center justify-between gap-3">
        {/* Left summary pill */}
        <div className="hidden sm:flex items-center gap-2 pl-2">
          <div className="w-2.5 h-2.5 rounded-full bg-church-gold animate-pulse" />
          <span className="text-xs font-black text-church-navy">
            {selectedMonthName} {selectedYear}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Print button */}
          <button
            type="button"
            onClick={handlePrint}
            aria-label="Imprimir cronograma"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black text-church-navy hover:text-church-navy-light bg-church-ivory border border-church-beige shadow-neu-raised-sm active:shadow-neu-pressed transition-all"
          >
            <Printer className="w-4 h-4 text-church-gold" />
            <span>Imprimir</span>
          </button>

          {/* WhatsApp Share Button */}
          <button
            type="button"
            onClick={onShareWhatsApp}
            aria-label="Compartir en WhatsApp"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-[#25D366] hover:bg-[#20ba59] shadow-neu-raised-sm active:shadow-neu-pressed transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartir WhatsApp</span>
          </button>

          {/* Download HD PNG Button */}
          <button
            type="button"
            onClick={onExportPng}
            disabled={isExporting}
            aria-label="Descargar imagen HD"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black text-church-white-warm bg-church-navy hover:bg-church-navy-dark shadow-neu-navy active:shadow-neu-navy-pressed border border-church-gold/40 transition-all disabled:opacity-50 active:scale-95"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-church-gold" />
                <span>Generando HD...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-church-gold" />
                <span>Guardar Imagen HD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
