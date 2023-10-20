import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { VALIDATIONS_SYMBOL } from 'ember-nrg-ui/decorators/validation';

export default class NrgFormFieldComponent extends Component {
  @tracked
  focusId = 'field-' + guidFor(this);

  @tracked
  model;

  @tracked
  valuePath;

  get validation() {
    if (!this.model) {
      return null;
    }
    const proto = Object.getPrototypeOf(this.model);
    const validationPath = proto[VALIDATIONS_SYMBOL];
    return this.model[validationPath]?.attrs[this.valuePath];
  }

  get didValidate() {
    return this.args.form?.didValidate;
  }

  get showError() {
    return this.didValidate && this.errorMessage;
  }

  get showWarning() {
    return this.warningMessage && !this.errorMessage;
  }

  get errorMessage() {
    return !this.validation?.isValid ? this.validation?.message : '';
  }

  get warningMessage() {
    return this.validation?.warningMessage;
  }
}
