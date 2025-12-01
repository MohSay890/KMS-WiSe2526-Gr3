// TodoApp: Main application class
class TodoApp {
  constructor () {
    // Initialize DOM elements
    this.elements = {
      titleInput: document.getElementById('task-title'),
      descInput: document.getElementById('task-desc'),
      priorityInput: document.getElementById('task-priority'),
      categoryInput: document.getElementById('task-category'),
      taskList: document.getElementById('task-list'),
      todoForm: document.getElementById('todo-form'),
      categoryForm: document.getElementById('category-form'),
      categoryList: document.getElementById('category-list'),
      categoryNameInput: document.getElementById('category-name'),
      titleFilter: document.getElementById('title-filter'),
      priorityFilter: document.getElementById('priority-filter'),
      categoryFilter: document.getElementById('category-filter'),
      modal: document.getElementById('confirm-modal'),
      modalTitle: document.getElementById('modal-title'),
      modalMessage: document.getElementById('modal-message'),
      modalConfirm: document.getElementById('modal-confirm'),
      modalCancel: document.getElementById('modal-cancel')
    };

    // Initialize data
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');

    // Bind methods to maintain 'this' context
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
    this.filterTasks = this.filterTasks.bind(this);

    // Initialize event listeners
    this.initializeEventListeners();
  }

  // Event Listeners Setup
  initializeEventListeners () {
    this.elements.todoForm.onsubmit = this.handleTaskSubmit;
    this.elements.categoryForm.onsubmit = this.handleCategorySubmit;
    this.elements.titleFilter.addEventListener('input', this.filterTasks);
    this.elements.priorityFilter.addEventListener('change', this.filterTasks);
    this.elements.categoryFilter.addEventListener('change', this.filterTasks);
  }

  // Task Management Methods
  handleTaskSubmit (e) {
    e.preventDefault();
    const title = this.elements.titleInput.value.trim();
    const desc = this.elements.descInput.value.trim();
    const priority = this.elements.priorityInput.value;
    const category = this.elements.categoryInput.value;

    if (!title) return;

    this.todos.push({ title, desc, priority, category, done: false });
    this.elements.titleInput.value = '';
    this.elements.descInput.value = '';
    this.elements.priorityInput.value = 'Mittel';
    this.elements.categoryInput.value = '';

    this.save();
    this.render();
  }

  toggleTaskDone (todo) {
    todo.done = !todo.done;
    this.save();
    this.render();
  }

  showConfirmDialog (title, message) {
    return new Promise((resolve) => {
      this.elements.modalTitle.textContent = title;
      this.elements.modalMessage.textContent = message;
      this.elements.modal.classList.add('show');

      const handleConfirm = () => {
        this.elements.modal.classList.remove('show');
        this.elements.modalConfirm.removeEventListener('click', handleConfirm);
        this.elements.modalCancel.removeEventListener('click', handleCancel);
        resolve(true);
      };

      const handleCancel = () => {
        this.elements.modal.classList.remove('show');
        this.elements.modalConfirm.removeEventListener('click', handleConfirm);
        this.elements.modalCancel.removeEventListener('click', handleCancel);
        resolve(false);
      };

      this.elements.modalConfirm.addEventListener('click', handleConfirm);
      this.elements.modalCancel.addEventListener('click', handleCancel);
    });
  }

  async deleteTask (index) {
    const confirmed = await this.showConfirmDialog(
      'Aufgabe löschen',
      'Möchtest du diese Aufgabe wirklich löschen?'
    );

    if (confirmed) {
      this.todos.splice(index, 1);
      this.save();
      this.render();
    }
  }

  // Category Management Methods
  handleCategorySubmit (e) {
    e.preventDefault();
    const categoryName = this.elements.categoryNameInput.value.trim();
    if (!categoryName) return;

    this.categories.push({ name: categoryName });
    this.elements.categoryNameInput.value = '';
    this.save();
    this.renderCategories();
  }

