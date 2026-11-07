/**
 * Transform-only parallax for the hero's background layers.
 *
 * This is the one deliberate exception to "IntersectionObserver for all
 * scroll-tracking": parallax needs a continuous scroll offset, which
 * IntersectionObserver structurally cannot provide (it only reports
 * threshold crossings). A single passive `scroll` listener sets a flag,
 * and requestAnimationFrame batches the actual `transform` write to once
 * per frame — the standard non-polling vanilla pattern.
 *
 * Per CLAUDE.md, "multi-layer parallax depth" is scoped to the Monitor
 * breakpoint (>=1440px) only, and is skipped under prefers-reduced-motion.
 */
export function initParallax() {
  const layers = Array.from(document.querySelectorAll('[data-parallax-speed]'));
  if (layers.length === 0) return;

  const monitorQuery = window.matchMedia('(min-width: 1440px)');
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  let ticking = false;
  let active = false;

  const applyTransform = () => {
    const scrollY = window.scrollY;
    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.parallaxSpeed) || 0;
      layer.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(applyTransform);
    }
  };

  const resetTransforms = () => {
    layers.forEach((layer) => {
      layer.style.transform = '';
    });
  };

  const evaluate = () => {
    const shouldRun = monitorQuery.matches && !reduceMotionQuery.matches;

    if (shouldRun && !active) {
      active = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      applyTransform();
    } else if (!shouldRun && active) {
      active = false;
      window.removeEventListener('scroll', onScroll);
      resetTransforms();
    }
  };

  monitorQuery.addEventListener('change', evaluate);
  reduceMotionQuery.addEventListener('change', evaluate);
  evaluate();
}
