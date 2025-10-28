# XXXnaper Design Guidelines

**Version:** 1.0
**Date:** 2025-10-27
**Status:** Production Ready
**Tech Stack:** Svelte 5 + Tailwind CSS 4 + TypeScript

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Specifications](#component-specifications)
6. [Animations & Interactions](#animations--interactions)
7. [Responsive Design](#responsive-design)
8. [Accessibility](#accessibility)
9. [Assets & Icons](#assets--icons)

---

## Design Philosophy

### Core Principles

**Hyper-Minimalism with Purpose**
- Remove non-essential elements
- Let content (screenshot preview) be the hero
- Use subtle depth through glassmorphism for controls
- Prioritize speed and clarity over decoration

**Mobile-First, Always**
- Start design at 375px width
- Touch targets minimum 44×44px
- Generous spacing for finger-friendly interactions
- Progressive enhancement for larger screens

**Professional Aesthetic**
- Match iOS native feel (Xnapper inspiration)
- Clean, neutral color palette
- Sophisticated gradients for backgrounds
- Smooth, purposeful animations

### Brand Values

1. **Simple** - One-tap beautification
2. **Professional** - High-quality output
3. **Fast** - Real-time preview, instant export
4. **Delightful** - Micro-interactions that feel good

---

## Color System

### Primary Palette

```css
:root {
  /* Neutrals (OKLCH-based, Tailwind-inspired) */
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;

  /* Brand Colors */
  --brand-primary: #667eea;    /* Purple-blue */
  --brand-secondary: #764ba2;  /* Deep purple */
  --brand-accent: #3b82f6;     /* Bright blue */

  /* Semantic Colors */
  --color-success: #10b981;    /* Green */
  --color-error: #ef4444;      /* Red */
  --color-warning: #f59e0b;    /* Amber */
  --color-info: #3b82f6;       /* Blue */

  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-canvas: #fafafa;
  --bg-panel: #ffffff;
  --bg-hover: #f5f5f5;

  /* Text Colors */
  --text-primary: #1a1a1a;     /* 17.6:1 contrast on white */
  --text-secondary: #737373;   /* 5.2:1 contrast on white */
  --text-tertiary: #a3a3a3;    /* Disabled, placeholders */
  --text-inverse: #ffffff;

  /* Border Colors */
  --border-default: #e5e5e5;
  --border-hover: #d4d4d4;
  --border-focus: #3b82f6;
}
```

### Gradient Presets (15 Curated)

#### Cool Tones (4)
```css
/* 1. Purple Dream */
.gradient-purple-dream {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 2. Ocean Breeze */
.gradient-ocean-breeze {
  background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
}

/* 3. Midnight Blue */
.gradient-midnight-blue {
  background: linear-gradient(135deg, #141e30 0%, #243b55 100%);
}

/* 4. Cool Mint */
.gradient-cool-mint {
  background: linear-gradient(135deg, #02aab0 0%, #00cdac 100%);
}
```

#### Warm Tones (4)
```css
/* 5. Sunset Bliss */
.gradient-sunset-bliss {
  background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
}

/* 6. Peachy Keen */
.gradient-peachy-keen {
  background: linear-gradient(135deg, #ed4264 0%, #ffedbc 100%);
}

/* 7. Sweet Morning */
.gradient-sweet-morning {
  background: linear-gradient(135deg, #ff5f6d 0%, #ffc371 100%);
}

/* 8. Orange Coral */
.gradient-orange-coral {
  background: linear-gradient(135deg, #ff9966 0%, #ff5e62 100%);
}
```

#### Vibrant Tones (4)
```css
/* 9. Purple Love */
.gradient-purple-love {
  background: linear-gradient(135deg, #cc2b5e 0%, #753a88 100%);
}

/* 10. Bloody Mary */
.gradient-bloody-mary {
  background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
}

/* 11. Cosmic Night */
.gradient-cosmic-night {
  background: linear-gradient(135deg, #4568dc 0%, #b06ab3 100%);
}

/* 12. Lush Green */
.gradient-lush-green {
  background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%);
}
```

#### Neutral/Pastel Tones (3)
```css
/* 13. Soft Pink */
.gradient-soft-pink {
  background: linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%);
}

/* 14. Pale Wood */
.gradient-pale-wood {
  background: linear-gradient(135deg, #eacda3 0%, #d6ae7b 100%);
}

/* 15. Decent Gray */
.gradient-decent-gray {
  background: linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%);
}
```

### Dark Mode Support

**Implementation**: Use Tailwind's `class` strategy with manual toggle (user preference stored in localStorage).

```css
/* Light Mode (default) */
:root {
  /* Already defined above */
}

/* Dark Mode */
.dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #262626;
  --bg-canvas: #171717;
  --bg-panel: #1f1f1f;
  --bg-hover: #2a2a2a;

  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --text-tertiary: #737373;
  --text-inverse: #1a1a1a;

  --border-default: #404040;
  --border-hover: #525252;
  --border-focus: #3b82f6;
}

/* Also respect system preference */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --bg-primary: #1a1a1a;
    --bg-secondary: #262626;
    --bg-canvas: #171717;
    --bg-panel: #1f1f1f;
    --bg-hover: #2a2a2a;

    --text-primary: #ffffff;
    --text-secondary: #a3a3a3;
    --text-tertiary: #737373;
    --text-inverse: #1a1a1a;

    --border-default: #404040;
    --border-hover: #525252;
  }
}
```

**Dark Mode Toggle Component**:
- Sun/Moon icon button in header
- Smooth transition between modes (200ms)
- Persists preference in localStorage
- 3 states: Light, Dark, System (auto)

---

## Typography

### Font Family

**Primary:** Inter (Variable Font)

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Why Inter:**
- 95% visual match to iOS San Francisco
- Optimized for UI/screen readability
- Large x-height for small sizes
- Free, open-source, Vietnamese language support

### Type Scale (1.2 Minor Third Ratio)

```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px - Micro labels */
  --text-sm: 0.875rem;     /* 14px - Helper text, captions */
  --text-base: 1rem;       /* 16px - Body text, labels */
  --text-lg: 1.125rem;     /* 18px - Buttons, important labels */
  --text-xl: 1.25rem;      /* 20px - Section headers */
  --text-2xl: 1.5rem;      /* 24px - Page titles */
  --text-3xl: 1.875rem;    /* 30px - Hero text */
  --text-4xl: 2.25rem;     /* 36px - Large titles */

  /* Line Heights */
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;

  /* Letter Spacing */
  --tracking-tight: -0.01em;
  --tracking-normal: 0;
  --tracking-wide: 0.01em;
  --tracking-wider: 0.02em;
  --tracking-widest: 0.05em;
}
```

### Typography Usage

```css
/* Body Text */
.text-body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-primary);
}

/* Small Text (Helper, Caption) */
.text-helper {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
  letter-spacing: var(--tracking-wider);
}

/* Button Text */
.text-button {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
}

/* Section Header */
.text-section-header {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

/* Page Title */
.text-page-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}
```

### Mobile Adjustments

```css
@media (max-width: 767px) {
  :root {
    /* Prevent iOS auto-zoom on inputs */
    --text-base: 1.0625rem;  /* 17px minimum */
    --text-sm: 0.9375rem;    /* 15px */
  }
}
```

---

## Spacing & Layout

### Spacing Scale (4px Base Unit)

```css
:root {
  /* Base unit: 4px */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px - Tight */
  --space-2: 0.5rem;    /* 8px - Close */
  --space-3: 0.75rem;   /* 12px - Cozy */
  --space-4: 1rem;      /* 16px - Default */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px - Comfortable */
  --space-8: 2rem;      /* 32px - Loose */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px - Section */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px - Major */

  /* Semantic Spacing */
  --space-touch-min: 2.75rem;      /* 44px - Touch target */
  --space-page-margin-mobile: 1rem;    /* 16px */
  --space-page-margin-tablet: 2rem;    /* 32px */
  --space-page-margin-desktop: 5rem;   /* 80px */
}
```

### Layout Grid

**Mobile (375px - 767px):**
- Margins: 16px
- Columns: 4
- Gutter: 8px
- Canvas padding: 16px
- Control panel padding: 16px
- Section gap: 24px

**Tablet (768px - 1023px):**
- Margins: 32px
- Columns: 8
- Gutter: 16px
- Canvas padding: 24px
- Control panel padding: 24px
- Section gap: 32px

**Desktop (1024px+):**
- Margins: 80px (max-width: 1440px)
- Columns: 12
- Gutter: 24px
- Canvas padding: 32px
- Control panel width: 320px - 400px
- Section gap: 40px

### Touch Target Sizing

**Minimum Sizes (WCAG AAA):**
- Touch targets: 44×44px
- Icon buttons: 44×44px (icon 24px inside)
- Color swatches: 44×44px
- Slider thumb: 20px visual, 44px touch area
- Minimum spacing between targets: 8px

### Internal ≤ External Rule

```css
/* Good: Internal padding ≤ External margin */
.card {
  padding: var(--space-4);  /* 16px internal */
}

.card-grid {
  gap: var(--space-6);      /* 24px external */
}

/* Bad: Don't do this */
.bad-card {
  padding: var(--space-6);  /* 24px internal */
  margin: var(--space-4);   /* 16px external - breaks visual grouping */
}
```

---

## Component Specifications

### 1. Buttons

#### Primary Button
```css
.btn-primary {
  /* Layout */
  min-height: 44px;
  padding: var(--space-3) var(--space-6); /* 12px 24px */
  border-radius: 8px;

  /* Typography */
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  color: var(--text-inverse);

  /* Colors */
  background: var(--brand-accent);
  border: none;

  /* Effects */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 150ms ease;
}

.btn-primary:hover {
  background: #2563eb; /* Darker shade */
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
```

#### Secondary Button
```css
.btn-secondary {
  min-height: 44px;
  padding: var(--space-3) var(--space-6);
  border-radius: 8px;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  transition: all 150ms ease;
}

.btn-secondary:hover {
  background: var(--bg-hover);
  border-color: var(--border-hover);
}
```

#### Icon Button
```css
.btn-icon {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  transition: all 150ms ease;
}

.btn-icon:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.btn-icon svg {
  width: 24px;
  height: 24px;
}
```

### 2. Sliders

```css
.slider-control {
  /* Container */
  display: flex;
  flex-direction: column;
  gap: var(--space-2); /* 8px between label and slider */
}

.slider-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.slider-value {
  font-weight: var(--font-medium);
  color: var(--brand-accent);
  font-variant-numeric: tabular-nums;
}

.slider-input {
  -webkit-appearance: none;
  width: 100%;
  height: 44px; /* Touch target */
  background: transparent;
  cursor: pointer;
}

/* Track */
.slider-input::-webkit-slider-track {
  height: 4px;
  background: var(--neutral-200);
  border-radius: 2px;
}

.slider-input::-moz-range-track {
  height: 4px;
  background: var(--neutral-200);
  border-radius: 2px;
}

/* Thumb */
.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--brand-accent);
  cursor: grab;
  margin-top: -8px; /* Center on track */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 150ms ease;
}

.slider-input:active::-webkit-slider-thumb {
  cursor: grabbing;
  transform: scale(1.1);
}

.slider-input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: var(--brand-accent);
  cursor: grab;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

### 3. Color Swatches

```css
.color-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2); /* 8px between swatches */
}

.color-swatch {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: var(--swatch-color);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 150ms ease;
  -webkit-tap-highlight-color: transparent;
}

.color-swatch:hover {
  transform: scale(1.05);
}

.color-swatch:active {
  transform: scale(0.95);
}

.color-swatch[aria-selected="true"] {
  border-color: var(--brand-accent);
  box-shadow: 0 0 0 2px var(--bg-panel),
              0 0 0 4px var(--brand-accent);
}
```

### 4. File Input Zone

```css
.file-input-zone {
  /* Layout */
  min-height: 200px;
  padding: var(--space-8);
  border-radius: 12px;

  /* Visual */
  border: 2px dashed var(--border-default);
  background: var(--bg-secondary);

  /* Flexbox */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);

  /* Typography */
  text-align: center;
  color: var(--text-secondary);

  /* Interaction */
  cursor: pointer;
  transition: all 200ms ease;
}

.file-input-zone:hover {
  border-color: var(--brand-accent);
  background: var(--bg-hover);
}

.file-input-zone.drag-active {
  border-color: var(--brand-accent);
  background: rgba(59, 130, 246, 0.05);
  border-style: solid;
}
```

### 5. Canvas Container & Image Preview

**IMPORTANT**: The Border Radius slider (0-50px) applies ONLY to the image container (the screenshot), NOT to the parent canvas frame.

```css
.canvas-container {
  /* Layout */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4); /* 16px mobile */

  /* Background */
  background: var(--bg-canvas);

  /* Overflow */
  overflow: auto;

  /* NO border-radius on the canvas frame itself */
}

/* The parent frame that contains gradient background + image */
.canvas-frame {
  /* This is where padding creates space around the image */
  /* Background gradient is applied here */
  /* NO border-radius - keep corners sharp */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* The actual image container - THIS gets border-radius */
.canvas-image {
  /* Constraints */
  max-width: 100%;
  max-height: 100%;

  /* Visual - ONLY the image gets rounded corners */
  border-radius: 8px; /* Default, controlled by Border Radius slider (0-50px) */
  overflow: hidden; /* Clip image to border radius */

  /* Shadow for depth */
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.07),
    0 10px 15px rgba(0, 0, 0, 0.1);

  /* Transition */
  transition: all 300ms ease;
}

/* The actual <img> element */
.canvas-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (min-width: 768px) {
  .canvas-container {
    padding: var(--space-6); /* 24px tablet */
  }
}

@media (min-width: 1024px) {
  .canvas-container {
    padding: var(--space-8); /* 32px desktop */
  }
}
```

### 6. Control Panel

```css
.control-panel {
  /* Mobile: Bottom sheet */
  background: var(--bg-panel);
  border-top: 1px solid var(--border-default);
  padding: var(--space-4);
  max-height: 50vh;
  overflow-y: auto;

  /* Layout */
  display: flex;
  flex-direction: column;
  gap: var(--space-6); /* 24px between sections */
}

.control-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3); /* 12px heading to controls */
}

