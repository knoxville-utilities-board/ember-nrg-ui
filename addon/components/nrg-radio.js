import { action } from '@ember/object';
import NrgValidationComponent from './nrg-validation-component';

export default class NrgRadioComponent extends NrgValidationComponent {
  get checked() {
    return this.args.value && this.args.value == this.value;
  }

  @action
  selectOption() {
    this._onChange(this.args.value);
  }
}
