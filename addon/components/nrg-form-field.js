import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NrgFormFieldComponent extends Component {
  @tracked
  model;

  @tracked
  valuePath;

  get validation() {
    return this.model?.validations?.attrs[this.valuePath];
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
