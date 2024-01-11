import { action } from '@ember/object';
import NrgValidationComponent from './nrg-validation-component';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgRadioComponent extends NrgValidationComponent {
  get checked() {
    return this.args.value && this.args.value == this.value;
  }

  @action
  selectOption() {
    this.onChange(this.args.value);
  }
}
