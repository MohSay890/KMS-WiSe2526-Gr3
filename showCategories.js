/**
 * showCategories.js - Displays categories in the category list
 * Renders all categories from the global categories array to the DOM
 * Uses a simple standalone approach without classes
 */

// Get reference to the category list container in the DOM
const categoryList = document.getElementById('categoryList');

/**
 * Renders all categories to the category list in the UI
 * Clears existing content and recreates the list from the categories array
 * Each category is displayed as a list item with its name
 */
function renderCategories() {
  // Clear the existing category list to avoid duplicates
  categoryList.innerHTML = '';

  // Iterate through each category and create DOM elements
  categories.forEach(cat => {
    // Create list item for the category
    const li = document.createElement('li');

    // Create div element for the category name with appropriate styling class
    const title = document.createElement('div');
    title.className = 'name';  // CSS class for styling
    title.textContent = cat.name;  // Set the category name as text content

    // Append the title to the list item
    li.append(title);

    // Add the completed list item to the category list container
    categoryList.appendChild(li);
  });
}

// Initial render when the script loads to display existing categories
renderCategories();
