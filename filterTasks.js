/**
 * filterTasks.js - Adds filtering functionality to the todo list
 * Injects a filter toolbar and wraps the render function to enable
 * real-time filtering by title and priority
 */

// IIFE to avoid global namespace pollution
(function () {
<<<<<<< HEAD
  // Wait until showToDo.js defined render()
  function ready (fn) { document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    if (typeof window.render !== 'function') return; // showToDo.js
    if (window.__filterWrapped) return; // avoid double-wrapping

    // --- 1) Inject a tiny filter toolbar ---
    const form = document.getElementById('todoForm');
    const bar = document.createElement('div');
    bar.id = 'filters';
    bar.style.cssText = 'max-width:500px;margin:12px auto;display:flex;gap:8px;align-items:center;';

    const titleInput = document.createElement('input');
    titleInput.id = 'filterTitle';
    titleInput.placeholder = 'Nach Titel suchen…';
    titleInput.style.cssText = 'flex:1;padding:8px';

    const prioSelect = document.createElement('select');
    prioSelect.id = 'filterPriority';
    prioSelect.style.cssText = 'padding:8px';
=======
  /**
   * DOM ready helper function
   * Ensures code runs after DOM is fully loaded
   * @param {Function} fn - Callback function to execute
   */
  function ready(fn) {
    document.readyState !== "loading" ? fn() : document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    // Check dependencies: global render function must exist
    if (typeof window.render !== "function") return; // Requires render from showToDo.js

    // Prevent multiple executions
    if (window.__filterWrapped) return;              // Avoid double-wrapping

    // ========== FILTER TOOLBAR INJECTION ==========

    /**
     * Injects filter toolbar into the DOM
     * Creates and positions filter elements below the todo form
     */
    const form = document.getElementById("todoForm");
    const bar = document.createElement("div");
    bar.id = "filters";

    // Styling for the filter bar
    bar.style.cssText = "max-width:500px;margin:12px auto;display:flex;gap:8px;align-items:center;";

    // Title filter input
    const titleInput = document.createElement("input");
    titleInput.id = "filterTitle";
    titleInput.placeholder = "Nach Titel suchen…";
    titleInput.style.cssText = "flex:1;padding:8px";

    // Priority filter dropdown
    const prioSelect = document.createElement("select");
    prioSelect.id = "filterPriority";
    prioSelect.style.cssText = "padding:8px";
>>>>>>> main
    prioSelect.innerHTML = `
      <option value="">Alle Prioritäten</option>
      <option value="Hoch">Hoch</option>
      <option value="Mittel">Mittel</option>
      <option value="Niedrig">Niedrig</option>
    `;

    // Assemble and inject filter bar
    bar.appendChild(titleInput);
    bar.appendChild(prioSelect);
    form.insertAdjacentElement('afterend', bar);

    // ========== RENDER FUNCTION WRAPPING ==========

    // Store reference to original render function
    const originalRender = window.render;

<<<<<<< HEAD
    function matches (li, titleNeedle, prioNeedle) {
      const titleEl = li.querySelector('.title');
      if (!titleEl) return false;

      const text = titleEl.textContent || '';
      const norm = s => (s || '').toLowerCase().trim();
=======
    /**
     * Checks if a list item matches the current filter criteria
     * @param {HTMLElement} li - The list item to check
     * @param {string} titleNeedle - Title filter text
     * @param {string} prioNeedle - Priority filter value
     * @returns {boolean} - True if item matches filters
     */
    function matches(li, titleNeedle, prioNeedle) {
      const titleEl = li.querySelector(".title");
      if (!titleEl) return false;

      const text = titleEl.textContent || "";

      // Normalize strings for case-insensitive comparison
      const norm = s => (s || "").toLowerCase().trim();
>>>>>>> main
      const titleOk = !titleNeedle || norm(text).includes(norm(titleNeedle));

      // Extract priority from text (format: "Task title (Hoch|Mittel|Niedrig)")
      const m = text.match(/\((Hoch|Mittel|Niedrig)\)\s*$/);
      const prio = m ? m[1] : '';
      const prioOk = !prioNeedle || prio === prioNeedle;

      return titleOk && prioOk;
    }

<<<<<<< HEAD
    function postFilter () {
      const list = document.getElementById('taskList');
=======
    /**
     * Applies current filters to the task list
     * Shows/hides items based on filter matches
     */
    function postFilter() {
      const list = document.getElementById("taskList");
>>>>>>> main
      if (!list) return;

      const titleNeedle = titleInput.value;
      const prioNeedle = prioSelect.value;

<<<<<<< HEAD
      Array.from(list.querySelectorAll('li')).forEach(li => {
        li.style.display = matches(li, titleNeedle, prioNeedle) ? '' : 'none';
      });
    }

    window.render = function wrappedRender () {
      originalRender(); // draw full list
      postFilter(); // then hide non-matching items
=======
      // Filter each list item
      Array.from(list.querySelectorAll("li")).forEach(li => {
        li.style.display = matches(li, titleNeedle, prioNeedle) ? "" : "none";
      });
    }

    /**
     * Wrapped render function that applies filters after rendering
     * Replaces global render function with enhanced version
     */
    window.render = function wrappedRender() {
      originalRender(); // Draw full list using original function
      postFilter();     // Apply current filters to hide non-matching items
>>>>>>> main
    };

    // Mark as wrapped to prevent duplicate enhancements
    window.__filterWrapped = true;

<<<<<<< HEAD
    // Live updates when the user types/changes
    titleInput.addEventListener('input', () => window.render());
    prioSelect.addEventListener('change', () => window.render());
=======
    // ========== EVENT LISTENERS ==========

    /**
     * Live filtering - update display on user input
     * Re-renders whenever filter values change
     */
    titleInput.addEventListener("input", () => window.render());
    prioSelect.addEventListener("change", () => window.render());
>>>>>>> main

    // Initial filter application
    try {
      window.render();
    } catch (error) {
      // Silent fail if initial render fails
    }
  });
})();
