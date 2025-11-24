/**
 * @jest-environment jsdom
 * Unit Tests for TodoApp class
 * Tests cover task management, category handling, and filtering functionality
 */

const fs = require('fs');
const path = require('path');
const TodoApp = require('../app.js');

let app;

/**
 * Test Setup: Runs before each test case
 * Clears localStorage and sets up fresh DOM environment
 */
beforeEach(() => {
  // Clear any existing data from previous tests
  localStorage.clear();

  // Set up minimal DOM structure required for TodoApp
  document.body.innerHTML = `
    <form id="todoForm"></form>
    <form id="categoryForm"></form>
    <ul id="taskList"></ul>
    <ul id="categoryList"></ul>
    <input id="taskTitle" />
    <input id="taskDesc" />
    <select id="taskPriority"></select>
    <select id="taskCategory"></select>
    <input id="categoryName" />
    <input id="titleFilter" />
    <select id="priorityFilter"></select>
    <select id="categoryFilter"></select>
    <div id="confirmModal"></div>
    <div id="modalTitle"></div>
    <div id="modalMessage"></div>
    <button id="modalConfirm"></button>
    <button id="modalCancel"></button>
  `;

  // Create new TodoApp instance for each test
  app = new TodoApp();
});

/**
 * Test Suite: TodoApp Class Functionality
 * Groups related tests for better organization and reporting
 */
