/**
 * addCategory.js - Handles category creation and management
 * This file contains functionality for adding new categories to the todo list
 */

// Get DOM elements for category form
const categoryNameInput = document.getElementById('categoryName');
const categoryForm = document.getElementById('categoryForm');

<<<<<<< HEAD
const categories = JSON.parse(localStorage.getItem('categories') || '[]');

function saveCategories () {
=======
// Load categories from localStorage or initialize empty array
let categories = JSON.parse(localStorage.getItem('categories') || '[]');

/**
 * Saves categories to localStorage
 * Persists the categories array to browser storage
 */
function saveCategories() {
>>>>>>> main
  localStorage.setItem('categories', JSON.stringify(categories));
}

/**
 * Handles category form submission
 * Creates a new category and saves it to localStorage
 * @param {Event} e - The form submission event
 */
categoryForm.onsubmit = e => {
  // Prevent default form submission behavior
  e.preventDefault();

  // Get and trim category name from input
  const name = categoryNameInput.value.trim();

  // Validate: category name cannot be empty
  if (!name) return;

  // Add new category to categories array
  categories.push({ name });

  // Save updated categories to localStorage
  saveCategories();

  // Clear the input field for better UX
  categoryNameInput.value = '';

  // Call renderCategories if it exists (optional chaining)
  // This allows for flexible integration with the main app
  renderCategories?.();
};

// Define renderCategories to avoid 'not defined' error
function renderCategories () {
  // Placeholder created to prevent errors and rendering logic can be implemented (if needed) in this function
}
