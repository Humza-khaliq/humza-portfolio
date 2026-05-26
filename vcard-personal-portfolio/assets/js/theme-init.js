(function () {
  var STORAGE_KEY = 'portfolio-theme';
  var stored = localStorage.getItem(STORAGE_KEY);
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var mode = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
  var resolved = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode;

  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.setAttribute('data-theme-mode', mode);
})();
