import NrgValidationComponent from './nrg-validation-component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { AddNrgDeprecations } from '../utils/deprecation-handler';

const defaultType = 'text';

@AddNrgDeprecations()
export default class NrgTextFieldComponent extends NrgValidationComponent {
  get type() {
    return this.args.type ?? defaultType;
  }

  get step() {
    if (this.type != 'number') {
      return null;
    }
    const { allowDecimals, step } = this.args;
    if (allowDecimals) {
      return step ?? 'any';
    }

    return step ?? 1;
  }

  validateInput(input) {
    if (this.args.validateInput) {
      return this.args.validateInput(input);
    }

    let isValid = true;
    let value = input;
    if (this.type === 'number') {
      const min = this.args.min ?? 0;
      if (isEmpty(input)) {
        return min;
      }
      value = parseFloat(input);
      if (!this.args.allowDecimals) {
        value = Math.trunc(input);
      }
      isValid = !isNaN(input);

      if (this.args.allowNegatives !== true && value < 0) {
        isValid = true;
        value = min;
      }
    }
    return isValid && value;
  }

  @action
  onChange(value) {
    value = this.validateInput(value);
    if (value === false) {
      return;
    }
    super.onChange(value);
  }
}
