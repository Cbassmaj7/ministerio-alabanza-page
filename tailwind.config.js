/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        church: {
          navy: '#062B4C',          // Azul marino profundo: Títulos, textos principales, fondos inferiores, iconos
          'navy-dark': '#031728',
          'navy-light': '#0A4275',
          gold: '#B98232',          // Dorado mate: Títulos manuscritos, líneas, cruces, ornamentos y acentos
          'gold-light': '#D49B45',
          'gold-dark': '#8E6123',
          ivory: '#fdfbf6ff',         // Marfil principal: Fondo general
          cream: '#fafafa',         // Crema cálido: Variaciones del fondo y zonas de transición
          beige: '#eeeeee',         // Beige dorado suave: Detalles secundarios y bordes
          'white-warm': '#FFF9EF',  // Blanco cálido: Textos sobre azul y zonas de alto contraste
          crimson: '#9E1B32',       // Rojo institucional / festivos
        },
        group: {
          united: '#062B4C',
          herederos: '#6D28D9',
          rafael: '#B98232',
          congregational: '#0E7490',
          holiday: '#9E1B32',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        // Neumorphism - Raised (Extruded) Surfaces
        'neu-raised-sm': '4px 4px 10px rgba(185, 140, 75, 0.18), -4px -4px 10px rgba(255, 249, 239, 0.9)',
        'neu-raised': '7px 7px 16px rgba(180, 135, 70, 0.22), -7px -7px 16px rgba(255, 249, 239, 0.95)',
        'neu-raised-lg': '12px 12px 26px rgba(180, 135, 70, 0.25), -12px -12px 26px rgba(255, 249, 239, 0.95)',
        // Neumorphism - Pressed (Debossed / Inset) Surfaces
        'neu-pressed-sm': 'inset 2px 2px 5px rgba(180, 135, 70, 0.25), inset -2px -2px 5px rgba(255, 249, 239, 0.85)',
        'neu-pressed': 'inset 4px 4px 8px rgba(180, 135, 70, 0.28), inset -4px -4px 8px rgba(255, 249, 239, 0.9)',
        // Neumorphism on Deep Navy
        'neu-navy': '5px 5px 14px rgba(6, 43, 76, 0.35), -3px -3px 10px rgba(255, 249, 239, 0.6)',
        'neu-navy-pressed': 'inset 3px 3px 6px rgba(2, 23, 41, 0.6), inset -2px -2px 5px rgba(10, 66, 117, 0.4)',
        // Neumorphism on Gold
        'neu-gold': '5px 5px 14px rgba(185, 130, 50, 0.35), -3px -3px 10px rgba(255, 249, 239, 0.7)',
      }
    },
  },
  plugins: [],
}
