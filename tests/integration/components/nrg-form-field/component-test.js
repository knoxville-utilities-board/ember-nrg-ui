import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-form-field', function(hooks) {
  setupRenderingTest(hooks);

  test('input id works', async function(assert) {
    await render(hbs`
      {{#nrg-form-field label='label'}}
        {{input id='testId' type='text'}}
      {{/nrg-form-field}}
    `);

    const forProp = find('.field label').htmlFor;
    assert.ok(forProp);
    assert.equal(forProp, 'testId');
  });

  test('proper errors display', async function(assert) {
    await render(hbs`
      {{#nrg-form-container didValidate=true as |form|}}
        {{form.field errorMessage='Test Message'}}
      {{/nrg-form-container}}
    `);

    assert.equal(
      find('.field.error .label').textContent.trim(),
      'Test Message'
    );
  });

  test('error class shows', async function(assert) {
    await render(hbs`
      {{#nrg-form-container didValidate=true as |form|}}
        {{form.field errorMessage='Test Message'}}
      {{/nrg-form-container}}
    `);

    assert.ok(find('.field').classList.contains('error'));
  });
});