.control-heading {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  margin: 0;
}

/* Tablet/Desktop: Sidebar */
@media (min-width: 768px) {
  .control-panel {
    width: 320px;
    max-width: 400px;
    max-height: none;
    border-top: none;
    border-left: 1px solid var(--border-default);
    padding: var(--space-6);
    gap: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .control-panel {
    padding: var(--space-8);
  }
}
```

### 7. Cards

```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  padding: var(--space-4);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 150ms ease;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### 8. Glassmorphic Modal

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: var(--space-6);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
}

@media (prefers-color-scheme: dark) {
  .modal-content {
    background: rgba(26, 26, 26, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }
}
```

---

## Animations & Interactions

### Transition Durations

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;

  --easing-ease: ease;
  --easing-ease-in: ease-in;
  --easing-ease-out: ease-out;
  --easing-ease-in-out: ease-in-out;
  --easing-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Animation Patterns

```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn var(--duration-normal) var(--easing-ease-out);
}

/* Slide Up (for modals, bottom sheets) */
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-up {
  animation: slideUp var(--duration-normal) var(--easing-ease-out);
}

/* Scale In (for tooltips, popovers) */
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.scale-in {
  animation: scaleIn var(--duration-fast) var(--easing-ease-out);
}

/* Skeleton Loading */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--neutral-200) 25%,
    var(--neutral-300) 50%,
    var(--neutral-200) 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

