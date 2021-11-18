import NrgValidationComponent from './nrg-validation-component';

const defaultType = 'text';
export default class NrgTextFieldComponent extends NrgValidationComponent {
  get type() {
    return this.args.type ?? defaultType;
  }
}
