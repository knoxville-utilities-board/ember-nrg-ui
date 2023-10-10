import { click, fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | form validation', function (hooks) {
  setupApplicationTest(hooks);

  test('All form elements fail validation with no input', async function (assert) {
    await visit('/validation-tests');
    await click('button[type=submit]');

    assert.dom('.error').exists({ count: 10 });
    assert.dom('.orange').exists({ count: 1 });
  });

  test('Custom validators work', async function (assert) {
    await visit('/validation-tests');
    await click('button[type=submit]');

    assert
      .dom('[data-test-custom-validator] > div.red.label')
      .hasText('This is an invalid value', 'Custom error message works');

    await fillIn('[data-test-custom-validator] input', 'defaultError');

    assert
      .dom('[data-test-custom-validator] > div.red.label')
      .hasText('This field is not valid', 'false displays default error');

    await fillIn('[data-test-custom-validator] input', 'correct');
    assert
      .dom('[data-test-custom-validator] > div.red.label')
      .doesNotExist('true displays no error');
  });

  test('Nested validators work', async function (assert) {
    await visit('/validation-tests');
    await click('button[type=submit]');

    const controller = this.owner.lookup('controller:validation-tests');

    assert
      .dom('[data-test-nested-validator] > div.red.label')
      .hasText("This field can't be blank");

    await fillIn('[data-test-nested-validator] input', 'text');
    assert.dom('[data-test-nested-validator] > div.red.label').doesNotExist();

    assert.strictEqual(
      controller.nested.field,
      'text',
      'nested value paths work'
    );
  });

  test('Nested validators work with arrays', async function (assert) {
    await visit('/validation-tests');
    await click('button[type=submit]');

    const controller = this.owner.lookup('controller:validation-tests');

    assert
      .dom('[data-test-nested-array-validator] > div.red.label')
      .hasText("This field can't be blank");

    await fillIn('[data-test-nested-array-validator] input', 'text');
    assert
      .dom('[data-test-nested-array-validator] > div.red.label')
      .doesNotExist();

    assert.strictEqual(
      controller.nestedArray[0].field,
      'text',
      'nested array value paths work'
    );
  });
});
