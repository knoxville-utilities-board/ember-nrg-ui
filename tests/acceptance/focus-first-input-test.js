import {
  module,
  test
} from 'qunit';
import {
  visit,
  find
} from '@ember/test-helpers';
import {
  setupApplicationTest
} from 'ember-qunit';

module('Acceptance | focus first input', function(hooks) {
  setupApplicationTest(hooks);

  test('First form input is focused', async function(assert) {
    await visit('/view-mixins/focus-first-input');
    assert.equal(find('input'), document.activeElement);
  });
});
