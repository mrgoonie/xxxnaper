/**
 * Image export utilities using html-to-image
 */

import { toPng, toJpeg, toBlob } from 'html-to-image';
import type { ExportOptions } from '$lib/types';

export interface ExportResult {
  success: boolean;
  dataUrl?: string;
  blob?: Blob;
  error?: string;
}

/**
 * Export canvas frame to data URL
 */
export async function exportToDataUrl(
  element: HTMLElement,
  options: ExportOptions
): Promise<ExportResult> {
  try {
    let dataUrl: string;

    if (options.format === 'png') {
      dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2, // 2x for retina displays
      });
    } else {
      // JPG format
      dataUrl = await toJpeg(element, {
        quality: options.quality || 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff', // JPG doesn't support transparency
      });
    }

    return {
      success: true,
      dataUrl,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Export failed',
    };
  }
}

/**
 * Export canvas frame to blob
 */
export async function exportToBlob(
  element: HTMLElement,
  options: ExportOptions
): Promise<ExportResult> {
  try {
    const blob = await toBlob(element, {
      quality: options.format === 'png' ? 1 : options.quality || 0.95,
      pixelRatio: 2,
    });

    if (!blob) {
      return {
        success: false,
        error: 'Failed to create blob',
      };
    }

    return {
      success: true,
      blob,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Export failed',
    };
  }
}

/**
 * Download image file
 */
export async function downloadImage(
  element: HTMLElement,
  filename: string,
  options: ExportOptions
): Promise<ExportResult> {
  const result = await exportToDataUrl(element, options);

  if (!result.success || !result.dataUrl) {
    return result;
  }

  try {
    const link = document.createElement('a');
    link.download = `${filename}.${options.format}`;
    link.href = result.dataUrl;
    link.click();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Download failed',
    };
  }
}

/**
 * Copy image to clipboard
 */
export async function copyToClipboard(
  element: HTMLElement,
  options: ExportOptions
): Promise<ExportResult> {
  const result = await exportToBlob(element, options);

  if (!result.success || !result.blob) {
    return result;
  }

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        [result.blob.type]: result.blob,
      }),
    ]);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Copy failed',
    };
  }
}

/**
 * Share image using Web Share API
 */
export async function shareImage(
  element: HTMLElement,
  filename: string,
  options: ExportOptions
): Promise<ExportResult> {
  // Check if Web Share API is supported
  if (!navigator.share || !navigator.canShare) {
    return {
      success: false,
      error: 'Web Share API not supported',
    };
  }

  const result = await exportToBlob(element, options);

  if (!result.success || !result.blob) {
    return result;
  }

  try {
    const file = new File([result.blob], `${filename}.${options.format}`, {
      type: result.blob.type,
    });

    const shareData = {
      files: [file],
      title: 'XXXnaper Screenshot',
      text: 'Beautiful screenshot created with XXXnaper',
    };

    if (navigator.canShare(shareData)) {
      await navigator.share(shareData);
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Cannot share this file',
      };
    }
  } catch (error) {
    // User cancelled share or error occurred
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error: 'Share cancelled',
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Share failed',
    };
  }
}
