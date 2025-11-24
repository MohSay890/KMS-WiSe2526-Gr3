<<<<<<< HEAD
/* global render, save, todos */
(function () {
  // Wait until DOM is ready and render() exists
  function ready (fn) { document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    if (typeof render !== 'function') return; // showToDo.js
    if (window.__prioWrapped) return; // avoid double wrapping
=======
/**
 * editPriority.js - Enhances todo list with editable priority dropdowns
 * This IIFE (Immediately Invoked Function Expression) wraps the global render function
 * to add priority editing capability to each task
 */

(function () {
  /**
   * DOM ready helper function
   * Executes callback when DOM is fully loaded
   * @param {Function} fn - Callback function to execute
   */
  function ready(fn) {
    document.readyState !== "loading" ? fn() : document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    // Check if required global render function exists
    if (typeof render !== "function") return;    // Requires render from showToDo.js
>>>>>>> main

    // Prevent double execution of this enhancement
    if (window.__prioWrapped) return;            // Avoid double wrapping

    // Store reference to original render function
    const originalRender = render;

<<<<<<< HEAD
    // Enhance the list after the original render runs
    function enhancePriorities () {
      const list = document.getElementById('taskList');
      if (!list) return;

      const items = Array.from(list.querySelectorAll('li'));
      items.forEach((li, i) => {
        // Find or create the actions container
        let actions = li.querySelector('.actions');
=======
    /**
     * Enhances task list with priority dropdown editors
     * Adds select elements to each task for priority editing
     */
    function enhancePriorities() {
      const list = document.getElementById("taskList");
      if (!list) return;

      // Get all task list items
      const items = Array.from(list.querySelectorAll("li"));

      items.forEach((li, i) => {
        // Find or create actions container for buttons and dropdown
        let actions = li.querySelector(".actions");
>>>>>>> main
        if (!actions) {
          actions = document.createElement('div');
          actions.className = 'actions';
          li.appendChild(actions);
        }

<<<<<<< HEAD
        // If a priority select already exists, skip creating a duplicate
        let select = actions.querySelector('select.prio-edit');
        if (!select) {
          select = document.createElement('select');
          select.className = 'prio-edit';
          ['Hoch', 'Mittel', 'Niedrig'].forEach(p => {
            const opt = document.createElement('option');
=======
        // Check if priority select already exists to avoid duplicates
        let select = actions.querySelector("select.prio-edit");
        if (!select) {
          // Create new priority dropdown
          select = document.createElement("select");
          select.className = "prio-edit";

          // Add priority options
          ["Hoch", "Mittel", "Niedrig"].forEach(p => {
            const opt = document.createElement("option");
>>>>>>> main
            opt.value = p;
            opt.textContent = p;
            select.appendChild(opt);
          });

<<<<<<< HEAD
          // Insert the select before the delete button if present, otherwise append
          const deleteBtn = actions.querySelector('button');
=======
          // Insert dropdown in correct position (before delete button)
          const deleteBtn = actions.querySelector("button");
>>>>>>> main
          if (deleteBtn) {
            actions.insertBefore(select, deleteBtn);
          } else {
            actions.appendChild(select);
          }
        }

<<<<<<< HEAD
        // Set current value from the in-memory todos array
        try { select.value = todos[i]?.priority ?? 'Mittel'; } catch {}
=======
        // Set current priority value from todos array
        try {
          select.value = todos[i]?.priority ?? "Mittel";
        } catch (error) {
          // Silent fail - use default value if error occurs
        }
>>>>>>> main

        /**
         * Handle priority change event
         * Updates the task priority and triggers re-render
         */
        select.onchange = (e) => {
          try {
            // Update priority in the data model
            todos[i].priority = e.target.value;

            // Persist changes and update UI
            save();
            render();
          } catch (error) {
            // Fallback: if update fails, attempt to re-render
            try {
              render();
            } catch (fallbackError) {
              // Final fallback - do nothing if both attempts fail
            }
          }
        };
      });
    }

<<<<<<< HEAD
    // Wrap global render()
    window.render = function wrappedRender () {
      originalRender(); // draw original UI
      enhancePriorities(); // add editable priority controls
=======
    /**
     * Wrapped render function that enhances priorities after original render
     * This replaces the global render function with enhanced version
     */
    window.render = function wrappedRender() {
      originalRender();      // Execute original render function
      enhancePriorities();   // Add priority editing controls
>>>>>>> main
    };

    // Mark as wrapped to prevent duplicate execution
    window.__prioWrapped = true;

    // Initial execution in case page rendered before this script loaded
    try {
      render();
    } catch (error) {
      // Silent fail if initial render fails
    }
  });
})();
