import { click, fillIn, findAll, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | form validation', function (hooks) {
  setupApplicationTest(hooks);

  test('All form elements fail validation with no input', async function (assert) {
    await visit('/validation-tests');
    await click('button[type=submit]');
    const errorNodes = findAll('.error');

    assert.equal(errorNodes.length, 8);
  });

  test('Custom validators work', async function (assert) {
    await visit('/validation-tests');
    await click('button[type=submit]');

    assert
      .dom('div.field:last-of-type > div.red.label')
      .hasText('This is an invalid value', 'Custom error message works');

    await fillIn('div.field.error:last-of-type input', 'defaultError');

    assert
      .dom('div.field:last-of-type > div.red.label')
      .hasText('This field is not valid', 'false displays default error');

    await fillIn('div.field.error:last-of-type input', 'correct');
    assert
      .dom('div.field:last-of-type > div.red.label')
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

    assert.equal(controller.nested.field, 'text', 'nested value paths work');
  });
});
