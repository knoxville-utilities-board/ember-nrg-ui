import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-form-action', function(hooks) {
  setupRenderingTest(hooks);

  test('fires action on click', async function(assert) {
    let actionFired = false;
    this.set('testAction', function() {
      actionFired = true;
    });
    await render(hbs`{{nrg-form-action action=(action testAction)}}`);

    this.$('a').click();

    assert.ok(actionFired);
  });
});
