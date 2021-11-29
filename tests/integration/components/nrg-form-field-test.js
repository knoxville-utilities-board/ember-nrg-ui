import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-form-field', function (hooks) {
  setupRenderingTest(hooks);

  test('label displays', async function (assert) {
    await render(hbs`
      <NrgFormContainer as |form|>
        <form.field @label="Test Message" />
      </NrgFormContainer>
    `);

    assert.dom('label').hasText('Test Message');
  });
});
