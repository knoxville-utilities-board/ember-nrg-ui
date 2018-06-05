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

module('Integration | Component | nrg-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs `{{nrg-button text='Inline text'}}`);

    assert.equal(this.element.textContent.trim(), 'Inline text');

    await render(hbs `
      {{#nrg-button}}
        template block text
      {{/nrg-button}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('fires action on click', async function(assert) {
    let actionFired = false;
    this.set('testAction', function() {
      actionFired = true;
    });

    await render(hbs `{{nrg-button action=(action testAction)}}`);

    this.$('button').click();

    assert.ok(actionFired);
  });
});
