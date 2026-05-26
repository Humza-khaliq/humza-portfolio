'use strict';

(function initCursorSpotlight() {
  const root = document.querySelector('[data-cursor-spotlight]');
  if (!root) return;

  const glows = root.querySelectorAll('.cursor-spotlight__glow');
  if (!glows.length) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!finePointer) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = reducedMotion ? 1 : 0.12;

  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.5;
  let currentX = targetX;
  let currentY = targetY;
  let rafId = null;
  let active = false;

  function setGlowPosition(x, y) {
    const transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';
    for (let i = 0; i < glows.length; i++) {
      glows[i].style.transform = transform;
    }
  }

  function frame() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    setGlowPosition(currentX, currentY);
    rafId = window.requestAnimationFrame(frame);
  }

  function activate() {
    if (active) return;
    active = true;
    document.body.classList.add('is-cursor-spotlight-active');
    setGlowPosition(currentX, currentY);
    if (!rafId) rafId = window.requestAnimationFrame(frame);
  }

  function deactivate() {
    active = false;
    document.body.classList.remove('is-cursor-spotlight-active');
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  window.addEventListener(
    'pointermove',
    function (event) {
      targetX = event.clientX;
      targetY = event.clientY;
      activate();
    },
    { passive: true }
  );

  document.documentElement.addEventListener('mouseleave', deactivate);
  document.documentElement.addEventListener('mouseenter', activate);

  activate();
})();
