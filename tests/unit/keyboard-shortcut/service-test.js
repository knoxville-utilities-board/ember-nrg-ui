import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Service | keyboard-shortcut', function(hooks) {
  setupTest(hooks);

  test('it detects keyboard events', function(assert) {
    const client = new EmberObject({
      keyboardShortcuts: [
        {
          key: ['KeyK', 'KeyT'],
          actionName: 'testAction',
          description: 'Description of shortcut',
        },
      ],

      send(actionName) {
        assert.equal(actionName, 'testAction');
      },
    });

    const service = this.owner.lookup('service:keyboard-shortcut');
    service.registerKeyboardShortcuts(client);
    service.keyTrigger({
      code: 'KeyK',
      altKey: false,
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
      preventDefault() {
        //
      },
    });
    service.keyTrigger({
      code: 'KeyT',
      altKey: false,
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
      preventDefault() {
        //
      },
    });
    assert.expect(1);
  });
});
