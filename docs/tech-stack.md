# Tech Stack

**Project**: XXXnaper - Screenshot Beautification Web App
**Date**: 2025-10-27
**Status**: Approved

---

## Core Technologies

### Framework
- **Svelte 5.0** - Signals-based reactivity, 2.6KB bundle
- **Vite 6.x** - Build tool with sub-second HMR
- **TypeScript 5.6+** - Type safety and developer experience

### Image Manipulation
- **html-to-image 1.11+** (18KB) - High-quality PNG/JPG export
- **CSS-based preview** - GPU-accelerated real-time manipulation

### UI & Styling
- **Tailwind CSS 4.0-beta** (6-10KB production)
- **shadcn-svelte 0.11+** - Accessible UI components (Radix UI)
- **Framer Motion for Svelte** - Spring animations (selective import)

### File Handling
- File Upload: `<input type="file" accept="image/*">`
- Clipboard: Async Clipboard API (95% browser support)
- Drag & Drop: HTML5 native events
- Export: `canvas.toBlob()` + `URL.createObjectURL()`
- Share: Web Share API Level 2

### State Management
- Svelte stores (built-in, 0KB overhead)
- localStorage sync for settings persistence

---

## Dependencies

### Production
```json
{
  "svelte": "^5.0.0",
  "html-to-image": "^1.11.0",
  "clsx": "^2.1.0",
  "nanoid": "^5.0.0"
}
```

### Development
```json
{
  "vite": "^6.0.0",
  "typescript": "^5.6.0",
  "@sveltejs/vite-plugin-svelte": "^4.0.0",
  "tailwindcss": "^4.0.0-beta.1",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "vitest": "^2.0.0",
  "@playwright/test": "^1.48.0",
  "prettier": "^3.3.0",
  "prettier-plugin-svelte": "^3.2.0",
  "prettier-plugin-tailwindcss": "^0.6.0"
}
```

---

## Performance Targets

- **Bundle Size**: <50KB gzipped total
- **First Contentful Paint**: <0.8s (3G network)
- **Time to Interactive**: <1.5s
- **UI Updates**: 60fps (16.6ms budget)
- **Export Generation**: <500ms (1920x1080 PNG)

---

## Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome/Edge | 90+ (April 2021) |
| Firefox | 88+ (April 2021) |
| Safari | 14+ (Sept 2020) |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

**Coverage**: 95%+ global users

---

## Architecture

- **Type**: 100% client-side SPA (no backend required)
- **State**: Svelte stores with localStorage persistence
- **Rendering**: CSS transforms for preview, html-to-image for export
- **Deployment**: Static hosting (Vercel/Netlify/Cloudflare Pages)

---

## Decision Rationale

### Why Svelte over React?
- 97% smaller bundle (2.6KB vs 40KB)
- 40% less code required
- Built-in reactivity without virtual DOM overhead
- Built-in stores for state management

### Why CSS over Canvas libraries?
- Real-time GPU acceleration (0ms overhead)
- 0KB library size vs 178-215KB for Konva/Fabric
- html-to-image captures final CSS perfectly

### Why Tailwind?
- Build-time CSS (no runtime cost)
- 6-10KB production bundle
- Excellent developer experience with autocomplete

---

**Next Steps**: Design phase (wireframes + design guidelines)
