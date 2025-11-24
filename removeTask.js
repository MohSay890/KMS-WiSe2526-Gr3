<<<<<<< HEAD
/* global render, save, todos */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.delete-btn');
=======
/**
 * removeTask.js - Handles task deletion with confirmation dialog
 * Provides click event handling for delete buttons in the todo list
 * Uses event delegation for dynamic elements
 */

/**
 * Global click event listener for delete functionality
 * Uses event delegation to handle dynamically created delete buttons
 */
document.addEventListener("click", (e) => {
  // Find the closest delete button to the clicked element
  const btn = e.target.closest(".delete-btn");

  // Exit if click wasn't on a delete button
>>>>>>> main
  if (!btn) return;

  // Get the task index from data attribute
  const index = btn.dataset.index;

  // Validate that index exists and is defined
  if (index === undefined) return;

<<<<<<< HEAD
  if (confirm('Diese Aufgabe wirklich löschen?')) {
=======
  /**
   * Show confirmation dialog before deletion
   * Only delete if user confirms the action
   */
  if (confirm("Diese Aufgabe wirklich löschen?")) {
    // Remove task from todos array using the index
>>>>>>> main
    todos.splice(index, 1);

    // Persist changes to localStorage
    save();

    // Update the UI to reflect changes
    render();
  }
});
