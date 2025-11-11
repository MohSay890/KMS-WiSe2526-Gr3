/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const TodoApp = require('../app.js');

let app;

beforeEach(() => {
  // HTML laden
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  document.documentElement.innerHTML = html;

  // localStorage mocken
  Object.defineProperty(window, 'localStorage', {
    value: (() => {
      let store = {};
      return {
        getItem: key => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        clear: () => { store = {}; }
      };
    })()
  });

  // App instanziieren
  app = new TodoApp();
});

describe('TodoApp', () => {

  test('toggleTaskDone_taskIsIncomplete_taskBecomesDone', () => {
    app.todos.push({ title: 'Aufgabe', desc: '', priority: 'Mittel', category: '', done: false });
    const todo = app.todos[0];
    app.toggleTaskDone(todo);
    expect(todo.done).toBe(true);
  });

  test('deleteTask_confirmDialogReturnsTrue_taskIsDeleted', async () => {
    app.todos.push({ title: 'Aufgabe löschen', desc: '', priority: 'Mittel', category: '', done: false });
    
    jest.spyOn(app, 'showConfirmDialog').mockResolvedValue(true);
    await app.deleteTask(0);

    expect(app.todos.length).toBe(0);
  });

});
