import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nrg-flyout', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<NrgFlyout />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <NrgFlyout>
        template block text
      </NrgFlyout>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
