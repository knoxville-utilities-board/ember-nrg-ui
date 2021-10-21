import EmberObject from '@ember/object';
import ValidationContainerMixin from 'ember-nrg-ui/mixins/validation-container';
import { module, test } from 'qunit';

module('Unit | Mixin | validation-container', function() {
  test('can set didValidate', function(assert) {
    const ValidationContainerObject = EmberObject.extend(ValidationContainerMixin);
    const subject = ValidationContainerObject.create();
    subject.showValidation();
    assert.ok(subject.get('didValidate'));
  });
});
