import { observeVisibility } from '../observer.js';

/**
 * Reveals each `.reveal-on-scroll` element once it's 15% visible, then
 * stops observing it — a one-shot entrance, not an ongoing toggle. Actual
 * motion (opacity/transform/stagger delay) lives entirely in
 * animations.css; this only ever adds the .is-visible class.
 */
export function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal-on-scroll');

  targets.forEach((el) => {
    const observer = observeVisibility(
      el,
      (isVisible) => {
        if (isVisible) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
  });
}
