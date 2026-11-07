/**
 * Shared IntersectionObserver wrapper. Nothing else in this codebase should
 * instantiate IntersectionObserver directly — go through this module so all
 * scroll-tracking (per CLAUDE.md's DOM rule) is centralized in one place.
 */
export function observeSections(sectionEls, onChange, options = {}) {
  const ratios = new Map(sectionEls.map((el) => [el, 0]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      let activeEl = null;
      let maxRatio = 0;
      ratios.forEach((ratio, el) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeEl = el;
        }
      });

      if (activeEl) {
        onChange(activeEl, sectionEls.indexOf(activeEl));
      }
    },
    {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      ...options,
    }
  );

  sectionEls.forEach((el) => observer.observe(el));

  return observer;
}

/**
 * Simple binary visibility watcher for a single element — e.g. a scroll
 * sentinel used to toggle a "scrolled past the top" state. Reports
 * true/false on every intersection change rather than an active index.
 */
export function observeVisibility(el, onChange, options = {}) {
  const observer = new IntersectionObserver((entries) => {
    onChange(entries[0].isIntersecting);
  }, options);

  observer.observe(el);

  return observer;
}