### Hover States

```css
/* Standard hover effect */
.interactive:hover {
  transform: translateY(-1px);
  transition: transform var(--duration-fast) var(--easing-ease-out);
}

.interactive:active {
  transform: translateY(0);
}
```

### Loading States

```css
.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--neutral-200);
  border-top-color: var(--brand-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Design

### Breakpoints

```css
:root {
  --breakpoint-xs: 320px;   /* iPhone SE */
  --breakpoint-sm: 375px;   /* iPhone 12/13 */
  --breakpoint-md: 428px;   /* iPhone 14 Pro Max */
  --breakpoint-lg: 768px;   /* iPad Mini */
  --breakpoint-xl: 1024px;  /* iPad Pro */
  --breakpoint-2xl: 1440px; /* Desktop */
}
```

### Layout Patterns

**Mobile (< 768px):**
```
┌─────────────────────┐
│  Header             │
├─────────────────────┤
│                     │
│  Canvas Area        │
│  (60vh)             │
│                     │
├─────────────────────┤
│  Control Panel      │
│  (Bottom Sheet)     │
│  (max 40vh)         │
└─────────────────────┘
```

**Desktop (≥ 768px):**
```
┌────────────────────────────────────┐
│  Header                            │
├──────────────────────┬─────────────┤
│                      │  Control    │
│  Canvas Area         │  Panel      │
│  (flex: 1)           │  (320px)    │
│                      │             │
└──────────────────────┴─────────────┘
```

### Responsive Classes

```css
/* Container */
.container {
  width: 100%;
  margin-inline: var(--space-4);
  max-width: 1440px;
}

