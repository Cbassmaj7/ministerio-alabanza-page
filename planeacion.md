\# MISSION: Church Music Ministry Schedule Web App (A.I.E.C Nueva Jerusalén)



Build and set up a modern, high-performance static web application for the Praise \& Worship Ministry ("ALABANZA") of "IGLESIA NUEVA JERUSALEN A.I.E.C" (San Marcos, Sucre).

Target deployment: GitHub Pages / Vercel (100% Free tier, Zero-backend, Pure static build).



\## 1. TECH STACK

\- Framework: Vite + React (TypeScript) or Vite + Vanilla TypeScript + Tailwind CSS.

\- Styling: Tailwind CSS (support glassmorphism / clean modern cards, deep navy blue #1F4E79, crimson red #C00000, pastel accents).

\- Icons: Lucide-react.

\- Utilities: `html-to-image` or `html2canvas` for HD PNG export, `date-fns` for calendar generation.

\- PWA: `vite-plugin-pwa` for offline caching.



\## 2. REPOSITORY ARCHITECTURE

/

├── public/

│   ├── favicon.svg

│   └── manifest.json

├── src/

│   ├── data/

│   │   ├── schedule.json          <-- Single source of truth for events and recurring rehearsals

│   │   └── churchInfo.json        <-- Official LaTeX header data and legal text

│   ├── types/

│   │   └── index.ts               <-- TypeScript interfaces (Event, MinistryGroup, ScheduleMonth)

│   ├── components/

│   │   ├── Header.tsx             <-- Institutional header (matching AIEC legal header)

│   │   ├── RehearsalStrip.tsx     <-- Weekly recurring rules banner

│   │   ├── MonthNavigator.tsx     <-- Month selector (Septiembre, Octubre, Noviembre 2026)

│   │   ├── FilterBar.tsx          <-- Filter by group (Todos, Rafael, United Worship, Herederos)

│   │   ├── CalendarGrid.tsx       <-- Desktop 7x5 Grid View

│   │   ├── AgendaList.tsx         <-- Mobile-first Timeline/Card View

│   │   ├── ExportToolbar.tsx      <-- "Descargar Imagen 300 DPI" \& "Compartir en WhatsApp"

│   │   └── Legend.tsx             <-- Category color pill legend

│   ├── utils/

│   │   └── exportImage.ts         <-- Canvas renderer utility with 3x devicePixelRatio

│   ├── App.tsx

│   └── main.tsx

├── package.json

└── vite.config.ts



\## 3. CORE FEATURES \& LOGIC REQUIREMENTS



1\. Institutional Header:

&#x20;  - Title: "IGLESIA NUEVA JERUSALEN A.I.E.C" (#1F4E79)

&#x20;  - Address: "CALLE 23 CARRERA 31 -- ESQUINA SAN MARCOS, SUCRE"

&#x20;  - Legal: "Per. Jurídica 595 de 08 de abril de 1997 Ministerio del Interior"

&#x20;  - Motto: "“Tierra deseable para ti, tu familia y las naciones”"

&#x20;  - Ministry Banner: "ALABANZA" (#C00000)



2\. Data-Driven Model (`src/data/schedule.json`):

&#x20;  - Recurring Rehearsals:

&#x20;    \* Lunes: Rafael Quiñonez (4:00 PM - 5:00 PM, note: holidays moved to Tuesday).

&#x20;    \* Martes: Herederos del Reino (7:00 PM - 9:00 PM).

&#x20;    \* Miércoles: United Worship (7:00 PM - 9:00 PM).

&#x20;    \* Viernes: United Worship (7:00 PM - 9:00 PM).

&#x20;  - Events for October 2026:

&#x20;    \* Oct 11: Escuela Dominical (Rafael, Manuel, Rubiel).

&#x20;    \* Oct 12: Festivo nacional (No hay práctica).

&#x20;    \* Oct 13: Práctica reprogramada Rafael (4 PM) + Ensayo Herederos (7 PM).

&#x20;    \* Oct 17: Caminata Congregacional.

&#x20;    \* Oct 18: Escuela Dominical (United Worship).

&#x20;    \* Oct 25: Escuela Dominical (Herederos del Reino).

&#x20;    \* Oct 27: Culto Semana Bíblica (4:00 PM, United Worship).

&#x20;    \* Oct 30: Vigilia Congregacional (United Worship / Herederos).

&#x20;    \* Oct 31: Encuentro de Jóvenes en la mañana (United Worship).

&#x20;    \* Nov 1: Escuela Dominical (United Worship).



3\. Responsive Dual-View:

&#x20;  - On screens >= 1024px: Render the elegant monthly calendar grid with styled badges.

&#x20;  - On screens < 1024px: Render an intuitive chronological timeline (grouped by week/date) with large touch targets.

&#x20;  - Provide an explicit toggle button: \[ Cuadrícula | Lista de Eventos ].



4\. Smart Filters:

&#x20;  - Quick pills to filter by: "Todos", "United Worship", "Herederos del Reino", "Grupo Rafael".

&#x20;  - When a filter is selected, non-matching events dim out or hide gracefully.



5\. Export Engine:

&#x20;  - Floating action button: "Descargar Imagen HD (PNG)".

&#x20;  - Uses `html-to-image` or `html2canvas` with `pixelRatio: 3` to capture the entire container cleanly.

&#x20;  - Action button: "Compartir enlace por WhatsApp" (uses `navigator.share` on mobile or `https://wa.me/?text=...` fallback).



6\. Production Build \& Deployment Compatibility:

&#x20;  - Ensure `vite.config.ts` handles relative base paths (`base: './'`) for effortless GitHub Pages or Vercel static deployments.

&#x20;  - Strict TypeScript, 0 console warnings, and full test build (`npm run build`).

