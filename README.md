# 🏔️ MNTN — Hiking Guide Landing Page

![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)

MNTN is a single-page landing site for a hiking guide brand, built with framework-free vanilla JavaScript, HTML5, and CSS3. It pairs a layered parallax mountain hero with three editorial content sections (hiker levels, gear, maps & timing), a scroll-driven section indicator, and a full-screen mobile navigation overlay. All interactivity uses native browser APIs: `IntersectionObserver`, `matchMedia`, and `requestAnimationFrame`.

---

## ✨ Features

- **Layered Parallax Hero:** Three stacked mountain image layers (far, mid, near) and the hero title move at different speeds as you scroll, creating depth on wide screens.
- **Scroll Progress Slider:** A fixed right-side indicator (Start / 01 / 02 / 03 / End) highlights the section currently in view and slides its marker to match; each label is also a jump link.
- **Fixed Social Sidebar:** A vertical "Follow us" rail on the left with Instagram and Twitter links that swap to an accent-colored icon on hover/focus.
- **Adaptive Header:** A fixed header that trades its top gradient scrim for a frosted, blurred bar once you scroll past the top of the page.
- **Full-Screen Mobile Navigation:** Below 1024px a hamburger opens an editorial overlay with numbered links, a topographic background pattern, social links, and decorative coordinates. It closes via the close button, any link, or the `Escape` key.
- **Desktop Inline Navigation:** From 1024px up, a three-zone header shows the logo on the left, centered nav links (Equipment, About us, Blog), and an Account link on the right.
- **Scroll-Reveal Animations:** Eyebrows, headings, copy, images, and footer blocks fade and rise into view with staggered delays the first time they enter the viewport.
- **Editorial Content Sections:** Three numbered sections with large watermark numerals, eyebrow labels, and "read more" links. Section 02 mirrors its layout (image left, text right) on wide screens.
- **Micro-Interactions:** Sliding underlines on nav and "read more" links, a nudging arrow icon, hover lift and press feedback on icon buttons, and a clipped zoom on feature images.
- **Smooth Anchor Scrolling:** In-page links (logo, scroll cue, slider labels, Equipment) scroll smoothly to their target section.
- **Themed Scrollbar:** A thin accent-on-navy scrollbar in both Firefox and Chromium/Safari.

---

## 🛠️ Tech Stack

- **Markup:** Semantic HTML5 (single `index.html` entry point)
- **Styling:** CSS3 with Custom Properties (design tokens), Grid, Flexbox, and `@import`-based modules. No preprocessors or CSS-in-JS.
- **Scripting:** Vanilla JavaScript, native ES Modules (`import`/`export`), ES2022
- **Build Tool:** Vite 6 (`^6.0.11`)
- **Linting:** ESLint 9 (`^9.19.0`, flat config)
- **Formatting:** Prettier 3 (`^3.4.2`)
- **Icons:** Lucide (`lucide-static` `^1.28.0`); the menu, close, and arrow icon paths are inlined as SVG in `index.html` so they inherit `currentColor`
- **Fonts:** Playfair Display (headings) and Poppins (body) via Google Fonts

---

## 🧠 Engineering Highlights

- **Centralized IntersectionObserver Module:** `observer.js` is the only place that creates an `IntersectionObserver`. It exposes two helpers: `observeSections()` (tracks intersection ratios across all sections and reports the most-visible one) and `observeVisibility()` (a simple true/false watcher). The slider, header, and scroll-reveal components all build on these instead of listening to scroll events.
- **Sentinel-Driven Header State:** An invisible 120px sentinel at the top of the page is observed; when it leaves the viewport, `header.dataset.scrolled` flips to `true` and CSS crossfades the header's background. No scroll polling, and the header's size never changes, so nothing shifts.
- **One-Shot Scroll Reveal:** Each `.reveal-on-scroll` element gets its own observer at a 15% threshold, receives `.is-visible` once, then disconnects. All motion lives in CSS (`animations.css`).
- **Transform-Only, rAF-Batched Parallax:** Parallax needs a continuous scroll offset, which `IntersectionObserver` can't provide, so `parallax.js` is the one documented exception. A passive `scroll` listener sets a flag, and `requestAnimationFrame` writes `translate3d()` once per frame. Speeds are declared in markup via `data-parallax-speed`.
- **Conditional Parallax Activation:** Parallax attaches only when `(min-width: 1440px)` matches and the user has not requested reduced motion. It listens to `matchMedia` changes and cleanly removes the listener and resets transforms when either condition stops holding.
- **`dataset` for Element State:** UI state lives in data attributes (`data-nav-open`, `data-scrolled`, `data-active`) that CSS selects on directly. The slider indicator position is driven by a `--active-index` custom property.
- **Design Tokens & Spatial Grid:** Colors, fonts, font sizes, container widths, shadow, easing, and a nine-step spacing scale (`8px` to `120px`) are defined once in `tokens.css`. Layout spacing is drawn from that scale.
- **Accessibility:**
  - Skip-to-content link and labelled landmarks (`Primary` nav, `Page sections` slider)
  - `aria-expanded`, `aria-controls`, and `aria-hidden` kept in sync on the nav overlay
  - Focus moves into the overlay on open and back to the hamburger on close; `Escape` dismisses it
  - Body scroll is locked while the overlay is open
  - Decorative images and numerals are hidden from assistive tech; content images carry descriptive `alt` text
  - `:focus-visible` mirrors every hover effect
