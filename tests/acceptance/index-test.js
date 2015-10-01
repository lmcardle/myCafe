import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'my-cafe/tests/helpers/start-app';

var application;

module('Acceptance | index', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentRouteName(), 'index');
  });
});

test('index page has heading label', function(assert) {
  let expectedHeader = 'I am the home page';
  visit('/');

  andThen(function() {

    let heading = find('[data-test-selector="index-headding-label"]');
    assert.equal(heading.length, 1, 'there is only one heading');
    assert.equal(heading.text(), expectedHeader, 'the header is as expected');
  });
});
