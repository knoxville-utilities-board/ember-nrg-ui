import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-home-cards', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <NrgHomeCards @actionCard={{true}} as |view|>
        <view.home-card @label="Item 1" @icon="settings" />
        <view.home-card @label="Item 2" @icon="settings" />
        <view.home-card @label="Item 3" @icon="settings" />
      </NrgHomeCards>
    `);

    assert.ok(this.element.textContent.trim().includes('Item 1'));
    assert.ok(this.element.textContent.trim().includes('Item 2'));
    assert.ok(this.element.textContent.trim().includes('Item 3'));
  });
});
