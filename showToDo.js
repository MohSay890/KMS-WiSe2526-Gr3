/**
 * showToDo.js - Main rendering function for the todo list
 * Globally available function that renders all tasks to the DOM
 * Creates the complete UI for the task list with interactive elements
 */

/**
 * Renders the entire todo list to the DOM
 * Clears existing list and recreates all task elements
 * Handles task display, styling, and delete functionality
 */
function render() {
  // Get reference to the task list container
  const list = document.getElementById('taskList');

  // Clear existing list to prevent duplicate entries
  list.innerHTML = '';

  // Iterate through all tasks and create DOM elements
  todos.forEach((todo) => {
    // Create list item for the task
    const li = document.createElement('li');

    // Add 'done' CSS class if task is completed
    if (todo.done) li.classList.add('done');

    // Create title element with task name and priority
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = `${todo.title} (${todo.priority})`; // Format: "Task name (Priority)"

    // Create description element
    const desc = document.createElement('div');
    desc.className = 'desc';
    desc.textContent = todo.desc;

    // Create actions container for interactive elements
    const actions = document.createElement('div');
    actions.className = 'actions';

    // Create delete button with click handler
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ Löschen";

    /**
     * Delete button click handler
     * Removes the task from the todos array and updates UI
     */
    deleteBtn.onclick = () => {
      // Filter out the current task by title comparison
      todos = todos.filter(t => t.title !== todo.title);

      // Persist changes to localStorage
      save();

      // Re-render the updated list
      render();
    };

    // Add delete button to actions container
    actions.appendChild(deleteBtn);

    // Assemble the task element hierarchy
    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(actions);

    // Add completed task element to the list
    list.appendChild(li);
  });
}
