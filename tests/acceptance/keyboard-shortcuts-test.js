import { module, test } from 'qunit';
import { visit, currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { keyDown } from '../helpers/keyboard-helpers';

module('Acceptance | keyboard shortcuts', function(hooks) {
  setupApplicationTest(hooks);

  test('keyboard shortcuts page can be visited via a keyboard shortcut', async function(assert) {
    await visit('/');
    await keyDown('alt+KeyS');
    assert.equal(currentRouteName(), 'view-mixins.global-keyboard-shortcut');
  });
});
