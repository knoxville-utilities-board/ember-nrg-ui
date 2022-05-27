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
    if (!this.hasModelPath && this.args.value) {
      this._value = this.args.value;
    }

    if (this.hasModelPath && this.args.field) {
      this.args.field.model = this.args.model;
      this.args.field.valuePath = this.args.valuePath;
    }
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
