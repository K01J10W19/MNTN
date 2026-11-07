/**
 * Mobile/tablet nav overlay toggle. One mechanism (dataset.navOpen) drives
 * the overlay's fade/scale transition and locks body scroll (main.css) —
 * per CLAUDE.md's "dataset for element state" rule. The header hamburger
 * ([data-nav-toggle]) opens; the overlay's own close button
 * ([data-nav-close]) and each nav link close it, matching how the overlay
 * owns its own dismissal affordance rather than the hamburger toggling.
 */
export function initNav() {
  const openTrigger = document.querySelector('[data-nav-toggle]');
  const closeTriggers = document.querySelectorAll('[data-nav-close]');
  const panel = document.querySelector('[data-nav-panel]');
  if (!openTrigger || !panel) return;

  const links = panel.querySelectorAll('[data-nav-link]');

  const setOpen = (isOpen) => {
    document.body.dataset.navOpen = String(isOpen);
    panel.setAttribute('aria-hidden', String(!isOpen));
    openTrigger.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      panel.querySelector('a')?.focus();
    } else {
      openTrigger.focus();
    }
  };

  openTrigger.addEventListener('click', () => setOpen(true));

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => setOpen(false));
  });

  links.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.dataset.navOpen === 'true') {
      setOpen(false);
    }
  });
}
