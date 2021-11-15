import NrgValidationComponent from './nrg-validation-component';
import { action } from '@ember/object';
export default class NrgTextAreaComponent extends NrgValidationComponent {
  @action
  _valueChange({ target }) {
    this._onChange(target.value);
  }

  get characterLimit() {
    return this.validation?.options?.length?.max;
  }

  get overCharacterLimit() {
    return this.value?.length > this.characterLimit;
  }
}
