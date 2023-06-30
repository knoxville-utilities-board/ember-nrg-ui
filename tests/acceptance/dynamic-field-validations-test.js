import { module, test } from 'qunit';
import { visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';

module('Acceptance | dynamic field validations', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /dynamic-field-validations', async function (assert) {
    await visit('/dynamic-field-validations');

    await click('.ui.primary.button');
    await click('form .ui.checkbox > label');

    assert.dom('.error input[type="text"]').exists();
    assert.dom('.red.label').exists();

    await fillIn('input[type="text"]', 'test');
    assert.dom('input[type="text"]').doesNotHaveClass('error');
    assert.dom('.red.label').doesNotExist();

    await click('.ui.primary.button');
    assert.dom('.ui.success.message').containsText('It worked!');
  });
});
