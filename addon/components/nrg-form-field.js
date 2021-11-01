import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NrgFormFieldComponent extends Component {
  @tracked
  focusId = 'field-' + guidFor(this);

  @tracked
  errorMessage;

  @tracked
  warningMessage;

  get didValidate() {
    return this.args.form?.didValidate;
  }

  get showError() {
    return this.didValidate && this.errorMessage;
  }

  get showWarning() {
    return this.warningMessage && !this.errorMessage;
  }
}
