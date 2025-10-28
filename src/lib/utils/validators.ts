/**
 * File validation utilities
 */

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate image file type and size
 */
export function validateImageFile(file: File): ValidationResult {
  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: PNG, JPG, WEBP, GIF`,
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size: 10MB`,
    };
  }

  return { valid: true };
}

/**
 * Check if clipboard contains image data
 */
export function hasImageInClipboard(items: DataTransferItemList): boolean {
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.startsWith('image/')) {
      return true;
    }
  }
  return false;
}

/**
 * Get image file from clipboard
 */
export function getImageFromClipboard(items: DataTransferItemList): File | null {
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.startsWith('image/')) {
      return items[i].getAsFile();
    }
  }
  return null;
}
