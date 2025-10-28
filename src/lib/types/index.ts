/**
 * TypeScript type definitions for XXXnaper
 */

export interface AppSettings {
  padding: number;
  inset: number;
  borderRadius: number;
  background: BackgroundConfig;
  darkMode: 'light' | 'dark' | 'system';
}

export interface BackgroundConfig {
  type: 'gradient' | 'image';
  value: string; // gradient CSS or image URL
}

export interface ImageState {
  url: string | null;
  file: File | null;
  width: number;
  height: number;
}

export interface GradientPreset {
  id: string;
  name: string;
  value: string; // CSS gradient string
}

export interface ExportOptions {
  format: 'png' | 'jpg';
  quality?: number; // 0-1, for JPG only
}

export type ExportAction = 'download' | 'copy' | 'share';
