import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-lightbox-container-video/keyboard-shortcuts', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{nrg-lightbox-container-video/keyboard-shortcuts}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#nrg-lightbox-container-video/keyboard-shortcuts}}
        template block text
      {{/nrg-lightbox-container-video/keyboard-shortcuts}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
