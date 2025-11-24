/**
 * TodoApp - Hauptanwendungsklasse für die Todo-Liste
 * Verwaltet Aufgaben, Kategorien, Filter und die Benutzeroberfläche
 */
class TodoApp {
<<<<<<< HEAD
  constructor () {
    // Initialize DOM elements
=======
  /**
   * Initialisiert die TodoApp
   * Lädt Daten aus localStorage und bindet Event-Listener
   */
  constructor() {
    // DOM-Elemente initialisieren
>>>>>>> main
    this.elements = {
      titleInput: document.getElementById('taskTitle'),
      descInput: document.getElementById('taskDesc'),
      priorityInput: document.getElementById('taskPriority'),
      categoryInput: document.getElementById('taskCategory'),
      taskList: document.getElementById('taskList'),
      todoForm: document.getElementById('todoForm'),
      categoryForm: document.getElementById('categoryForm'),
      categoryList: document.getElementById('categoryList'),
      categoryNameInput: document.getElementById('categoryName'),
      titleFilter: document.getElementById('titleFilter'),
      priorityFilter: document.getElementById('priorityFilter'),
      categoryFilter: document.getElementById('categoryFilter'),
      modal: document.getElementById('confirmModal'),
      modalTitle: document.getElementById('modalTitle'),
      modalMessage: document.getElementById('modalMessage'),
      modalConfirm: document.getElementById('modalConfirm'),
      modalCancel: document.getElementById('modalCancel')
    };

<<<<<<< HEAD
    // Initialize data
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');

    // Bind methods to maintain 'this' context
=======
    // Daten aus localStorage laden oder leere Arrays initialisieren
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');

    // Methoden binden um 'this' Kontext zu erhalten
>>>>>>> main
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
    this.filterTasks = this.filterTasks.bind(this);

<<<<<<< HEAD
    // Initialize event listeners
    this.initializeEventListeners();
  }

  // Event Listeners Setup
  initializeEventListeners () {
=======
    // Event-Listener initialisieren
    this.initializeEventListeners();
  }

  /**
   * Event-Listener für Formulare und Filter setzen
   */
  initializeEventListeners() {
>>>>>>> main
    this.elements.todoForm.onsubmit = this.handleTaskSubmit;
    this.elements.categoryForm.onsubmit = this.handleCategorySubmit;
    this.elements.titleFilter.addEventListener('input', this.filterTasks);
    this.elements.priorityFilter.addEventListener('change', this.filterTasks);
    this.elements.categoryFilter.addEventListener('change', this.filterTasks);
  }

<<<<<<< HEAD
  // Task Management Methods
  handleTaskSubmit (e) {
=======
  // ========== AUFGABEN-MANAGEMENT ==========

  /**
   * Behandelt das Erstellen einer neuen Aufgabe
   * @param {Event} e - Das Submit-Event
   */
  handleTaskSubmit(e) {
>>>>>>> main
    e.preventDefault();
    const title = this.elements.titleInput.value.trim();
    const desc = this.elements.descInput.value.trim();
    const priority = this.elements.priorityInput.value;
    const category = this.elements.categoryInput.value;

<<<<<<< HEAD
    if (!title) return;

    this.todos.push({ title, desc, priority, category, done: false });
=======
    // Validierung: Titel darf nicht leer sein
    if (!title) return;

    // Neue Aufgabe zur Liste hinzufügen
    this.todos.push({ title, desc, priority, category, done: false });

    // Formular zurücksetzen
>>>>>>> main
    this.elements.titleInput.value = '';
    this.elements.descInput.value = '';
    this.elements.priorityInput.value = 'Mittel';
    this.elements.categoryInput.value = '';

<<<<<<< HEAD
=======
    // Speichern und aktualisieren
>>>>>>> main
    this.save();
    this.render();
  }

<<<<<<< HEAD
  toggleTaskDone (todo) {
=======
  /**
   * Schaltet den Erledigt-Status einer Aufgabe um
   * @param {Object} todo - Die umzuschaltende Aufgabe
   */
  toggleTaskDone(todo) {
>>>>>>> main
    todo.done = !todo.done;
    this.save();
    this.render();
  }

<<<<<<< HEAD
  showConfirmDialog (title, message) {
    return new Promise((resolve) => {
=======
  /**
   * Zeigt einen Bestätigungs-Dialog an
   * @param {string} title - Titel des Dialogs
   * @param {string} message - Nachricht des Dialogs
   * @returns {Promise<boolean>} - Promise das true/false zurückgibt
   */
  showConfirmDialog(title, message) {
    return new Promise((resolve) => {
      // Dialog-Inhalt setzen
>>>>>>> main
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

<<<<<<< HEAD
=======
      // Event-Listener für Buttons setzen
>>>>>>> main
      this.elements.modalConfirm.addEventListener('click', handleConfirm);
      this.elements.modalCancel.addEventListener('click', handleCancel);
    });
  }

<<<<<<< HEAD
  async deleteTask (index) {
=======
  /**
   * Löscht eine Aufgabe nach Bestätigung
   * @param {number} index - Index der zu löschenden Aufgabe
   */
  async deleteTask(index) {
>>>>>>> main
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

<<<<<<< HEAD
  // Category Management Methods
  handleCategorySubmit (e) {
    e.preventDefault();
    const categoryName = this.elements.categoryNameInput.value.trim();
=======
  // ========== KATEGORIEN-MANAGEMENT ==========

  /**
   * Behandelt das Erstellen einer neuen Kategorie
   * @param {Event} e - Das Submit-Event
   */
  handleCategorySubmit(e) {
    e.preventDefault();
    const categoryName = this.elements.categoryNameInput.value.trim();

    // Validierung: Kategoriename darf nicht leer sein
>>>>>>> main
    if (!categoryName) return;

    this.categories.push({ name: categoryName });
    this.elements.categoryNameInput.value = '';
    this.save();
    this.renderCategories();
  }

<<<<<<< HEAD
  async deleteCategory (index) {
=======
  /**
   * Löscht eine Kategorie und entfernt sie aus allen Aufgaben
   * @param {number} index - Index der zu löschenden Kategorie
   */
  async deleteCategory(index) {
>>>>>>> main
    const confirmed = await this.showConfirmDialog(
      'Kategorie löschen',
      'Möchtest du diese Kategorie wirklich löschen? Alle Aufgaben in dieser Kategorie werden keiner Kategorie zugeordnet.'
    );

    if (confirmed) {
      const categoryName = this.categories[index].name;
<<<<<<< HEAD
      this.categories.splice(index, 1);

      // Update tasks that used this category
=======

      // Kategorie aus Liste entfernen
      this.categories.splice(index, 1);

      // Kategorie aus allen Aufgaben entfernen
>>>>>>> main
      this.todos = this.todos.map(todo =>
        todo.category === categoryName ? { ...todo, category: '' } : todo
      );

      this.save();
      this.renderCategories();
      this.render();
    }
  }

<<<<<<< HEAD
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
=======
  // ========== FILTER-METHODEN ==========

  /**
   * Filtert Aufgaben basierend auf Titel, Priorität und Kategorie
   */
  filterTasks() {
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

  // ========== RENDER-METHODEN ==========

  /**
   * Rendert alle Aufgaben (Haupt-Render-Methode)
   */
  render() {
    this.renderTasks(this.todos);
  }

  /**
   * Rendert die Aufgaben-Liste
   * @param {Array} todosToRender - Array von Aufgaben zum Rendern
   */
  renderTasks(todosToRender) {
    const list = this.elements.taskList;
    list.innerHTML = '';

    todosToRender.forEach((todo, index) => {
      const li = document.createElement('li');
      if (todo.done) li.classList.add('done');

      // Titel mit Priorität und Kategorie
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

      // Beschreibung
      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = todo.desc;

      // Aktions-Buttons
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

      // Elemente zur Liste hinzufügen
      li.appendChild(title);
      li.appendChild(desc);
      li.appendChild(actions);
      list.appendChild(li);
    });
  }

  /**
   * Rendert die Kategorien-Liste und Dropdowns
   */
  renderCategories() {
    // Listen leeren
    this.elements.categoryList.innerHTML = '';
    this.elements.categoryInput.innerHTML = '<option value="">📂 Kategorie auswählen</option>';
    this.elements.categoryFilter.innerHTML = '<option value="">📂 Alle Kategorien</option>';

    this.categories.forEach((category, index) => {
      // Zur Kategorien-Liste hinzufügen
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

      // Zu beiden Dropdowns hinzufügen
      [this.elements.categoryInput, this.elements.categoryFilter].forEach(select => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        select.appendChild(option);
      });
    });
  }

  // ========== SPEICHER-METHODEN ==========

  /**
   * Speichert alle Daten im localStorage
   */
  save() {
>>>>>>> main
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }
}

// Anwendung initialisieren wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
  window.todoApp = new TodoApp();
  window.todoApp.render();
  window.todoApp.renderCategories();
});

<<<<<<< HEAD
=======
// Export für Node.js (Unit-Tests)
>>>>>>> main
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TodoApp;
}
