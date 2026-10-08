# Cronograma de Alabanza - Iglesia Nueva Jerusalén A.I.E.C

Aplicación web estática moderna, reactiva y de alto rendimiento para la gestión y difusión del cronograma de actividades y ensayos del **Ministerio de Alabanza** de la **Iglesia Nueva Jerusalén A.I.E.C** (San Marcos, Sucre).

---

## 🚀 Características Principales

1. **Encabezado Institucional Oficial:**
   - Cumple con la identidad formal de la A.I.E.C (San Marcos, Sucre).
   - Personería Jurídica 595 de 08 de abril de 1997, lema institucional y distintivo de *ALABANZA*.

2. **Sistema de Diseño Neumórfico (Soft UI) & Paleta Oficial:**
   - Paleta oficial: Azul marino profundo (`#062B4C`), Dorado mate (`#B98232`), Marfil principal (`#F7EBD5`), Crema cálido (`#F1DFC2`), Beige dorado (`#E5CFA5`) y Blanco cálido (`#FFF9EF`).
   - Sombras y relieves neumórficos armónicos con el tono marfil institucional.

3. **Doble Vista Responsiva Inteligente (Dual-View):**
   - **Móvil (< 1024px):** Vista predeterminada en **Lista cronológica / Timeline** con tarjetas amplias para interacción táctil.
   - **Escritorio / Tablet (>= 1024px):** Vista predeterminada en **Cuadrícula mensual de calendario**.
   - Selector directo para alternar libremente entre *Cuadrícula* y *Lista*.

4. **Filtros Dinámicos por Ministerio:**
   - Filtro rápido por: *Todos*, *United Worship*, *Herederos del Reino*, *Grupo Rafael Quiñonez*, y *Congregacional*.

5. **Horarios de Ensayos Regulares:**
   - Franja visual con los días y horarios fijos semanales (incluyendo alertas de días festivos).

6. **Motor de Exportación HD y Difusión:**
   - **Descarga y Guardado de Imagen HD (300 DPI / PNG):** Renderizado con motor dual (`html2canvas` + `html-to-image`) y soporte para guardado directo en la galería de fotos en dispositivos móviles.
   - **Compartir en WhatsApp:** Comparte el resumen del mes o un evento individual con un solo clic.

7. **PWA y Soporte Offline:**
   - Service Worker y Web Manifest para instalación en dispositivos móviles y funcionamiento sin conexión.

---

## 🛠️ Tecnologías

- **Framework:** React 18 + Vite + TypeScript
- **Estilos:** Tailwind CSS (Neumorfismo institucional y paleta A.I.E.C)
- **Iconografía:** Lucide React
- **Fechas:** Date-fns
- **Exportación HD:** html2canvas + html-to-image
- **PWA:** vite-plugin-pwa
- **Deploy:** GitHub Pages & GitHub Actions

---

## 💻 Comandos de Ejecución

### 1. Iniciar en modo desarrollo
```bash
npm run dev
```

### 2. Construir para producción
```bash
npm run build
```

### 3. Previsualizar la compilación localmente
```bash
npm run preview
```

---

## 🌐 Despliegue en GitHub Pages

El proyecto está configurado para desplegarse en GitHub Pages de dos maneras:

### Opción 1: Automática con GitHub Actions (Recomendada)
El repositorio incluye el flujo de trabajo en `.github/workflows/deploy.yml`. Cada vez que hagas `git push` a la rama `main` o `develop`, GitHub Actions compilará y desplegará automáticamente la aplicación.

*Nota:* En tu repositorio en GitHub, ve a **Settings > Pages > Build and deployment > Source** y asegúrate de seleccionar **GitHub Actions**.

### Opción 2: Manual mediante script
```bash
npm run deploy
```
Este comando compila el proyecto y publica la carpeta `dist` en la rama `gh-pages`.
