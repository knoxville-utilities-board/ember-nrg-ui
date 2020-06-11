import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-form-container', function(hooks) {
  setupRenderingTest(hooks);

  test('action fires on submit', async function(assert) {
    this.set('testAction', function() {
      assert.ok(true);
    });

    await render(hbs`
      <NrgFormContainer @action={{action testAction}} as |form|>
        <form.submit-button />
      </NrgFormContainer>
    `);

    await click('button');
  });
});
