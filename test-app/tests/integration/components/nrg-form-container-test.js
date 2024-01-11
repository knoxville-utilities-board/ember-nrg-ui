import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-form-container', function (hooks) {
  setupRenderingTest(hooks);

  test('action fires on submit', async function (assert) {
    assert.expect(1);
    this.set('onSubmit', function () {
      assert.ok(true);
    });

    await render(hbs`
      <NrgFormContainer @onSubmit={{this.onSubmit}} as |form|>
        <form.submit-button />
      </NrgFormContainer>
    `);

    await click('button');
  });
});
