<<<<<<< HEAD
/* global render */
=======
/**
 * addTask.js - Handles task creation and management
 * This file contains functionality for adding new tasks to the todo list
 * Uses a standalone approach without classes
 */

// Get DOM elements for task form and display
>>>>>>> main
const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDesc');
const priorityInput = document.getElementById('taskPriority');
const form = document.getElementById('todoForm');
const todos = JSON.parse(localStorage.getItem('todos') || '[]');

<<<<<<< HEAD
function save () {
  localStorage.setItem('todos', JSON.stringify(todos));
}

window.save = save;

=======
// Load todos from localStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

/**
 * Saves todos to localStorage
 * Persists the todos array to browser storage
 */
function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * Handles task form submission
 * Creates a new task and saves it to localStorage
 * @param {Event} e - The form submission event
 */
>>>>>>> main
form.onsubmit = e => {
  // Prevent default form submission behavior
  e.preventDefault();

  // Get and trim input values
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  const priority = priorityInput.value;

  // Validate: task title cannot be empty
  if (!title) return;

  // Add new task to todos array with default values
  todos.push({ title, desc, priority, done: false });

  // Reset form fields for better UX
  titleInput.value = '';
  descInput.value = '';
  priorityInput.value = 'Mittel';

  // Save updated todos to localStorage
  save();

  // Call global render function to update UI
  // Works because render is defined globally (from showToDo.js)
  render();
};

// Initial render when the script loads
render();
