import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import $ from 'jquery';

module('Integration | Component | nrg-keyboard-shortcut-modal', function(
  hooks
) {
  setupRenderingTest(hooks);

  test('it renders the default shortcut', async function(assert) {
    await render(hbs`{{nrg-keyboard-shortcut-modal}}`);

    const text = $('.shortcut-modal').text();
    assert.ok(/Shft/.test(text));
    assert.ok(/\?/.test(text));
    assert.ok(/Show Keyboard Help/.test(text));
  });

  test('it renders registered shortcuts', async function(assert) {
    const keyboardService = this.owner.lookup('service:keyboard-shortcut');
    keyboardService.registerKeyboardShortcuts(
      EmberObject.create({
        keyboardShortcuts: [
          {
            key: ['KeyX', 'KeyV'],
            alt: true,
            shft: true,
            ctrl: true,
            description: 'testDescription',
          },
        ],
      })
    );

    await render(hbs`{{nrg-keyboard-shortcut-modal}}`);

    const text = $('.shortcut-modal').text();
    assert.ok(/Shft/.test(text));
    assert.ok(/Alt/.test(text));
    assert.ok(/Shft/.test(text));
    assert.ok(/X/.test(text));
    assert.ok(/V/.test(text));
    assert.ok(/testDescription/.test(text));
  });
});
