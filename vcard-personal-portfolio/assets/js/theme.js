'use strict';

(function initTheme() {
  var STORAGE_KEY = 'portfolio-theme';
  var toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  var buttons = toggle.querySelectorAll('[data-theme-value]');
  var indicator = toggle.querySelector('[data-theme-indicator]');
  var systemMq = window.matchMedia('(prefers-color-scheme: dark)');

  function resolveTheme(mode) {
    if (mode === 'light' || mode === 'dark') return mode;
    return systemMq.matches ? 'dark' : 'light';
  }

  function setTheme(mode) {
    var safeMode =
      mode === 'light' || mode === 'dark' || mode === 'system' ? mode : 'system';
    localStorage.setItem(STORAGE_KEY, safeMode);
    document.documentElement.setAttribute('data-theme-mode', safeMode);
    document.documentElement.setAttribute('data-theme', resolveTheme(safeMode));
    syncToggleUi(safeMode);
  }

  function syncToggleUi(mode) {
    var index = 0;
    for (var i = 0; i < buttons.length; i++) {
      var value = buttons[i].getAttribute('data-theme-value');
      var isActive = value === mode;
      buttons[i].setAttribute('aria-checked', isActive ? 'true' : 'false');
      if (isActive) index = i;
    }
    if (indicator) {
      var btnSize =
        parseFloat(getComputedStyle(toggle).getPropertyValue('--toggle-btn')) || 34;
      indicator.style.transform = 'translateX(' + index * btnSize + 'px)';
    }
  }

  for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener('click', function () {
      setTheme(this.getAttribute('data-theme-value'));
    });
  }

  systemMq.addEventListener('change', function () {
    var mode = document.documentElement.getAttribute('data-theme-mode') || 'system';
    if (mode === 'system') {
      document.documentElement.setAttribute('data-theme', resolveTheme('system'));
    }
  });

  var initialMode =
    document.documentElement.getAttribute('data-theme-mode') || 'system';
  syncToggleUi(initialMode);
})();
