import NrgValidationComponent from './nrg-validation-component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

const defaultType = 'text';

@AddNrgDeprecations()
export default class NrgTextFieldComponent extends NrgValidationComponent {
  get type() {
    return this.args.type ?? defaultType;
  }

  validateInput(input) {
    if (this.args.validateInput) {
      return this.args.validateInput(input);
    }

    if (this.type === 'number') {
      if (isEmpty(input)) {
        const min = this.args.min ?? 0;
        super.onChange(min);
        return false;
      }
      if (this.args.allowDecimals) {
        return !isNaN(parseFloat(input));
      }
      return !isNaN(parseInt(input)) && input.indexOf('.') === -1;
    }
    return true;
  }

  @action
  onChange(value) {
    if (!this.validateInput(value)) {
      return;
    }
    super.onChange(value);
  }
}
