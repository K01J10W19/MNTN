# CLAUDE.md

MNTN - Landing Page SPA. Vanilla JS (ES Modules), HTML5, CSS3, Vite. No frameworks - lightweight modular components using native browser APIs only.

## Commands
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - lint & format check

## Code Style
- **JS:** Native ES Modules only (`import`/`export`). No CommonJS/`require`.
- **CSS:** Design tokens as CSS Custom Properties in `:root`, defined in `src/styles/tokens.css`. No preprocessors, no CSS-in-JS.
- **DOM:** Declarative event listeners, `querySelector`/`querySelectorAll`, `dataset` for element state, `IntersectionObserver` for all scroll-tracking (never scroll-event polling).

## Spatial Grid (mandatory)
Every margin, padding, gap, and structural height MUST be one of:
`8px 16px 24px 32px 48px 64px 80px 96px 120px`
No arbitrary/off-grid pixel values.

## Breakpoints (exact)
- **Mobile `< 640px`:** vertical stack; hide social/slider sidebars; hamburger opens full-screen overlay.
- **Tablet `640px - 1023px`:** single-column layout; horizontal padding `24px - 32px`; dynamic nav drawer.
- **Laptop `1024px - 1439px`:** two-column split for content blocks; compressed side indicators (social left, scroll slider right); container max-width `1120px`.
- **Monitor `≥ 1440px`:** container max-width `1360px - 1440px`; full side indicators active; vertical padding `96px - 120px`; multi-layer parallax depth enabled.

## Feature Rules
- **Hero:** responsive header; fixed left social links; fixed right vertical scroll-slider.
- **Interactivity:** smooth-scroll anchor nav; right-slider active index driven by `IntersectionObserver`; parallax background uses `transform` only (no layout-triggering properties).

## Directory Structure
```
/MNTN_SPA_VanillaJS
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── assets/ (images, icons)
    ├── styles/ (tokens.css, main.css, responsive.css, components/)
    └── scripts/ (main.js, observer.js, parallax.js, components/)
```

## Agent Rules
- Never add a framework (React/Vue/etc.) or bundler-specific syntax.
- Check `tokens.css` before hardcoding any color, spacing, or font value.
- Run `npm run lint` before marking any task complete.
