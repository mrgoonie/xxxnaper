# XXXnaper Deployment Guide

**Version:** 1.0
**Date:** 2025-10-27
**Application Type:** Static SPA (Single Page Application)
**Build Tool:** Vite 6.x

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Build Process](#build-process)
3. [Deployment Platforms](#deployment-platforms)
4. [Platform-Specific Instructions](#platform-specific-instructions)
5. [Environment Configuration](#environment-configuration)
6. [CI/CD Setup](#cicd-setup)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js:** v18.0.0 or higher (LTS recommended)
- **npm:** v9.0.0 or higher (or pnpm/yarn)
- **Git:** For version control and deployment automation

### Verify Installation

```bash
node --version   # Should be v18.0.0+
npm --version    # Should be v9.0.0+
git --version    # Any recent version
```

---

## Build Process

### Local Build

```bash
# 1. Clone repository
git clone https://github.com/yourusername/xxxnaper.git
cd xxxnaper

# 2. Install dependencies
npm install

# 3. Run type checking
npm run check

# 4. Build for production
npm run build

# 5. Preview production build locally
npm run preview
```

### Build Output

After running `npm run build`, output will be in `dist/` directory:

```
dist/
├── index.html                   # Entry HTML (0.93 KB)
└── assets/
    ├── index-[hash].css         # Styles (11.28 KB gzipped)
    ├── html-to-image-[hash].js  # Image export lib (5.34 KB gzipped)
    └── index-[hash].js          # App bundle (22.10 KB gzipped)
```

**Total Size:** 38.72 KB gzipped

### Build Verification

```bash
# Check build output
ls -lh dist/
ls -lh dist/assets/

# Verify no TypeScript errors
npm run check

# Test production build locally
npm run preview
# Visit http://localhost:4173
```

---

## Deployment Platforms

XXXnaper is a static site and can be deployed to any platform that supports static hosting.

### Recommended Platforms

| Platform | Free Tier | Auto-Deploy | CDN | Custom Domain | SSL |
|----------|-----------|-------------|-----|---------------|-----|
| **Vercel** | ✅ Yes | ✅ Git push | ✅ Global | ✅ Free | ✅ Auto |
| **Netlify** | ✅ Yes | ✅ Git push | ✅ Global | ✅ Free | ✅ Auto |
| **Cloudflare Pages** | ✅ Yes | ✅ Git push | ✅ Global | ✅ Free | ✅ Auto |
| **GitHub Pages** | ✅ Yes | ✅ Actions | ✅ Global | ✅ Free | ✅ Auto |

### Platform Selection Guide

**Choose Vercel if:**
- You want the fastest global CDN (edge network)
- You need best Vite/Svelte integration
- You want automatic preview deployments for PRs

**Choose Netlify if:**
- You need advanced redirect/header rules
- You want split testing capabilities
- You prefer Netlify's UI/UX

**Choose Cloudflare Pages if:**
- You want the largest edge network (275+ locations)
- You need advanced DDoS protection
- You want Cloudflare Workers integration

**Choose GitHub Pages if:**
- You want to keep everything on GitHub
- You have simple hosting needs
- You don't need advanced CDN features

---

## Platform-Specific Instructions

### Vercel Deployment

#### Option 1: Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Deploy from project root
vercel

# Follow prompts:
# - Set up and deploy: Y
# - Which scope: (your account)
# - Link to existing project: N
# - Project name: xxxnaper
# - Directory: ./
# - Override settings: N

# 3. Deploy to production
vercel --prod
```

**Your app will be live at:** `https://xxxnaper.vercel.app`

---

#### Option 2: Vercel Dashboard (Recommended)

1. **Connect Repository:**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub
   - Click "Import Project"
   - Select `xxxnaper` repository

2. **Configure Build Settings:**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Deploy:**
   - Click "Deploy"
   - Wait ~1 minute for build
   - Your app is live!

**Auto-Deployment:** Every push to `main` branch triggers automatic deployment.

---

#### Vercel Configuration File (Optional)

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

### Netlify Deployment

#### Option 1: Netlify CLI

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Initialize site
netlify init

# Follow prompts:
# - Create & configure a new site: Y
# - Team: (your team)
# - Site name: xxxnaper
# - Build command: npm run build
# - Publish directory: dist

# 4. Deploy
netlify deploy --prod
```

---

#### Option 2: Netlify Dashboard

1. **Connect Repository:**
   - Visit [app.netlify.com/start](https://app.netlify.com/start)
   - Click "Import from Git"
   - Select GitHub and authorize
   - Choose `xxxnaper` repository

2. **Configure Build:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete

**Auto-Deployment:** Enabled by default for `main` branch.

---

#### Netlify Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### Cloudflare Pages Deployment

#### Via Cloudflare Dashboard

1. **Connect Repository:**
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Go to Pages → Create a project
   - Connect to Git → Authorize GitHub
   - Select `xxxnaper` repository

2. **Configure Build:**
   ```
   Framework preset: None (or Vite)
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   Environment variables: (none needed)
   ```

3. **Deploy:**
   - Click "Save and Deploy"
   - Wait for build (~1-2 minutes)

**Auto-Deployment:** Every push to `main` deploys automatically.

**Custom Domain:** Add in Pages → Custom domains

---

### GitHub Pages Deployment

#### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Enable GitHub Pages:**
1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. Save

**Your app will be at:** `https://yourusername.github.io/xxxnaper/`

---

#### Option 2: Manual Deploy with `gh-pages`

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Add deploy script to package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}

# 3. Deploy
npm run deploy
```

---

## Environment Configuration

### Environment Variables

XXXnaper currently requires **no environment variables** (100% client-side).

If you need to add environment variables in the future:

**Vite Environment Variables:**
```bash
# .env.production
VITE_API_URL=https://api.example.com
VITE_FEATURE_FLAG=true
```

**Access in code:**
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Platform-specific:**
- **Vercel:** Add in Project Settings → Environment Variables
- **Netlify:** Add in Site settings → Environment variables
- **Cloudflare:** Add in Pages → Settings → Environment variables

---

## CI/CD Setup

### Automated Deployment Workflow

```
┌─────────────────┐
│  Developer      │
│  git push       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Git Provider   │
│  (GitHub)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  CI/CD Pipeline │
│  1. Install deps│
│  2. Type check  │
│  3. Build       │
│  4. Deploy      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Production     │
│  (Live Site)    │
└─────────────────┘
```

### Pre-Deployment Checks

Add to `.github/workflows/checks.yml`:

```yaml
name: CI Checks

on:
  pull_request:
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci
      - run: npm run check    # TypeScript type checking
      - run: npm run build    # Build verification
```

---

## Post-Deployment Verification

### Deployment Checklist

After deployment, verify:

- [ ] **Site loads:** Visit deployed URL
- [ ] **Upload works:** Test image upload
- [ ] **Sliders work:** Adjust padding/inset/radius
- [ ] **Gradients work:** Click gradient swatches
- [ ] **Export works:** Download PNG/JPG
- [ ] **Dark mode works:** Toggle theme
- [ ] **Mobile responsive:** Test on phone (375px+)
- [ ] **Performance:** Run Lighthouse audit (score >90)
- [ ] **HTTPS enabled:** Check for padlock icon
- [ ] **Custom domain:** Verify DNS (if configured)

### Performance Verification

```bash
# Run Lighthouse audit
npx lighthouse https://yoursite.com --view

# Expected scores:
# Performance: 95+
# Accessibility: 100
# Best Practices: 100
# SEO: 100
```

### Error Monitoring

Since XXXnaper is client-side only, use browser console for errors:

1. Open site in browser
2. Open DevTools (F12)
3. Check Console tab for errors
4. Check Network tab for failed requests

---

## Troubleshooting

### Build Failures

**Error: `Cannot find module`**
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: `TypeScript errors`**
```bash
# Solution: Run type check locally
npm run check

# Fix errors, then rebuild
npm run build
```

---

### Deployment Failures

**Vercel: "Build failed"**
- Check build logs in Vercel dashboard
- Ensure `dist` folder is generated
- Verify Node version (18+)

**Netlify: "Deploy failed"**
- Check deploy logs
- Verify `netlify.toml` syntax
- Ensure build command is correct

**Cloudflare: "Build error"**
- Check Pages build logs
- Verify build command: `npm run build`
- Verify output directory: `dist`

---

### Runtime Issues

**404 on refresh (Netlify/Vercel)**
```toml
# Add to netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Assets not loading**
- Check browser console for 404s
- Verify asset paths in `dist/index.html`
- Ensure base URL is correct

**Dark mode not persisting**
- Check localStorage in DevTools (Application tab)
- Verify key: `xxxnaper-settings`
- Clear and test again

---

### Performance Issues

**Large bundle size**
```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer

# Solutions:
# - Check for unused dependencies
# - Use dynamic imports for large libs
# - Verify tree-shaking is working
```

**Slow initial load**
- Enable compression (Brotli/Gzip) on server
- Check CDN caching headers
- Verify assets are minified

---

## Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add domain: `yoursite.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```
4. Wait for propagation (5-60 minutes)

### Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: yoursite.netlify.app

   Type: A
   Name: @
   Value: 75.2.60.5
   ```

### Cloudflare Pages

1. Go to Pages → Custom domains
2. Add domain
3. Cloudflare auto-configures DNS if domain is on Cloudflare

---

## Security Best Practices

### Headers Configuration

Ensure these headers are set (platform-dependent):

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:
```

### HTTPS Enforcement

- All platforms auto-enable HTTPS
- Redirect HTTP → HTTPS (default on Vercel/Netlify/Cloudflare)

---

## Rollback Procedure

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → Promote to Production

### Netlify
1. Go to Deploys
2. Click on previous deploy
3. Click "Publish deploy"

### Cloudflare Pages
1. Go to Deployments
2. Select previous deployment
3. Click "Rollback to this deployment"

---

## Monitoring & Analytics (Optional)

### Privacy-Friendly Analytics

**Plausible Analytics:**
```html
<!-- Add to index.html -->
<script defer data-domain="yoursite.com" src="https://plausible.io/js/script.js"></script>
```

**Fathom Analytics:**
```html
<script src="https://cdn.usefathom.com/script.js" data-site="ABCDEFG" defer></script>
```

**Cloudflare Web Analytics:**
- Free, privacy-first
- Enable in Cloudflare dashboard

---

## Support Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Cloudflare Pages Docs:** [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)
- **Vite Docs:** [vitejs.dev](https://vitejs.dev)

---

**Document Version:** 1.0
**Last Updated:** 2025-10-27
**Verified Platforms:** Vercel, Netlify, Cloudflare Pages, GitHub Pages
