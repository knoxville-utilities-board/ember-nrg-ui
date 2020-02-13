import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-form-action', function(hooks) {
  setupRenderingTest(hooks);

  test('fires action on click', async function(assert) {
    this.set('testAction', function() {
      assert.ok(true);
    });
    await render(hbs`{{nrg-form-action action=(action testAction)}}`);

    await click('a');
  });
});
