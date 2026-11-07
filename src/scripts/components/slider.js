import { observeSections } from '../observer.js';

/**
 * Drives the fixed right-side progress slider: which label is active and
 * where the indicator sits on the track, both derived from whichever
 * section (hero/01/02/03) currently has the most visible area.
 */
export function initSlider() {
  const sections = Array.from(document.querySelectorAll('[data-scroll-section]'));
  const slider = document.querySelector('.scroll-slider');
  if (!slider || sections.length === 0) return;

  const labels = Array.from(slider.querySelectorAll('[data-slider-link]'));
  const indicator = slider.querySelector('[data-slider-indicator]');

  observeSections(sections, (_activeEl, index) => {
    labels.forEach((label, i) => {
      label.dataset.active = String(i === index);
    });

    indicator?.style.setProperty('--active-index', String(index));
  });
}
