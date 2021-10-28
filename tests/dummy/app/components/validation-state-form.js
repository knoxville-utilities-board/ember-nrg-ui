import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import validationState, { validator } from 'ember-nrg-ui/validation';

const Validators = {
  textField: [
    validator('presence', true),
    validator('format', {
      regex: /^[a-z A-Z]+$/,
      message: 'Only alphabetic characters are permitted',
    }),
  ],
  textArea: [
    validator('presence', true),
    validator('length', {
      min: 3,
      max: 5,
    }),
  ],
};

export default class ValidationStateFormComponent extends Component {
  @tracked textField;
  @tracked textArea;
  @validationState(Validators) validations;
}
