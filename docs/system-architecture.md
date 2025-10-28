# XXXnaper System Architecture

**Version:** 1.0
**Date:** 2025-10-27
**Status:** Production
**Type:** Client-Side SPA

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Application Structure](#application-structure)
3. [Component Hierarchy](#component-hierarchy)
4. [State Management](#state-management)
5. [Data Flow](#data-flow)
6. [Build Process](#build-process)
7. [Deployment Architecture](#deployment-architecture)
8. [Performance Architecture](#performance-architecture)
9. [Security Architecture](#security-architecture)

---

## Architecture Overview

### High-Level Architecture

XXXnaper is a **100% client-side single-page application (SPA)** with zero backend dependencies. All image processing, state management, and export operations occur in the browser.

```
┌─────────────────────────────────────────────────────────┐
│                   Browser Environment                    │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │              Svelte 5 Application                  │ │
│  │                                                    │ │
│  │  ┌──────────────┐  ┌──────────────┐             │ │
│  │  │  Components  │  │    Stores    │             │ │
│  │  │  (UI Layer)  │  │ (State Mgmt) │             │ │
│  │  └──────┬───────┘  └──────┬───────┘             │ │
│  │         │                   │                     │ │
│  │         └───────────┬───────┘                     │ │
│  │                     │                             │ │
│  │         ┌───────────▼──────────┐                 │ │
│  │         │   Utility Functions  │                 │ │
│  │         │  (Business Logic)    │                 │ │
│  │         └──────────────────────┘                 │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │             Browser APIs                           │ │
│  │  • File API  • Clipboard API  • Canvas API        │ │
│  │  • localStorage  • matchMedia  • Share API        │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Architecture Characteristics

| Characteristic | Value | Description |
|---------------|-------|-------------|
| **Type** | Client-side SPA | No server required |
| **Backend** | None | 100% browser-based |
| **State** | In-memory + localStorage | No database |
| **Deployment** | Static hosting | CDN-friendly |
| **Bundle** | 38.7KB gzipped | Single bundle |
| **Runtime** | Modern browsers | ES2020+ |

---

## Application Structure

### Project Layout

```
xxxnaper/
├── src/                          # Source code
│   ├── lib/                      # Library code
│   │   ├── components/           # Svelte components
│   │   │   ├── ui/               # Reusable UI components
│   │   │   │   ├── Button.svelte         # Generic button
│   │   │   │   ├── ColorSwatch.svelte    # Color selector
│   │   │   │   └── Slider.svelte         # Range input
│   │   │   ├── BackgroundPicker.svelte   # Gradient selector
│   │   │   ├── ControlPanel.svelte       # Settings panel
│   │   │   ├── DarkModeToggle.svelte     # Theme switcher
│   │   │   ├── ExportMenu.svelte         # Export options
│   │   │   ├── FileInput.svelte          # Image input
│   │   │   ├── Header.svelte             # App header
│   │   │   └── ImageCanvas.svelte        # Preview canvas
│   │   ├── stores/               # State management
│   │   │   ├── image.ts          # Image state
│   │   │   ├── settings.ts       # App settings
│   │   │   └── localStorage.ts   # Persistence utils
│   │   ├── types/                # TypeScript definitions
│   │   │   └── index.ts          # Type exports
│   │   └── utils/                # Utility functions
│   │       ├── exportImage.ts    # Export logic
│   │       ├── fileHandlers.ts   # File I/O
│   │       ├── gradients.ts      # Gradient presets
│   │       └── validators.ts     # Input validation
│   ├── App.svelte                # Root component
│   ├── app.css                   # Global styles
│   └── main.ts                   # Entry point
├── public/                       # Static assets
├── index.html                    # HTML template
├── vite.config.ts                # Build config
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind config
└── package.json                  # Dependencies
```

### Layer Architecture

```
┌───────────────────────────────────────┐
│        Presentation Layer             │
│  (Svelte Components - UI)             │
│  - BackgroundPicker                   │
│  - ControlPanel                       │
│  - ImageCanvas                        │
│  - ExportMenu                         │
└────────────┬──────────────────────────┘
             │
             ▼
┌───────────────────────────────────────┐
│      State Management Layer           │
│  (Svelte Stores - $state runes)       │
│  - settingsStore                      │
│  - imageStore                         │
└────────────┬──────────────────────────┘
             │
             ▼
┌───────────────────────────────────────┐
│       Business Logic Layer            │
│  (Utility Functions)                  │
│  - validateImageFile()                │
│  - exportToPNG()                      │
│  - handleFileUpload()                 │
└────────────┬──────────────────────────┘
             │
             ▼
┌───────────────────────────────────────┐
│         Browser API Layer             │
│  (Native Web APIs)                    │
│  - File API, Canvas API               │
│  - Clipboard API, Share API           │
│  - localStorage, matchMedia           │
└───────────────────────────────────────┘
```

---

## Component Hierarchy

### Component Tree

```
App.svelte (Root)
├── Header.svelte
│   ├── DarkModeToggle.svelte
│   └── ExportMenu.svelte
│       └── Button.svelte (×3)
│
├── FileInput.svelte
│   └── (Input zone with drag-drop)
│
├── ImageCanvas.svelte
│   └── (Canvas with live preview)
│
└── ControlPanel.svelte
    ├── Slider.svelte (Padding)
    ├── Slider.svelte (Inset)
    ├── Slider.svelte (Border Radius)
    └── BackgroundPicker.svelte
        └── ColorSwatch.svelte (×15)
```

### Component Responsibilities

| Component | Responsibility | State Access |
|-----------|----------------|--------------|
| **App.svelte** | Root layout, orchestration | None (passes to children) |
| **Header.svelte** | App title, theme toggle, export | settingsStore, imageStore |
| **FileInput.svelte** | Image upload/paste/drop | imageStore (write) |
| **ImageCanvas.svelte** | Live preview rendering | imageStore, settingsStore (read) |
| **ControlPanel.svelte** | Settings controls | settingsStore (read/write) |
| **BackgroundPicker.svelte** | Gradient selection | settingsStore (write) |
| **ExportMenu.svelte** | Export actions | imageStore (read) |
| **DarkModeToggle.svelte** | Theme switching | settingsStore (write) |

### Component Communication

```
┌─────────────────────────────────────────────┐
│         Svelte Stores (Single Source)       │
│  - settingsStore (padding, inset, bg, etc.) │
│  - imageStore (url, file, dimensions)       │
└──────────────┬──────────────────────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
┌─────────────┐  ┌─────────────┐
│  Component  │  │  Component  │
│  (Reader)   │  │  (Writer)   │
│             │  │             │
│ $effect(() =>│  │ store.set() │
│   { ... })  │  │             │
└─────────────┘  └─────────────┘
```

**Pattern:** Unidirectional data flow via stores (no prop drilling).

---

## State Management

### Store Architecture

XXXnaper uses **class-based stores** with Svelte 5 `$state` runes.

#### Settings Store

```typescript
class SettingsStore {
  private state = $state<AppSettings>({
    padding: 40,
    inset: 0,
    borderRadius: 8,
    background: { type: 'gradient', value: '...' },
    darkMode: 'system',
  });

  // Getters (read)
  get padding(): number { return this.state.padding; }
  get background(): BackgroundConfig { return this.state.background; }

  // Setters (write)
  setPadding(value: number): void {
    this.state.padding = value;
    this.persist(); // Auto-save to localStorage
  }

  setBackground(bg: BackgroundConfig): void {
    this.state.background = bg;
    this.persist();
  }

  private persist(): void {
    localStorage.setItem('xxxnaper-settings', JSON.stringify(this.state));
  }
}

export const settingsStore = new SettingsStore();
```

#### Image Store

```typescript
class ImageStore {
  private state = $state<ImageState>({
    url: null,
    file: null,
    width: 0,
    height: 0,
  });

  get url(): string | null { return this.state.url; }
  get file(): File | null { return this.state.file; }

  setImage(file: File, url: string, width: number, height: number): void {
    this.state = { url, file, width, height };
  }

  clear(): void {
    if (this.state.url) {
      URL.revokeObjectURL(this.state.url); // Memory cleanup
    }
    this.state = { url: null, file: null, width: 0, height: 0 };
  }
}

export const imageStore = new ImageStore();
```

### State Persistence

```
┌────────────────────────────────────────┐
│         Application State              │
│  (In-memory, reactive via $state)      │
└─────────────┬──────────────────────────┘
              │
              │ Auto-sync on change
              ▼
┌────────────────────────────────────────┐
│         localStorage                   │
│  Key: 'xxxnaper-settings'              │
│  Value: JSON.stringify(state)          │
│  Persistence: Cross-session            │
└────────────────────────────────────────┘
```

**Persisted Data:**
- User settings (padding, inset, borderRadius, background, darkMode)

**Non-Persisted Data:**
- Image state (cleared on page reload for privacy)

---

## Data Flow

### Image Upload Flow

```
┌────────────┐
│    User    │
│  (Upload)  │
└─────┬──────┘
      │
      ▼
┌─────────────────────────┐
│  FileInput.svelte       │
│  - Validate file type   │
│  - Validate file size   │
└─────┬───────────────────┘
      │
      ▼ (if valid)
┌─────────────────────────┐
│  handleFileUpload()     │
│  - Read file as URL     │
│  - Load image dimensions│
└─────┬───────────────────┘
      │
      ▼
┌─────────────────────────┐
│  imageStore.setImage()  │
│  - Update state         │
└─────┬───────────────────┘
      │
      ▼ (reactive)
┌─────────────────────────┐
│  ImageCanvas.svelte     │
│  - Render preview       │
│  - Apply CSS transforms │
└─────────────────────────┘
```

### Settings Update Flow

```
┌────────────┐
│    User    │
│ (Slider)   │
└─────┬──────┘
      │
      ▼
┌─────────────────────────┐
│  Slider.svelte          │
│  - $bindable(value)     │
│  - onchange callback    │
└─────┬───────────────────┘
      │
      ▼
┌─────────────────────────┐
│ settingsStore.setPadding│
│  - Update state         │
│  - Save to localStorage │
└─────┬───────────────────┘
      │
      ▼ (reactive via $effect)
┌─────────────────────────┐
│  ImageCanvas.svelte     │
│  - Re-render with new   │
│    padding value        │
└─────────────────────────┘
```

### Export Flow

```
┌────────────┐
│    User    │
│ (Export)   │
└─────┬──────┘
      │
      ▼
┌─────────────────────────┐
│  ExportMenu.svelte      │
│  - Select format (PNG)  │
└─────┬───────────────────┘
      │
      ▼
┌─────────────────────────┐
│  exportToPNG()          │
│  - Get canvas element   │
│  - html-to-image.toPng()│
│  - Scale 2× for retina  │
└─────┬───────────────────┘
      │
      ▼
┌─────────────────────────┐
│  Browser Download       │
│  - Create blob          │
│  - Trigger download     │
│  - Filename: xxxnaper-  │
│    {timestamp}.png      │
└─────────────────────────┘
```

---

## Build Process

### Development Build

```
┌──────────────┐
│  npm run dev │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│  Vite Dev Server         │
│  - HMR (Hot Module       │
│    Replacement)          │
│  - TypeScript on-the-fly │
│  - Tailwind JIT          │
│  - Source maps           │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  http://localhost:5173   │
│  - Sub-second HMR        │
│  - Full type checking    │
└──────────────────────────┘
```

### Production Build

```
┌────────────────┐
│  npm run build │
└────────┬───────┘
         │
         ▼
┌────────────────────────────────┐
│  TypeScript Compilation        │
│  - Type checking (strict mode) │
│  - Zero errors required        │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│  Vite Build                    │
│  - Tree shaking                │
│  - Code splitting (if needed)  │
│  - Minification (esbuild)      │
│  - CSS extraction (Tailwind)   │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│  dist/ Output                  │
│  ├── index.html (0.93 KB)      │
│  ├── assets/                   │
│  │   ├── index-[hash].css      │
│  │   │   (64.61 KB → 11.28 KB) │
│  │   ├── html-to-image-[hash]  │
│  │   │   .js (13.49 KB → 5.34) │
│  │   └── index-[hash].js       │
│  │       (61.24 KB → 22.10 KB) │
│  └── Total: 38.7 KB gzipped    │
└────────────────────────────────┘
```

### Build Optimizations

| Optimization | Technique | Impact |
|-------------|-----------|--------|
| **Tree Shaking** | Vite + ES modules | Remove unused code |
| **Minification** | esbuild | Reduce file size (60%+) |
| **Code Splitting** | Dynamic imports (if needed) | Lazy load features |
| **CSS Purging** | Tailwind PostCSS | Remove unused styles |
| **Gzip Compression** | Server-side (Vercel/Netlify) | 70% size reduction |
| **Asset Hashing** | Vite fingerprinting | Cache busting |

---

## Deployment Architecture

### Static Hosting Model

```
┌──────────────────────────────────────────────┐
│              CDN Edge Locations              │
│  (Vercel Edge Network / Cloudflare)          │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │   Static Files (cached at edge)      │   │
│  │   - index.html (0.93 KB)             │   │
│  │   - CSS bundle (11.28 KB gzipped)    │   │
│  │   - JS bundle (27.44 KB gzipped)     │   │
│  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   User Browser         │
        │   - Download assets    │
        │   - Run app locally    │
        │   - No server calls    │
        └────────────────────────┘
```

### Deployment Targets

| Platform | Deployment Method | Build Command | Output Dir |
|----------|------------------|---------------|------------|
| **Vercel** | Git push (auto) | `npm run build` | `dist/` |
| **Netlify** | Git push (auto) | `npm run build` | `dist/` |
| **Cloudflare Pages** | Git push (auto) | `npm run build` | `dist/` |
| **GitHub Pages** | GitHub Actions | `npm run build` | `dist/` |

### Deployment Configuration

**Vercel (vercel.json):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "cleanUrls": true,
  "trailingSlash": false
}
```

**Netlify (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Performance Architecture

### Rendering Strategy

| Phase | Technology | Performance |
|-------|-----------|-------------|
| **Preview** | CSS Transforms | 0ms overhead, GPU-accelerated |
| **Export** | html-to-image (Canvas) | ~300ms for 1920×1080 PNG |

### Performance Optimizations

```
┌─────────────────────────────────────────┐
│        Component Level                  │
│  - $derived for computed values         │
│  - $effect for side effects only        │
│  - Minimize re-renders                  │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│        Bundle Level                     │
│  - Tree shaking (Vite)                  │
│  - Code splitting (dynamic imports)     │
│  - 38.7 KB gzipped total                │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│        Runtime Level                    │
│  - No virtual DOM (Svelte compiles out) │
│  - GPU-accelerated CSS transforms       │
│  - Lazy image loading                   │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│        Network Level                    │
│  - CDN edge caching                     │
│  - Brotli/Gzip compression              │
│  - HTTP/2 multiplexing                  │
└─────────────────────────────────────────┘
```

### Lighthouse Metrics

| Metric | Target | Achieved |
|--------|--------|----------|
| Performance | >90 | 95+ |
| First Contentful Paint | <0.8s | ~0.5s |
| Time to Interactive | <1.5s | ~1.0s |
| Total Blocking Time | <200ms | <100ms |
| Cumulative Layout Shift | <0.1 | 0 |

---

## Security Architecture

### Security Model

```
┌──────────────────────────────────────────┐
│         Zero Server Trust                │
│  - No backend to compromise              │
│  - No API keys to steal                  │
│  - No database to breach                 │
└──────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│         Browser Sandbox                  │
│  - Same-origin policy                    │
│  - Content Security Policy (CSP)         │
│  - HTTPS enforced                        │
└──────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│         Privacy Guarantees               │
│  - Images never uploaded                 │
│  - All processing in-browser             │
│  - No analytics/tracking                 │
│  - No cookies (except localStorage)      │
└──────────────────────────────────────────┘
```

### Content Security Policy

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
```

### Threat Mitigation

| Threat | Mitigation |
|--------|------------|
| **XSS** | CSP, no innerHTML usage, Svelte auto-escaping |
| **Data Breach** | No server, no database, no uploads |
| **CSRF** | No server endpoints to attack |
| **File Upload** | Client-side validation, 10MB limit |
| **Privacy** | Zero telemetry, no external requests |

---

## Scalability Considerations

### Current Architecture (v1.0)

- **User Load:** Unlimited (static hosting, no server)
- **Concurrent Users:** No limit (client-side processing)
- **Geographic Distribution:** CDN edge locations (global)
- **Storage:** localStorage only (browser-local)

### Future Scaling (v1.1+)

If team features added:
- **Authentication:** OAuth providers (Google, GitHub)
- **Storage:** Optional cloud sync (Firebase, Supabase)
- **API:** Serverless functions (Vercel, Cloudflare Workers)
- **Database:** NoSQL (Firestore, MongoDB Atlas)

---

## Technology Stack Integration

```
┌────────────────────────────────────────────────┐
│              Frontend Framework                │
│  Svelte 5 (Signals-based reactivity)           │
└─────────────────┬──────────────────────────────┘
                  │
       ┌──────────┴──────────┐
       ▼                     ▼
┌─────────────┐      ┌─────────────┐
│  TypeScript │      │  Tailwind   │
│  (Type Safe)│      │  (Styling)  │
└──────┬──────┘      └──────┬──────┘
       │                    │
       └──────────┬─────────┘
                  ▼
       ┌──────────────────┐
       │  Vite (Build)    │
       │  - Dev Server    │
       │  - Production    │
       └──────────────────┘
```

---

**Document Version:** 1.0
**Last Updated:** 2025-10-27
**Owner:** Engineering Team
**Review Cycle:** Quarterly
