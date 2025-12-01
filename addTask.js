/* global render */
const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const priorityInput = document.getElementById('task-priority');
const form = document.getElementById('todo-form');
const todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save () {
  localStorage.setItem('todos', JSON.stringify(todos));
}

window.save = save;

form.onsubmit = e => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  const priority = priorityInput.value;
  if (!title) return;

  todos.push({ title, desc, priority, done: false });
  titleInput.value = '';
  descInput.value = '';
  priorityInput.value = 'Mittel';
  save();
  render(); // <-- funktioniert jetzt, weil render global ist
};

render();
