import { validator, buildValidations } from 'ember-cp-validations';
import { not } from '@ember/object/computed';

export default buildValidations({
  date: validator('presence', {
    presence: true,
    disabled: not('model.required')
  }),
});
