import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { get, set } from '@ember/object';

export default class NrgValidationComponent extends Component {
  @tracked
  _value;

  get value() {
    if (this.hasModelPath) {
      return get(this.args.model, this.args.valuePath);
    } else {
      return this._value;
    }
  }

  set value(newValue) {
    if (this.hasModelPath) {
      set(this.args.model, this.args.valuePath, newValue);
    } else {
      this._value = newValue;
    }
  }

  constructor() {
    super(...arguments);
    const defaultValue = this.defaultValue;
    const initialValue = this.hasModelPath ? this.value : this.args.value;
    if (
      initialValue === undefined &&
      defaultValue !== undefined &&
      this.useDefaultValue
    ) {
      this._onChange(this.defaultValue);
    } else if (!this.hasModelPath) {
      this._value = initialValue;
    }

    if (this.hasModelPath && this.args.field) {
      this.args.field.model = this.args.model;
      this.args.field.valuePath = this.args.valuePath;
    }
  }

  get useDefaultValue() {
    return this.args.useDefaultValue ?? false;
  }

  get defaultValue() {
    if (this.args.defaultValue !== undefined) {
      return this.args.defaultValue;
    }
    return this.getDefaultValue();
  }

  getDefaultValue() {
    return undefined;
  }

  get hasModelPath() {
    return this.args.model && this.args.valuePath;
  }

  @action
  _onChange(newValue) {
    this.value = newValue;
    this.args.onChange?.(...arguments);
  }
}
