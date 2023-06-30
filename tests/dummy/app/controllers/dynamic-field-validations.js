import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import validationState, { validator } from 'ember-nrg-ui/decorators/validation';

const Validations = {
  showText: [validator('presence', true)],
  textField: [validator('presence', true)],
};

export default class DynamicFieldValidationsController extends Controller {
  @validationState(Validations)
  validations;

  @tracked
  showText = false;

  @tracked
  textField;

  @tracked
  showMessage = false;

  @action
  submit() {
    if (!this.validations.isValid) {
      return;
    }
    this.showMessage = true;
  }
}
