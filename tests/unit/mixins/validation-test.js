import EmberObject from '@ember/object';
import ValidationMixin from 'ember-nrg-ui/mixins/validation';
import { module, test } from 'qunit';

module('Unit | Mixin | validation');

test('show error when appropriate', function(assert) {
  const ValidationObject = EmberObject.extend(ValidationMixin);
  const subject = ValidationObject.create({
    isInvalid: true,
    field: {
      form: {
        didValidate: true,
      },
    },
  });
  assert.ok(subject.get('showError'));
});

test('show error when appropriate', function(assert) {
  const ValidationObject = EmberObject.extend(ValidationMixin);
  const subject = ValidationObject.create({
    hasWarnings: true,
    isInvalid: false,
    field: {
      form: {
        didValidate: true,
      },
    },
  });
  assert.ok(subject.get('showWarning'));
});

test('value is bound properly', function(assert) {
  const ValidationObject = EmberObject.extend(ValidationMixin);
  const subject = ValidationObject.create({
    model: {
      foo: 'bob',
    },
    valuePath: 'foo',
  });
  assert.equal(subject.get('value'), 'bob');
});
