import {
  module,
  test
} from 'qunit';
import {
  setupRenderingTest
} from 'ember-qunit';
import {
  render
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-form-container', function(hooks) {
  setupRenderingTest(hooks);

  test('action fires on submit', async function(assert) {
    let actionFired = false;
    this.set('testAction', function() {
      actionFired = true;
    });

    await render(hbs `
      {{#nrg-form-container action=(action testAction) as |form|}}
        {{form.submit-button}}
      {{/nrg-form-container}}
    `);

    this.$('button').click();

    assert.ok(actionFired);
  });
});
