import EmberObject from '@ember/object';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

export default function(context) {
  const Validations = buildValidations({
    foo: validator('presence', true)
  });
  const TestObject = EmberObject.extend(Validations);
  const testObject = TestObject.create(context.owner.ownerInjection(), {
    foo: ''
  });
  context.set('testObject', testObject);
  testObject.validateSync();
}
