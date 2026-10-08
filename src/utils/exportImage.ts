import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';

export interface ExportOptions {
  fileName?: string;
  pixelRatio?: number;
  preferShareOnMobile?: boolean;
}

export interface ExportResult {
  dataUrl: string;
  shared?: boolean;
  downloaded?: boolean;
}

/**
 * Converts a base64 dataURL to a binary Blob
 */
function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const byteString = atob(parts[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mime });
}

/**
 * Triggers a file download using a temporary Blob URL
 */
function downloadBlob(blob: Blob, fileName: string) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Clean up
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    URL.revokeObjectURL(blobUrl);
  }, 2000);
}

/**
 * Primary engine: html2canvas with custom background and CORS support
 */
async function captureWithHtml2Canvas(
  element: HTMLElement,
  pixelRatio: number
): Promise<string> {
  const canvas = await html2canvas(element, {
    scale: Math.min(pixelRatio, 2.5), // Optimal sharpness without exceeding memory limits on mobile
    backgroundColor: '#F7EBD5', // Marfil principal from church palette
    useCORS: true,
    allowTaint: true,
    logging: false,
    scrollX: 0,
    scrollY: 0,
    ignoreElements: (node) => {
      return node instanceof HTMLElement && node.dataset.exportIgnore === 'true';
    },
  });

  return canvas.toDataURL('image/png', 0.98);
}

/**
 * Secondary fallback engine: html-to-image with skipFonts enabled
 */
async function captureWithHtmlToImage(
  element: HTMLElement,
  pixelRatio: number
): Promise<string> {
  return await toPng(element, {
    quality: 0.98,
    pixelRatio: Math.min(pixelRatio, 2),
    backgroundColor: '#F7EBD5',
    skipFonts: true, // Prevents CORS errors on external Google Fonts
    filter: (node) => {
      if (node instanceof HTMLElement && node.dataset.exportIgnore === 'true') {
        return false;
      }
      return true;
    },
  });
}

/**
 * Exports a DOM node to a high-resolution PNG image with dual-engine fallback and mobile share support
 */
export async function exportElementAsPng(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<ExportResult> {
  const {
    fileName = 'Cronograma-Alabanza-AIEC.png',
    pixelRatio = 2.5,
    preferShareOnMobile = true,
  } = options;

  let dataUrl = '';

  // Try Primary Engine: html2canvas
  try {
    dataUrl = await captureWithHtml2Canvas(element, pixelRatio);
  } catch (canvasErr) {
    console.warn('html2canvas capture had issues, trying html-to-image fallback...', canvasErr);
    try {
      dataUrl = await captureWithHtmlToImage(element, pixelRatio);
    } catch (fallbackErr) {
      console.error('Both export engines failed:', fallbackErr);
      throw new Error('No se pudo generar la imagen del cronograma.');
    }
  }

  const blob = dataUrlToBlob(dataUrl);

  // Mobile Web Share API support with files (saves directly to Photos / WhatsApp on mobile!)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  if (preferShareOnMobile && isMobile && navigator.canShare) {
    try {
      const file = new File([blob], fileName, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Cronograma de Alabanza AIEC',
          text: 'Cronograma Mensual de Alabanza - Iglesia Nueva Jerusalén AIEC',
        });
        return { dataUrl, shared: true };
      }
    } catch (shareErr: unknown) {
      if ((shareErr as Error)?.name === 'AbortError') {
        // User dismissed share dialog
        return { dataUrl, shared: false };
      }
      console.warn('Mobile file share failed, falling back to download:', shareErr);
    }
  }

  // Standard or fallback file download
  downloadBlob(blob, fileName);
  return { dataUrl, downloaded: true };
}

/**
 * Generates a WhatsApp share URL with prefilled text and current page URL
 */
export function generateWhatsAppShareUrl(text: string, url?: string): string {
  const message = url ? `${text}\n\nEnlace: ${url}` : text;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/**
 * Triggers native Web Share API if supported, or falls back to WhatsApp link
 */
export async function shareSchedule(title: string, text: string, url: string): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      return true;
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        console.warn('Native share failed, falling back to WhatsApp:', err);
      } else {
        return false;
      }
    }
  }

  // Fallback to WhatsApp
  const waUrl = generateWhatsAppShareUrl(`${title}\n${text}`, url);
  window.open(waUrl, '_blank', 'noopener,noreferrer');
  return true;
}