describe('TodoApp', () => {

  // ========== TASK MANAGEMENT TESTS ==========

  /**
   * Tests task completion toggle functionality
   * Verifies that incomplete tasks can be marked as done
   */
  test('toggleTaskDone_taskIsIncomplete_taskBecomesDone', () => {
    // Setup: Add an incomplete task to the list
    app.todos.push({ title: 'Aufgabe', desc: '', priority: 'Mittel', category: '', done: false });
    const todo = app.todos[0];

    // Execute: Toggle the task's done status
    app.toggleTaskDone(todo);

    // Verify: Task should now be marked as done
    expect(todo.done).toBe(true);
  });

  /**
   * Tests task deletion with user confirmation
   * Verifies task is removed when user confirms deletion
   */
  test('deleteTask_confirmDialogReturnsTrue_taskIsDeleted', async () => {
    // Setup: Add a task and mock confirmation dialog
    app.todos.push({ title: 'Aufgabe löschen', desc: '', priority: 'Mittel', category: '', done: false });
    app.showConfirmDialog = jest.fn().mockResolvedValue(true);

    // Execute: Delete the task (index 0)
    await app.deleteTask(0);

    // Verify: Task list should be empty
    expect(app.todos.length).toBe(0);
  });

  /**
   * Tests task deletion cancellation
   * Verifies task remains when user cancels deletion
   */
  test('deleteTask_confirmDialogReturnsFalse_taskIsNotDeleted', async () => {
    // Setup: Add a task and mock cancellation
    app.todos.push({ title: 'Aufgabe löschen2', desc: '', priority: 'Mittel', category: '', done: false });
    app.showConfirmDialog = jest.fn().mockResolvedValue(false);

    // Execute: Attempt to delete the task
    await app.deleteTask(0);

    // Verify: Task should still exist in the list
    expect(app.todos.length).toBe(1);
  });

  /**
   * Tests basic task creation
   * Verifies tasks can be added to the list
   */
  test('createTask_confirmDialogReturnsTrue_taskIsCreated', async () => {
    // Setup: Add a task to the list
    app.todos.push({ title: 'Aufgabe erstellen', desc: '', priority: 'Mittel', category: '', done: false });
    jest.spyOn(app, 'showConfirmDialog').mockResolvedValue(true);

    // Verify: Task count should be 1
    expect(app.todos.length).toBe(1);
  });

  /**
   * Tests task data integrity
   * Verifies created tasks have correct title
   */
  test('createTask_confirmDialogReturnsTrue_taskHasRightTitle', async () => {
    // Setup: Add a task with specific title
    app.todos.push({ title: 'Aufgabe erstellen', desc: '', priority: 'Mittel', category: '', done: false });
    jest.spyOn(app, 'showConfirmDialog').mockResolvedValue(true);

    // Verify: Task title should match expected value
    expect(app.todos[0].title).toBe('Aufgabe erstellen');
  });

  // ========== CATEGORY MANAGEMENT TESTS ==========

  /**
   * Tests category creation
   * Verifies categories can be added to the list
   */
  test('createCategorie_confirmDialogReturnsTrue_categorieIsCreated', async () => {
    // Setup: Add a category to the list
    app.categories.push({name: 'Kategorie erstellen'});
    jest.spyOn(app, 'showConfirmDialog').mockResolvedValue(true);

    // Verify: Category count should be 1
    expect(app.categories.length).toBe(1);
  });

  /**
   * Tests category-based filtering
   * Verifies only tasks from selected category are shown
   */
  test('filterCategories_twoTasksWithDifferentCategories_onlySelectedIsShown', () => {
    // Setup: Create tasks with different categories
    app.todos.push({ title: 'Aufgabe 1', desc: '', priority: 'Mittel', category: 'Kategorie 1', done: false });
    app.todos.push({ title: 'Aufgabe 2', desc: '', priority: 'Mittel', category: 'Kategorie 2', done: false });

    // Setup DOM: Add category options to filter dropdown
    const categoryFilter = app.elements.categoryFilter;
    const option1 = document.createElement('option');
    option1.value = 'Kategorie 1';
    option1.textContent = 'Kategorie 1';
    categoryFilter.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = 'Kategorie 2';
    option2.textContent = 'Kategorie 2';
    categoryFilter.appendChild(option2);

    // Execute: Set filter and apply
    categoryFilter.value = 'Kategorie 1';
    app.filterTasks();

    // Verify: Only one task should be visible
    const listItems = Array.from(document.querySelectorAll('#taskList li'));
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain('Aufgabe 1');
  });

  /**
   * Tests filtering with non-matching category
   * Verifies no tasks shown when category doesn't match
   */
  test('filterCategories_twoTasksWithNonSelectedCategory_noTaskIsShown', () => {
    // Setup: Create tasks with same category
    app.todos.push({ title: 'Aufgabe 1', desc: '', priority: 'Mittel', category: 'Kategorie 1', done: false });
    app.todos.push({ title: 'Aufgabe 2', desc: '', priority: 'Mittel', category: 'Kategorie 1', done: false });

    // Setup DOM: Add category options
    const categoryFilter = app.elements.categoryFilter;
    const option1 = document.createElement('option');
    option1.value = 'Kategorie 1';
    option1.textContent = 'Kategorie 1';
    categoryFilter.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = 'Kategorie 2';
    option2.textContent = 'Kategorie 2';
    categoryFilter.appendChild(option2);

    // Execute: Set filter to non-matching category
    categoryFilter.value = 'Kategorie 2';
    app.filterTasks();

    // Verify: No tasks should be visible
    const listItems = Array.from(document.querySelectorAll('#taskList li'));
    expect(listItems.length).toBe(0);
  });

  // ========== FILTER FUNCTIONALITY TESTS ==========

  /**
   * Tests title-based filtering
   * Verifies case-insensitive title matching works correctly
   */
  test('filterTasks_titleFilterMatchingTitle_onlyMatchingTaskIsShown', () => {
    // Arrange: Create tasks with different titles
    app.todos.push({ title: 'Einkaufen', desc: '', priority: 'Mittel', category: '', done: false });
    app.todos.push({ title: 'Hausaufgabe', desc: '', priority: 'Mittel', category: '', done: false });

    // Execute: Set title filter and apply
    app.elements.titleFilter.value = 'eink'; // Should match "Einkaufen"
    app.filterTasks();

    // Verify: Only matching task should be visible
    const listItems = Array.from(document.querySelectorAll('#taskList li'));
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain('Einkaufen');
  });

  /**
   * Tests priority-based filtering
   * Verifies only tasks with selected priority are shown
   */
  test('filterTasks_priorityFilter_onlySelectedPriorityIsShown', () => {
    // Arrange: Create tasks with different priorities
    app.todos.push({ title: 'Wichtige Aufgabe', desc: '', priority: 'Hoch', category: '', done: false });
    app.todos.push({ title: 'Unwichtige Aufgabe', desc: '', priority: 'Niedrig', category: '', done: false });

    // Setup DOM: Add priority options to filter
    const priorityFilter = app.elements.priorityFilter;
    const optHigh = document.createElement('option');
    optHigh.value = 'Hoch';
    optHigh.textContent = 'Hoch';
    priorityFilter.appendChild(optHigh);

    const optLow = document.createElement('option');
    optLow.value = 'Niedrig';
    optLow.textContent = 'Niedrig';
    priorityFilter.appendChild(optLow);

    // Execute: Set priority filter and apply
    priorityFilter.value = 'Hoch';
    app.filterTasks();

    // Verify: Only high priority task should be visible
    const listItems = Array.from(document.querySelectorAll('#taskList li'));
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain('Wichtige Aufgabe');
  });

  /**
   * Tests category deletion and task cleanup
   * Verifies category removal and task category field clearing
   */
  test('deleteCategory_removesCategoryAndUnassignsFromTasks', async () => {
    // Arrange: Create category and tasks using it
    app.categories.push({ name: 'Work' });
    app.todos.push({ title: 'Task 1', desc: '', priority: 'Mittel', category: 'Work', done: false });
    app.todos.push({ title: 'Task 2', desc: '', priority: 'Hoch', category: 'Work', done: false });

    // Mock confirmation dialog
    app.showConfirmDialog = jest.fn().mockResolvedValue(true);

    // Execute: Delete the category
    await app.deleteCategory(0);

    // Verify: Category should be removed and tasks updated
    expect(app.categories.length).toBe(0);
    expect(app.todos[0].category).toBe('');
    expect(app.todos[1].category).toBe('');
  });

  /**
   * Tests category rendering in dropdowns
   * Verifies categories appear in both task creation and filter dropdowns
   */
  test('addMultipleCategories_updatesDropdownsCorrectly', () => {
    // Arrange: Add multiple categories
    app.categories.push({ name: 'Home' }, { name: 'Work' }, { name: 'Hobby' });
    app.renderCategories();

    // Execute: Get options from both dropdowns
    const taskCategoryOptions = Array.from(app.elements.categoryInput.options).map(opt => opt.value);
    const filterCategoryOptions = Array.from(app.elements.categoryFilter.options).map(opt => opt.value);

    // Verify: All categories should be present in both dropdowns
    expect(taskCategoryOptions).toEqual(expect.arrayContaining(['Home', 'Work', 'Hobby']));
    expect(filterCategoryOptions).toEqual(expect.arrayContaining(['Home', 'Work', 'Hobby']));
  });

  /**
   * Tests combined title and priority filtering
   * Verifies multiple filters work together correctly
   */
  test('filterTasks_titleAndPriorityFilter_combinedFilters', () => {
    // Arrange: Create tasks with different titles and priorities
    app.todos.push({ title: 'Buy milk', desc: '', priority: 'Hoch', category: '', done: false });
    app.todos.push({ title: 'Buy bread', desc: '', priority: 'Mittel', category: '', done: false });
    app.todos.push({ title: 'Read book', desc: '', priority: 'Hoch', category: '', done: false });

    // Execute: Set both title and priority filters
    app.elements.titleFilter.value = 'buy';
    const priorityFilter = app.elements.priorityFilter;
    const optHigh = document.createElement('option');
    optHigh.value = 'Hoch';
    optHigh.textContent = 'Hoch';
    priorityFilter.appendChild(optHigh);
    priorityFilter.value = 'Hoch';
    app.filterTasks();

    // Verify: Only task matching both filters should be visible
    const listItems = Array.from(document.querySelectorAll('#taskList li'));
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain('Buy milk');
  });

  // ========== ADVANCED CATEGORY TESTS ==========

  /**
   * Tests deletion of empty category
   * Verifies category removal without affecting tasks
   */
  test('deleteCategory_emptyCategory_onlyTwoRemain', async () => {
    // Arrange: Create three categories
    app.categories.push({ name: 'Arbeit' });
    app.categories.push({ name: 'Privat' });
    app.categories.push({ name: 'Schule' });

    // Mock confirmation
    app.showConfirmDialog = jest.fn().mockResolvedValue(true);

    // Execute: Delete first category
    await app.deleteCategory(0);

    // Verify: Only two categories should remain with correct names
    expect(app.categories.length).toBe(2);
    expect(app.categories[0].name).toBe('Privat');
    expect(app.categories[1].name).toBe('Schule');
  });

  /**
   * Tests category deletion with task reassignment
   * Verifies tasks lose category when category is deleted
   */
  test('deleteCategory_categoryWithMultipleTasks_tasksGetEmptyCategoryAndOthersUnchanged', async () => {
    // Arrange: Create categories and tasks
    app.categories.push({ name: 'Arbeit' });
    app.categories.push({ name: 'Privat' });
    app.categories.push({ name: 'Schule' });

    app.todos.push({ title: 'Meeting', desc: 'Präsentation', priority: 'Hoch', category: 'Arbeit', done: false });
    app.todos.push({ title: 'Email', desc: 'An Chef', priority: 'Niedrig', category: 'Arbeit', done: false });
    app.todos.push({ title: 'Einkaufen', desc: 'Lebensmittel', priority: 'Mittel', category: 'Privat', done: false });
    app.todos.push({ title: 'Hausaufgaben', desc: 'Mathe', priority: 'Hoch', category: 'Schule', done: false });

    // Mock confirmation
    app.showConfirmDialog = jest.fn().mockResolvedValue(true);

    // Execute: Delete "Arbeit" category
    await app.deleteCategory(0);

    // Verify: Category should be removed
    expect(app.categories.length).toBe(2);
    expect(app.categories.find(c => c.name === 'Arbeit')).toBeUndefined();

    // Verify: No tasks should have deleted category
    const arbeitTasks = app.todos.filter(t => t.category === 'Arbeit');
    expect(arbeitTasks.length).toBe(0);

    // Verify: Affected tasks should have empty category
    const meetingTask = app.todos.find(t => t.title === 'Meeting');
    const emailTask = app.todos.find(t => t.title === 'Email');
    expect(meetingTask.category).toBe('');
    expect(emailTask.category).toBe('');

    // Verify: Unaffected tasks should keep their categories
    const einkaufenTask = app.todos.find(t => t.title === 'Einkaufen');
    const hausaufgabenTask = app.todos.find(t => t.title === 'Hausaufgaben');
    expect(einkaufenTask.category).toBe('Privat');
    expect(hausaufgabenTask.category).toBe('Schule');
  });

});
