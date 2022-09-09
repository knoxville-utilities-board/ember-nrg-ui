import { action } from '@ember/object';
import Component from '@glimmer/component';
import { get, set } from '@ember/object';
import { schedule } from '@ember/runloop';

export default class NrgValidationComponent extends Component {
  constructor() {
    super(...arguments);
    const defaultValue = this.defaultValue;
    const initialValue = this.hasModelPath ? this.value : this.args.value;
    if (
      initialValue === undefined &&
      defaultValue !== undefined &&
      this.useDefaultValue
    ) {
      schedule('actions', () => {
        this._onChange(this.defaultValue);
      });
    }

    if (this.hasModelPath && this.args.field) {
      this.args.field.model = this.args.model;
      this.args.field.valuePath = this.args.valuePath;
    }
  }

  get value() {
    if (this.hasModelPath) {
      return get(this.args.model, this.args.valuePath);
    }
    return undefined;
  }

  set value(newValue) {
    if (this.hasModelPath) {
      set(this.args.model, this.args.valuePath, newValue);
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

  get hasModelPath() {
    return this.args.model && this.args.valuePath;
  }

  getDefaultValue() {
    return undefined;
  }

  @action
  _onChange(newValue) {
    this.value = newValue;
    this.args.onChange?.(...arguments);
  }
}
