import { useState, useRef, useEffect } from 'react';
import scheduleDataRaw from './data/schedule.json';
import churchInfoRaw from './data/churchInfo.json';
import { ScheduleData, ChurchInfo, MinistryGroupId, ScheduleEvent } from './types';
import { Header } from './components/Header';
import { RehearsalStrip } from './components/RehearsalStrip';
import { MonthNavigator } from './components/MonthNavigator';
import { FilterBar } from './components/FilterBar';
import { CalendarGrid } from './components/CalendarGrid';
import { AgendaList } from './components/AgendaList';
import { Legend } from './components/Legend';
import { ExportToolbar } from './components/ExportToolbar';
import { EventModal } from './components/EventModal';
import { exportElementAsPng, shareSchedule } from './utils/exportImage';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

const scheduleData = scheduleDataRaw as unknown as ScheduleData;
const churchInfo = churchInfoRaw as unknown as ChurchInfo;

// Safe mobile-first default detection
const getInitialViewMode = (): 'grid' | 'list' => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 1024 ? 'list' : 'grid';
  }
  return 'grid';
};

export default function App() {
  // Default to October 2026 if available, else first month
  const initialMonthIndex = Math.max(
    0,
    scheduleData.months.findIndex((m) => m.year === 2026 && m.month === 10)
  );

  const [currentMonthIndex, setCurrentMonthIndex] = useState(initialMonthIndex);
  const [selectedGroup, setSelectedGroup] = useState<MinistryGroupId>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(getInitialViewMode);
  const [userOverrodeView, setUserOverrodeView] = useState(false);
  const [modalEvent, setModalEvent] = useState<ScheduleEvent | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const captureRef = useRef<HTMLDivElement>(null);

  // Sync viewMode on window resize if user hasn't explicitly chosen one
  useEffect(() => {
    const handleResize = () => {
      if (!userOverrodeView) {
        setViewMode(window.innerWidth < 1024 ? 'list' : 'grid');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [userOverrodeView]);

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setUserOverrodeView(true);
    setViewMode(mode);
  };

  const currentMonth = scheduleData.months[currentMonthIndex] || scheduleData.months[0];

  // Filter count calculation
  const filteredEvents = currentMonth.events.filter((evt) => {
    if (selectedGroup === 'all') return true;
    if (evt.isHoliday) return true;
    return evt.group === selectedGroup;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // HD PNG Export Handler
  const handleExportPng = async () => {
    if (!captureRef.current) return;
    try {
      setIsExporting(true);
      const fileName = `Cronograma-Alabanza-AIEC-${currentMonth.monthName}-${currentMonth.year}.png`;
      const result = await exportElementAsPng(captureRef.current, {
        fileName,
        pixelRatio: 2.5,
        preferShareOnMobile: true,
      });

      if (result.shared) {
        showToast('¡Imagen compartida con éxito!');
      } else if (result.downloaded) {
        showToast('¡Imagen HD descargada y guardada con éxito!');
      } else {
        showToast('¡Imagen HD generada correctamente!');
      }
    } catch (err) {
      console.error(err);
      showToast('Ocurrió un error al generar la imagen. Intenta nuevamente.');
    } finally {
      setIsExporting(false);
    }
  };

  // WhatsApp Share Handler
  const handleShareWhatsApp = async () => {
    const title = `📅 *CRONOGRAMA DE ALABANZA - AIEC NUEVA JERUSALÉN*`;
    const subtitle = `Mes: *${currentMonth.monthName} ${currentMonth.year}*`;
    
    // Top upcoming activities
    const eventBullets = currentMonth.events
      .slice(0, 6)
      .map((e) => `• *${e.date.split('-')[2]}*: ${e.title} (${e.groupLabel}${e.time ? ` - ${e.time}` : ''})`)
      .join('\n');

    const text = `${subtitle}\n\nActividades destacadas:\n${eventBullets}\n\n📍 *Lugar:* Calle 23 Cra 31 Esquina, San Marcos, Sucre\n\nConsulta el cronograma completo interactivo:`;
    const url = window.location.href;

    await shareSchedule(title, text, url);
  };

  return (
    <div className="min-h-screen bg-church-ivory pb-28 pt-4 sm:pt-6 px-3 sm:px-6 lg:px-8 selection:bg-church-navy selection:text-church-white-warm">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3.5 bg-church-navy text-church-white-warm rounded-2xl shadow-neu-navy border border-church-gold/40 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-church-gold flex-shrink-0" />
          <span className="text-xs font-black tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Main Container to Capture */}
      <div
        ref={captureRef}
        id="schedule-capture-root"
        className="max-w-7xl mx-auto bg-church-ivory p-2 sm:p-5 rounded-3xl"
      >
        {/* Institutional Header */}
        <Header info={churchInfo} />

        {/* Weekly Recurring Rehearsal Strip */}
        <RehearsalStrip rehearsals={scheduleData.recurringRehearsals} />

        {/* Month Navigator */}
        <MonthNavigator
          availableMonths={scheduleData.months}
          selectedMonth={currentMonth}
          onSelectMonth={(month) => {
            const idx = scheduleData.months.findIndex(
              (m) => m.year === month.year && m.month === month.month
            );
            if (idx !== -1) setCurrentMonthIndex(idx);
          }}
        />

        {/* Filter Bar & View Toggle */}
        <FilterBar
          selectedGroup={selectedGroup}
          onSelectGroup={setSelectedGroup}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          filteredCount={filteredEvents.length}
          totalCount={currentMonth.events.length}
        />

        {/* Dynamic Views: Grid vs Agenda List */}
        {viewMode === 'grid' ? (
          <CalendarGrid
            year={currentMonth.year}
            month={currentMonth.month}
            events={currentMonth.events}
            selectedGroup={selectedGroup}
            onSelectEvent={setModalEvent}
          />
        ) : (
          <AgendaList
            events={currentMonth.events}
            selectedGroup={selectedGroup}
            onSelectEvent={setModalEvent}
          />
        )}

        {/* Category & Group Legend */}
        <Legend />

        {/* Footer info in captured container */}
        <footer className="text-center py-4 border-t border-church-beige/80 text-xs text-church-navy/70 flex flex-col sm:flex-row items-center justify-between gap-2 px-2 mt-2">
          <div className="flex items-center gap-1.5 font-bold text-church-navy">
            <ShieldCheck className="w-4 h-4 text-church-gold" />
            <span>AIEC Nueva Jerusalén • San Marcos, Sucre</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-church-navy/60">
            <Sparkles className="w-3 h-3 text-church-gold" />
            <span>Plataforma Oficial de Alabanza & Adoración</span>
          </div>
        </footer>
      </div>

      {/* Floating Export & Share Toolbar */}
      <ExportToolbar
        onExportPng={handleExportPng}
        isExporting={isExporting}
        onShareWhatsApp={handleShareWhatsApp}
        selectedMonthName={currentMonth.monthName}
        selectedYear={currentMonth.year}
      />

      {/* Event Details Dialog Modal */}
      <EventModal
        event={modalEvent}
        onClose={() => setModalEvent(null)}
      />
    </div>
  );
}
