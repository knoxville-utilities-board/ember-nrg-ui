import {
  validator,
  buildValidations
} from 'ember-cp-validations';

export default buildValidations({
  turkey: [
    validator('presence', true),
  ],
  meal: [
    validator('presence', true),
  ],
  super: [
    validator('presence', {
      presence: true,
      isWarning: true,
    }),
  ],
  deal: [
    validator('presence', true),
  ],
  textArea1: [
    validator('presence', true),
  ],
  checkbox1: [
    validator('inclusion', { in: [true],
    }),
  ],
  textArea: [
    validator('length', {
      min: 0,
      max: 5,
    }),
  ],
});
