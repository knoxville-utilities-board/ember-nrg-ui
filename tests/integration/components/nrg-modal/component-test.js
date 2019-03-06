import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | nrg-modal', function(hooks) {
  hooks.afterEach(function() {
    // Clean up modal dimmers
    $('.dimmed').removeClass('dimmed');
    $('.dimmer').removeClass('dimmer');
  });

  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(
      hbs`{{nrg-modal primaryButton='Button Text' isOpen=true detachable=false}}`
    );

    assert.equal(
      this.$()
        .text()
        .trim(),
      'Button Text'
    );
  });

  test('it renders block text', async function(assert) {
    await render(hbs`
      {{#nrg-modal isOpen=true detachable=false}}
        block text
      {{/nrg-modal}}
    `);
    assert.equal(
      this.$()
        .text()
        .trim(),
      'block text'
    );
  });
});
