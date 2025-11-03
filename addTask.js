const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDesc');
const priorityInput = document.getElementById('taskPriority');
const form = document.getElementById('todoForm');
const list = document.getElementById('taskList');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let editingIndex = null;

const priorityOrder = { Hoch: 1, Mittel: 2, Niedrig: 3 };

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function sortTodosByPriority() {
  todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

form.onsubmit = e => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  const priority = priorityInput.value;

  if (!title) return;

  const task = {
    title,
    desc,
    priority,
    done: false
  };

  if (editingIndex !== null) {
    todos[editingIndex] = task;
    editingIndex = null;
  } else {
    todos.push(task);
  }

  sortTodosByPriority();
  save();
  render();

  titleInput.value = '';
  descInput.value = '';
  priorityInput.value = 'Mittel';
};

function render() {
  list.innerHTML = '';

  if (todos.length === 0) {
    list.innerHTML = '<p style="text-align:center;">Keine Aufgaben vorhanden.</p>';
    return;
  }

  todos.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    li.innerHTML = `
      <div class="task-header">
        <label class="checkbox-title">
          <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleDone(${index})">
          <span class="title">${task.title}</span>
        </label>
        <span class="priority">(${task.priority})</span>
      </div>
      <p class="desc">${task.desc}</p>
      <div class="actions">
        <button onclick="editTask(${index})">Bearbeiten</button>
      </div>
    `;

    list.appendChild(li);
  });
}

window.toggleDone = function(index) {
  todos[index].done = !todos[index].done;
  sortTodosByPriority();
  save();
  render();
};

window.editTask = function(index) {
  const task = todos[index];
  titleInput.value = task.title;
  descInput.value = task.desc;
  priorityInput.value = task.priority;
  editingIndex = index;
};

render();
