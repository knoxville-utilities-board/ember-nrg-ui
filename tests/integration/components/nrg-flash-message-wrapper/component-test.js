import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-flash-message-wrapper', function(hooks) {
  setupRenderingTest(hooks);

  test('flash message has correct height', async function(assert) {
    this.flash = {
      message: 'Test Message',
      destroyMessage() {
        // empty function
      },
    };

    // Template block usage:
    await render(hbs`
      {{#nrg-flash-message-wrapper as |view|}}
        {{view.flashMessage flash=flash}}
      {{/nrg-flash-message-wrapper}}
    `);

    assert.ok(find('*').clientHeight > 40);
  });
});
