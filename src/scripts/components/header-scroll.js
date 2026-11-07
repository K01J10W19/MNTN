import { observeVisibility } from '../observer.js';

/**
 * Toggles the header's "scrolled" state once the page has scrolled past a
 * sentinel near the top — driven by IntersectionObserver rather than a
 * scroll listener, per CLAUDE.md's DOM rule.
 */
export function initHeaderScroll() {
  const header = document.querySelector('.header');
  const sentinel = document.querySelector('[data-header-sentinel]');
  if (!header || !sentinel) return;

  observeVisibility(sentinel, (isVisible) => {
    header.dataset.scrolled = String(!isVisible);
  });
}
