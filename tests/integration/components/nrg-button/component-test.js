import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<NrgButton @text="Inline text" />`);

    assert.dom(this.element).hasText('Inline text');

    await render(hbs`
      <NrgButton>
        template block text
      </NrgButton>
    `);

    assert.dom(this.element).hasText('template block text');
  });

  test('fires action on click', async function(assert) {
    this.set('testAction', function() {
      assert.ok(true);
    });

    await render(hbs`<NrgButton @onClick={{action testAction}} />`);

    await click('button');
  });
});
