import {
  run
} from '@ember/runloop';
import Evented from '@ember/object/evented';
import EmberObject from '@ember/object';
import FocusFirstInputMixin from 'ember-nrg-ui/mixins/focus-first-input';
import {
  module,
  test
} from 'qunit';

module('Unit | Mixin | focus first input');

test('call focus on init', function(assert) {
  const FocusFirstInputObject = EmberObject.extend(Evented, FocusFirstInputMixin);
  run(() => {
    const subject = FocusFirstInputObject.create({
      focusFirstInput() {
        assert.ok(true);
      },
    });
    subject.trigger('didRender');
  });
});
