const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDesc');
const priorityInput = document.getElementById('taskPriority');
const list = document.getElementById('taskList');
const form = document.getElementById('todoForm');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function render() {
  localStorage.clear();
  list.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = `${todo.title} (${todo.priority})`;

    const desc = document.createElement('div');
    desc.className = 'desc';
    desc.textContent = todo.desc;

    const actions = document.createElement('div');
    actions.className = 'actions';

    /*const doneBtn = document.createElement('button');
    doneBtn.textContent = todo.done ? 'Rückgängig' : 'Erledigt';
    doneBtn.onclick = () => {
      todo.done = !todo.done;
      save();
      render();
    };*/

    //actions.appendChild(doneBtn);

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

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
  render();
};

render();
