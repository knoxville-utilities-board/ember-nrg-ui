import { action } from '@ember/object';
import NrgValidationComponent from './nrg-validation-component';

export default class NrgCheckboxComponent extends NrgValidationComponent {
  get checked() {
    return !!this.value;
  }

  @action
  valueChange({ target }) {
    this.onChange(target.checked);
  }
}
