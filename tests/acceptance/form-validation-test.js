import { click, findAll, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | form validation', function (hooks) {
  setupApplicationTest(hooks);

  test('All form elements fail validation with no input', async function (assert) {
    await visit('/validation-tests');
    await click('button[type=submit]');
    const errorNodes = findAll('.error');

    assert.equal(errorNodes.length, 6);
  });
});
