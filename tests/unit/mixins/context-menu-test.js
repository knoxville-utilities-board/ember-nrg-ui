import EmberObject from '@ember/object';
import ContextMenuMixin from 'ember-nrg-ui/mixins/context-menu';
import {
  module,
  test
} from 'qunit';

module('Unit | Mixin | context-menu', function() {
  test('it works', function(assert) {
    const ContextMenuObject = EmberObject.extend(ContextMenuMixin);
    const subject = ContextMenuObject.create();
    assert.ok(subject);
  });
});
