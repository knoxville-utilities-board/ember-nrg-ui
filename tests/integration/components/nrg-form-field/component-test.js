import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-form-field', function (hooks) {
  setupRenderingTest(hooks);

  test('proper errors display', async function (assert) {
    await render(hbs`
      <NrgFormContainer as |form|>
        <form.field @errorMessage="Test Message" />
        <form.submit-button />
      </NrgFormContainer>
    `);
    await click('button');

    assert.dom('.field.error .label').hasText('Test Message');
  });

  test('error class shows', async function (assert) {
    await render(hbs`
      <NrgFormContainer as |form|>
        <form.field @errorMessage="Test Message" />
        <form.submit-button />
      </NrgFormContainer>
    `);
    await click('button');

    assert.dom('.field').hasClass('error');
  });
});
