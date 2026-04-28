/* ============================================================
   theme-toggle.js — Light / Dark Mode Toggle
   ----------------------------------------------------------
   Vanilla JavaScript. Reads/saves theme preference in
   localStorage and toggles a data-theme attribute on <html>.
   ============================================================ */

(function () {
  "use strict";

  var STORAGE_KEY = "nileHorizonTheme";
  var LIGHT = "light";
  var DARK = "dark";

  var toggleBtn = document.getElementById("themeToggleBtn");

  /** Apply the given theme and update the button icon. */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (toggleBtn) {
      toggleBtn.textContent = (theme === DARK) ? "☀️" : "🌙";
      toggleBtn.setAttribute("aria-label",
        (theme === DARK) ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  /** Toggle between light and dark, then persist. */
  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme") || LIGHT;
    var next = (current === DARK) ? LIGHT : DARK;
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  // --- Initialise on page load ---
  applyTheme(localStorage.getItem(STORAGE_KEY) || LIGHT);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
  }
})();
