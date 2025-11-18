
// ============================================
// TodoApp Klasse
// ============================================
class TodoApp {
    constructor() {
        this.todos = [];
        this.categories = [];
    }

    addTask(title, desc, priority, category) {
        this.todos.push({ title, desc, priority, category, done: false });
    }

    addCategory(name) {
        this.categories.push({ name });
    }

    deleteCategory(index) {
        const categoryName = this.categories[index].name;
        this.categories.splice(index, 1);

        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].category === categoryName) {
                this.todos[i].category = '';
            }
        }
    }
}

// ============================================
// Test Class
// ============================================
class TodoAppTest {
    constructor() {
        this.app = null;
    }

    setUp() {
        this.app = new TodoApp();
    }

    // Helper functions
    addCategory(name) {
        this.app.addCategory(name);
    }

    addTask(title, category) {
        this.app.addTask(title, 'Beschreibung', 'Mittel', category);
    }

    addManyCategories(n, namePrefix) {
        for (let i = 0; i < n; i++) {
            this.addCategory(namePrefix + i);
        }
    }

    // ============================================
    // Erster Test - Leere Kategorie löschen
    // ============================================
    testDeleteEmptyCategory() {
        this.setUp();
        this.addCategory('Arbeit');
        this.addCategory('Privat');
        this.addCategory('Schule');

        this.app.deleteCategory(0);

        if (this.app.categories.length !== 2) {
            throw new Error(`expected:<2> but was:<${this.app.categories.length}>`);
        }
    }

    // ============================================
    // Zweiter Test - Kategorie mit Aufgaben löschen
    // ============================================
    testDeleteCategoryWithTasks() {
        this.setUp();
        this.addCategory('Arbeit');
        this.addCategory('Privat');
        this.addCategory('Schule');
        this.addTask('Meeting', 'Arbeit');
        this.addTask('Email', 'Arbeit');
        this.addTask('Einkaufen', 'Privat');

        this.app.deleteCategory(0);

        if (this.app.categories.length !== 2) {
            throw new Error(`expected:<2> but was:<${this.app.categories.length}>`);
        }

        // Prüfe ob Aufgaben aktualisiert wurden
        let arbeitCount = 0;
        for (let i = 0; i < this.app.todos.length; i++) {
            if (this.app.todos[i].category === 'Arbeit') {
                arbeitCount++;
            }
        }
        if (arbeitCount !== 0) {
            throw new Error(`expected:<0> tasks with "Arbeit" but was:<${arbeitCount}>`);
        }

        // Prüfe ob Aufgaben leere Kategorie haben
        let emptyCount = 0;
        for (let i = 0; i < this.app.todos.length; i++) {
            if ((this.app.todos[i].title === 'Meeting' ||
                    this.app.todos[i].title === 'Email') &&
                this.app.todos[i].category === '') {
                emptyCount++;
            }
        }
        if (emptyCount !== 2) {
            throw new Error(`expected:<2> tasks with empty category but was:<${emptyCount}>`);
        }

        // Prüfe ob andere Kategorien unverändert sind
        const einkaufenTask = this.app.todos.find(t => t.title === 'Einkaufen');
        if (einkaufenTask.category !== 'Privat') {
            throw new Error(`expected:<Privat> but was:<${einkaufenTask.category}>`);
        }
    }

    // ============================================
    // Alle Tests ausführen
    // ============================================
    runAllTests() {
        console.log('Running tests...\n');

        try {
            this.testDeleteEmptyCategory();
            console.log('✓ testDeleteEmptyCategory');
        } catch (error) {
            console.log('✗ testDeleteEmptyCategory');
            console.log('  ' + error.message);
            return;
        }

        try {
            this.testDeleteCategoryWithTasks();
            console.log('✓ testDeleteCategoryWithTasks');
        } catch (error) {
            console.log('✗ testDeleteCategoryWithTasks');
            console.log('  ' + error.message);
            return;
        }

        console.log('\nAll tests passed!');
    }
}

// ============================================
// Execute tests
// ============================================
const test = new TodoAppTest();
test.runAllTests();

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TodoApp, TodoAppTest };
}