import EmberObject from '@ember/object';
import KeyboardShortcutMixin from 'ember-nrg-ui/mixins/global-keyboard-shortcut';
import { module, test } from 'qunit';

module('Unit | Mixin | keyboard-shortcut', function() {
  test('it works', function(assert) {
    const KeyboardShortcutObject = EmberObject.extend(KeyboardShortcutMixin);
    const subject = KeyboardShortcutObject.create();
    assert.ok(subject);
  });
});
