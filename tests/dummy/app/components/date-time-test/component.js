import Component from '@ember/component';
import Validations from './validations';

export default Component.extend(Validations, {
  value: null,
  required: false,
  initializeDate: true
});
