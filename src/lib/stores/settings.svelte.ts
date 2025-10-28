/**
 * App settings store with localStorage persistence
 */

import type { AppSettings, BackgroundConfig } from '$lib/types';
import { getFromLocalStorage, saveToLocalStorage } from './localStorage.svelte';
import { DEFAULT_GRADIENT } from '$lib/utils/gradients';

const STORAGE_KEY = 'xxxnaper-settings';

const defaultSettings: AppSettings = {
  padding: 40,
  inset: 0,
  borderRadius: 8,
  background: {
    type: 'gradient',
    value: DEFAULT_GRADIENT.value,
  },
  darkMode: 'system',
};

class SettingsStore {
  private state = $state<AppSettings>(
    getFromLocalStorage(STORAGE_KEY, defaultSettings)
  );

  get current(): AppSettings {
    return this.state;
  }

  get padding(): number {
    return this.state.padding;
  }

  get inset(): number {
    return this.state.inset;
  }

  get borderRadius(): number {
    return this.state.borderRadius;
  }

  get background(): BackgroundConfig {
    return this.state.background;
  }

  get darkMode(): 'light' | 'dark' | 'system' {
    return this.state.darkMode;
  }

  setPadding(value: number): void {
    this.state.padding = value;
    this.persist();
  }

  setInset(value: number): void {
    this.state.inset = value;
    this.persist();
  }

  setBorderRadius(value: number): void {
    this.state.borderRadius = value;
    this.persist();
  }

  setBackground(background: BackgroundConfig): void {
    this.state.background = background;
    this.persist();
  }

  setDarkMode(mode: 'light' | 'dark' | 'system'): void {
    this.state.darkMode = mode;
    this.persist();
    this.applyDarkMode();
  }

  private persist(): void {
    saveToLocalStorage(STORAGE_KEY, this.state);
  }

  // Apply dark mode to HTML element
  applyDarkMode(): void {
    if (typeof window === 'undefined') return;

    const html = document.documentElement;
    const mode = this.state.darkMode;

    if (mode === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
    } else if (mode === 'dark') {
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      // System preference
      html.classList.remove('light');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  }

  // Initialize dark mode on app load
  initDarkMode(): void {
    this.applyDarkMode();

    // Listen for system preference changes
    if (typeof window !== 'undefined' && this.state.darkMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.state.darkMode === 'system') {
          this.applyDarkMode();
        }
      });
    }
  }

  resetToDefaults(): void {
    this.state = defaultSettings;
    this.persist();
  }
}

export const settingsStore = new SettingsStore();
