import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'my-cafe/tests/helpers/start-app';

var application;

module('Acceptance | todos', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /todos', function(assert) {
  visit('/todos');

  andThen(function() {
    assert.equal(currentURL(), '/todos');
  });
});

test('visiting todos by clicking link', function(assert) {
  visit('/');
  click('#index-todo-link');

  andThen(function() {
    assert.equal(currentURL(), '/todos');
  });
});

test('all labels are on page', function(assert) {
  visit('/todos');

  andThen(function() {
    let headerLabel = 'I am the todos page';
    let headerSelector = find('[data-test-selector="todos-headding-label"]');
    assert.equal(headerSelector.text(), headerLabel, 'header label matches');

    let todosLabel = 'My Todos';
    let todosHeaderSelector = find('[data-test-selector="todos-list-label"]');
    assert.equal(todosHeaderSelector.text(), todosLabel, 'todos label matches');
  });
});

test('initial todos are displayed', function(assert) {
  let initialTodoCount = 10;
  server.createList('todo', initialTodoCount);
  visit('/todos');

  andThen(function() {
    let foundTodos = find('[data-test-selector="todo-model-item"]');
    assert.equal(foundTodos.length, initialTodoCount, `todos count matches ${initialTodoCount}`);
  });
});
