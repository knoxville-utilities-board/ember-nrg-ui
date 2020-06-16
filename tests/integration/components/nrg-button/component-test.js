import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<NrgButton @text="Inline text" />`);

    assert.equal(this.element.textContent.trim(), 'Inline text');

    await render(hbs`
      <NrgButton>
        template block text
      </NrgButton>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('fires action on click', async function(assert) {
    this.set('testAction', function() {
      assert.ok(true);
    });

    await render(hbs`<NrgButton @action={{action testAction}} />`);

    await click('button');
  });
});
