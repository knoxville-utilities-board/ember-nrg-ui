import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import NrgValidationComponent from './nrg-validation-component';
import { AddNrgDeprecations } from '../utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgCheckboxComponent extends NrgValidationComponent {
  @tracked
  focusId = 'field-' + guidFor(this);

  get checked() {
    return !!this.value;
  }

  @action
  valueChange({ target }) {
    this.onChange(target.checked);
  }
}