@media (min-width: 768px) {
  .container {
    margin-inline: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .container {
    margin-inline: var(--space-20);
  }
}

/* Show/Hide Utilities */
.sm\:hidden { display: none; }
@media (min-width: 768px) {
  .sm\:hidden { display: revert; }
}

.lg\:hidden { display: revert; }
@media (min-width: 1024px) {
  .lg\:hidden { display: none; }
}
```

---

## Accessibility

### WCAG 2.1 Compliance (AA Minimum)

**Color Contrast:**
- Normal text: 4.5:1 minimum
- Large text (≥18pt): 3:1 minimum
- UI components: 3:1 minimum

**Tested Pairings:**
```
#1a1a1a on #ffffff = 17.6:1 ✅ AAA
#737373 on #ffffff = 5.2:1  ✅ AA
#3b82f6 on #ffffff = 3.1:1  ✅ AA (large text/UI)
```

### Keyboard Navigation

```css
/* Focus Indicator */
*:focus-visible {
  outline: 2px solid var(--brand-accent);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Skip to Content Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--bg-primary);
  padding: var(--space-2) var(--space-4);
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### ARIA Labels

```html
<!-- Buttons -->
<button aria-label="Download PNG">
  <svg>...</svg>
</button>

<!-- Sliders -->
<label>
  <span>Padding</span>
  <input
    type="range"
    aria-label="Padding slider"
    aria-valuemin="0"
    aria-valuemax="200"
    aria-valuenow="40"
    aria-valuetext="40 pixels"
  />
</label>

<!-- Color Swatches -->
<button
  class="color-swatch"
  aria-label="Purple Dream gradient"
  aria-selected="true"
  role="radio"
>
</button>
```

### Screen Reader Support

```html
<!-- Loading State -->
<div aria-live="polite" aria-busy="true">
  <span class="sr-only">Loading image...</span>
</div>

<!-- Success Message -->
<div role="status" aria-live="polite">
  <span class="sr-only">Image exported successfully</span>
</div>
```

---

## Assets & Icons

### Icon System

**Library:** Heroicons (Outline style)
**Size:** 24×24px (icon), 44×44px (touch target)
**Color:** Inherit from parent

**Required Icons:**
- Upload: `arrow-up-tray`
- Download: `arrow-down-tray`
- Copy: `clipboard`
- Share: `share`
- Settings: `cog-6-tooth`
- Close: `x-mark`
- Check: `check`
- Photo: `photo`
- Trash: `trash`

### Logo

**Specifications:**
- Format: SVG (vector)
- Size: 40×40px (header), 100×100px (landing page)
- Color: Brand primary (#667eea) or white (on dark bg)

### Gradient Preview Thumbnails

**Specifications:**
- Size: 44×44px (mobile), 48×48px (desktop)
- Format: CSS background (no image files needed)
- Border radius: 8px
- Border: 2px solid transparent (4px when selected)

### Screenshot Placeholder

**Empty State:**
- Size: 600×400px (responsive)
- Background: #f5f5f5
- Icon: Upload icon (64×64px, #a3a3a3)
- Text: "Drop image here or click to upload"

---

## Tailwind Configuration

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        brand: {
          primary: '#667eea',
          secondary: '#764ba2',
          accent: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
}
```

---

## Implementation Notes

### Performance

1. **Use CSS transforms** for animations (GPU-accelerated)
2. **Lazy load gradients** if implementing >20 presets
3. **Preload Inter font** in `<head>`
4. **Use `will-change` sparingly** on interactive elements only

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

### Testing Checklist

- [ ] WCAG AA contrast ratios
- [ ] Touch targets ≥ 44×44px
- [ ] Keyboard navigation works
- [ ] Screen reader announces states
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Works on 375px width (iPhone SE)
- [ ] Works on 1440px+ (desktop)
- [ ] Dark mode toggle works
- [ ] Vietnamese characters render correctly

---

**Last Updated:** 2025-10-27
**Next Review:** Q1 2026
