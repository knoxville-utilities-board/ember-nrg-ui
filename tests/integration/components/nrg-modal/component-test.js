import { find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(
      hbs`{{nrg-modal primaryButton='Button Text' isOpen=true}}`
    );
    assert.equal(find('*').textContent.trim(), 'Button Text');
  });

  test('it renders block text', async function(assert) {
    await render(hbs`
      {{#nrg-modal isOpen=true}}
        block text
      {{/nrg-modal}}
    `);
    assert.equal(find('*').textContent.trim(), 'block text');
  });
});
