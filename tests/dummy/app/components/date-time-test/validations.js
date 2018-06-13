import {
  validator,
  buildValidations
} from 'ember-cp-validations';

export default buildValidations({
  date: validator('presence', true),
});
