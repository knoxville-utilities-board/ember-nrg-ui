import EmberObject from '@ember/object';
import { find, render, triggerKeyEvent } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-keyboard-shortcut-modal', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    const service = this.owner.lookup('service:application');
    service.set('isTesting', false);
  });

  test('modal responds to keyboard shortcut', async function(assert) {
    await render(hbs`
      {{nrg-modal-container}}
      {{nrg-keyboard-shortcut-modal isOpen=false}}
    `);
    await triggerKeyEvent(window, 'keydown', 191, {
      shiftKey: true,
    });
    const text = find('.ui.modal').textContent;
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

    await render(hbs`{{nrg-keyboard-shortcut-modal isOpen=true}}`);

    const text = find('*').textContent;
    assert.ok(/Shft/.test(text));
    assert.ok(/Alt/.test(text));
    assert.ok(/Shft/.test(text));
    assert.ok(/X/.test(text));
    assert.ok(/V/.test(text));
    assert.ok(/testDescription/.test(text));
  });
});
