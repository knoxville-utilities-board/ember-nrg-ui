import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-form-field', function (hooks) {
  setupRenderingTest(hooks);

  test('input id works', async function (assert) {
    await render(hbs`
      <NrgFormField @label="label">
        <Input @id="testId" type='text' />
      </NrgFormField>
    `);

    const forProp = find('.field label').htmlFor;
    assert.ok(forProp);
    assert.equal(forProp, 'testId');
  });

  test('proper errors display', async function (assert) {
    await render(hbs`
      <NrgFormContainer @didValidate={{true}} as |form|>
        <form.field @errorMessage="Test Message" />
        <form.submit-button />
      </NrgFormContainer>
    `);
    await click('button');

    assert.dom('.field.error .label').hasText('Test Message');
  });

  test('error class shows', async function (assert) {
    await render(hbs`
      <NrgFormContainer @didValidate={{true}} as |form|>
        <form.field @errorMessage="Test Message" />
        <form.submit-button />
      </NrgFormContainer>
    `);
    await click('button');

    assert.dom('.field').hasClass('error');
  });
});