  async deleteCategory (index) {
    const confirmed = await this.showConfirmDialog(
      'Kategorie löschen',
      'Möchtest du diese Kategorie wirklich löschen? Alle Aufgaben in dieser Kategorie werden keiner Kategorie zugeordnet.'
    );

    if (confirmed) {
      const categoryName = this.categories[index].name;
      this.categories.splice(index, 1);

      // Update tasks that used this category
      this.todos = this.todos.map(todo =>
        todo.category === categoryName ? { ...todo, category: '' } : todo
      );

      this.save();
      this.renderCategories();
      this.render();
    }
  }

  // Filter Methods
  filterTasks () {
    const titleValue = this.elements.titleFilter.value.toLowerCase();
    const priorityValue = this.elements.priorityFilter.value;
    const categoryValue = this.elements.categoryFilter.value;

    const filteredTodos = this.todos.filter(todo => {
      const titleMatch = todo.title.toLowerCase().includes(titleValue);
      const priorityMatch = !priorityValue || todo.priority === priorityValue;
      const categoryMatch = !categoryValue || todo.category === categoryValue;
      return titleMatch && priorityMatch && categoryMatch;
    });

    this.renderTasks(filteredTodos);
  }

  // Render Methods
  render () {
    this.renderTasks(this.todos);
  }

  renderTasks (todosToRender) {
    const list = this.elements.taskList;
    list.innerHTML = '';

    todosToRender.forEach((todo, index) => {
      const li = document.createElement('li');
      if (todo.done) li.classList.add('done');

      const title = document.createElement('div');
      title.className = 'title';

      const prioritySpan = document.createElement('span');
      prioritySpan.className = `priority priority-${todo.priority.toLowerCase()}`;
      const priorityIcon = todo.priority === 'Hoch' ? '🔴' : todo.priority === 'Mittel' ? '🟡' : '🟢';
      prioritySpan.textContent = `${priorityIcon} ${todo.priority}`;

      const categorySpan = document.createElement('span');
      categorySpan.className = 'category';
      categorySpan.textContent = todo.category ? `📁 ${todo.category}` : '';

      title.textContent = todo.title;
      title.appendChild(prioritySpan);
      if (todo.category) title.appendChild(categorySpan);

      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = todo.desc;

      const actions = document.createElement('div');
      actions.className = 'actions';

      const markBtn = document.createElement('button');
      markBtn.textContent = todo.done ? '✓ Erledigt' : 'Markieren';
      markBtn.className = todo.done ? 'btn-success' : 'btn-primary';
      markBtn.onclick = () => this.toggleTaskDone(todo);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️ Löschen';
      deleteBtn.className = 'btn-danger';
      deleteBtn.onclick = () => this.deleteTask(this.todos.indexOf(todo));

      actions.appendChild(markBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(title);
      li.appendChild(desc);
      li.appendChild(actions);
      list.appendChild(li);
    });
  }

  renderCategories () {
    this.elements.categoryList.innerHTML = '';
    this.elements.categoryInput.innerHTML = '<option value="">📂 Kategorie auswählen</option>';
    this.elements.categoryFilter.innerHTML = '<option value="">📂 Alle Kategorien</option>';

    this.categories.forEach((category, index) => {
      // Add to category list
      const li = document.createElement('li');
      li.className = 'category-item';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = category.name;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Löschen';
      deleteBtn.className = 'btn-danger';
      deleteBtn.onclick = () => this.deleteCategory(index);

      li.appendChild(nameSpan);
      li.appendChild(deleteBtn);
      this.elements.categoryList.appendChild(li);

      // Add to dropdowns
      [this.elements.categoryInput, this.elements.categoryFilter].forEach(select => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        select.appendChild(option);
      });
    });
  }

  // Storage Methods
  save () {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  window.todoApp = new TodoApp();
  window.todoApp.render();
  window.todoApp.renderCategories();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TodoApp;
}
