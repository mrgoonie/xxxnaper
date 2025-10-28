/**
 * File handling utilities for upload, paste, and drag-drop
 */

import { validateImageFile, getImageFromClipboard } from './validators';

export interface FileLoadResult {
  success: boolean;
  url?: string;
  file?: File;
  width?: number;
  height?: number;
  error?: string;
}

/**
 * Load image file and return data URL with dimensions
 */
export async function loadImageFile(file: File): Promise<FileLoadResult> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const url = e.target?.result as string;
      const img = new Image();

      img.onload = () => {
        resolve({
          success: true,
          url,
          file,
          width: img.width,
          height: img.height,
        });
      };

      img.onerror = () => {
        resolve({
          success: false,
          error: 'Failed to load image',
        });
      };

      img.src = url;
    };

    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Failed to read file',
      });
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Handle file upload from input element
 */
export async function handleFileUpload(input: HTMLInputElement): Promise<FileLoadResult> {
  const file = input.files?.[0];
  if (!file) {
    return {
      success: false,
      error: 'No file selected',
    };
  }

  return loadImageFile(file);
}

/**
 * Handle paste event from clipboard
 */
export async function handlePaste(event: ClipboardEvent): Promise<FileLoadResult> {
  const items = event.clipboardData?.items;
  if (!items) {
    return {
      success: false,
      error: 'No clipboard data',
    };
  }

  const file = getImageFromClipboard(items);
  if (!file) {
    return {
      success: false,
      error: 'No image in clipboard',
    };
  }

  return loadImageFile(file);
}

/**
 * Handle drag and drop event
 */
export async function handleDrop(event: DragEvent): Promise<FileLoadResult> {
  event.preventDefault();

  const files = event.dataTransfer?.files;
  if (!files || files.length === 0) {
    return {
      success: false,
      error: 'No files dropped',
    };
  }

  const file = files[0];
  return loadImageFile(file);
}