- **Reduced-Motion Support:** Under `prefers-reduced-motion: reduce`, smooth scrolling, transitions, reveal animations, hover transforms, the slider transition, and parallax are all disabled or neutralized.
- **Performance Touches:** Below-the-fold images use `loading="lazy"`, hero layers use `will-change: transform` (dropped under reduced motion), and Google Fonts are preconnected.
- **Deliberate Cascade Ordering:** `main.css` imports `base.css` immediately before `responsive.css` so breakpoint overrides win same-specificity ties against shared primitives.
- **Containing-Block Safety:** The header's frosted `backdrop-filter` lives on a pseudo-element rather than the header itself, and the nav overlay sits outside the header in the DOM, so neither creates an unwanted containing block for fixed-position elements.

---

## 📁 Folder Structure

```
MNTN_SPA_VanillaJS/
├── index.html                     # Single-page entry point: header, nav overlay, sidebars, hero, sections, footer
├── package.json                   # Scripts (dev/build/preview/lint) and dev dependencies
├── package-lock.json              # Locked dependency tree
├── vite.config.js                 # Vite config: relative base path, dist output, auto-open dev server
├── eslint.config.js               # ESLint flat config with browser globals and rules
├── .prettierrc.json               # Prettier formatting options
├── .prettierignore                # Files Prettier skips
├── .gitignore                     # Ignored files (node_modules, dist, env, editor folders)
├── CLAUDE.md                      # Project conventions and coding rules
└── src/
    ├── assets/
    │   ├── icons/                 # SVG icons: account, social (base + accent), arrow, topo pattern
    │   └── images/                # Hero parallax layers and section feature photos
    ├── scripts/
    │   ├── main.js                # Bootstraps every module on load
    │   ├── observer.js            # Shared IntersectionObserver helpers
    │   ├── parallax.js            # rAF-batched, transform-only hero parallax (≥1440px)
    │   └── components/
    │       ├── header-scroll.js   # Toggles header "scrolled" state via a sentinel
    │       ├── nav.js             # Mobile/tablet nav overlay open/close, focus, Escape
    │       ├── scroll-reveal.js   # One-shot fade-in for .reveal-on-scroll elements
    │       └── slider.js          # Active section label + indicator position
    └── styles/
        ├── tokens.css             # Design tokens: colors, fonts, sizes, spacing scale, layout
        ├── main.css               # Stylesheet entry; imports everything in cascade order
        ├── base.css               # Reset, globals, scrollbar, skip link, shared primitives
        ├── responsive.css         # Tablet, laptop, and monitor breakpoint overrides
        └── components/
            ├── animations.css     # Hover/press micro-interactions and scroll-reveal
            ├── content-section.css # Numbered editorial sections
            ├── footer.css         # Footer layout and links
            ├── header.css         # Fixed header, scroll sentinel, scrim/frosted states
            ├── hero.css           # Hero layers, gradient scrim, title layout
            ├── nav-overlay.css    # Full-screen mobile/tablet navigation
            ├── scroll-slider.css  # Right-side section progress slider
            └── social-sidebar.css # Left-side social links rail
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18, 20, or 22+ (required by Vite 6)
- **npm** (bundled with Node.js)
- **Git**

### Installation & Usage

1. **Clone the repository**

   ```bash
   git clone https://github.com/K01J10W19/MNTN.git
   ```

2. **Move into the project folder**

   ```bash
   cd MNTN
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server** (opens in your browser automatically)

   ```bash
   npm run dev
   ```

5. **Build for production** (outputs to `dist/`)

   ```bash
   npm run build
   ```

6. **Preview the production build**

   ```bash
   npm run preview
   ```

7. **Lint and check formatting** (optional)

   ```bash
   npm run lint
   ```

---

## 📱 Responsive Strategy

Styles are mobile-first: each component file defines the mobile layout, and `responsive.css` layers `min-width` overrides on top.

| Breakpoint  | Range             | Layout behavior                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Mobile**  | `< 640px`         | Single vertical stack. Social sidebar and scroll slider hidden. Hamburger opens the full-screen overlay. Hero content centered, with the "scroll down" cue pinned near the bottom. Overlay hides its decorative coordinates and centers the social links. Footer is a single centered column.                                                                                                                                                                |
| **Tablet**  | `640px – 1023px`  | Still single-column with the hamburger overlay. Larger centered hero heading. Section copy widens to full width. Footer becomes a left-aligned three-column grid (intro / blog links / MNTN links) with copyright spanning the bottom.                                                                                                                                                                                                                       |
| **Laptop**  | `1024px – 1439px` | Container capped at `768px`. Hamburger and overlay replaced by the inline three-zone header. Hero switches to left-aligned. Social sidebar and scroll slider appear with a tighter `24px` edge offset. Content sections become a two-column split (about 42% text / 58% image, `4:5` images), with Section 02 mirrored and Section 01 overlapping the hero by `120px`. Numerals and section headings use fixed, smaller sizes to fit the narrow text column. |
| **Monitor** | `≥ 1440px`        | Container widens to `1280px`. Section column gap grows to `120px` and headings scale up. Side indicators move out to a `32px` offset. Multi-layer hero parallax activates (unless reduced motion is preferred).                                                                                                                                                                                                                                              |

Across all breakpoints, the container keeps `32px` of horizontal padding and content sections use `96px` of vertical padding (`120px` from laptop up). Headings and the watermark numeral scale fluidly with `clamp()` between breakpoints.
