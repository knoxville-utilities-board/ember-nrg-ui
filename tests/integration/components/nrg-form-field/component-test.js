import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-form-field', function(hooks) {
  setupRenderingTest(hooks);

  test('input id works', async function(assert) {
    await render(hbs`
      {{#nrg-form-field label='label'}}
        {{input id='testId' type='text'}}
      {{/nrg-form-field}}
    `);

    const forProp = this.$('.field label').prop('for');
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
      this.$('.field.error .label')
        .text()
        .trim(),
      'Test Message'
    );
  });

  test('error class shows', async function(assert) {
    await render(hbs`
      {{#nrg-form-container didValidate=true as |form|}}
        {{form.field errorMessage='Test Message'}}
      {{/nrg-form-container}}
    `);

    assert.ok(this.$('.field').hasClass('error'));
  });
});
