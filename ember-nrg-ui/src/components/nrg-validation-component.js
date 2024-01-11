import { action, get, set } from '@ember/object';
import Component from '@glimmer/component';
import ensurePathExists from '../utils/ensure-path-exists';
import { schedule, next } from '@ember/runloop';

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
        this.onChange(defaultValue);
      });
    }

    if (this.hasModelPath && this.args.field) {
      next(() => {
        this.args.field.model = this.model;
        this.args.field.valuePath = this.valuePath;
      });
    }
  }

  get model() {
    return this.args.model;
  }

  get valuePath() {
    return this.args.valuePath;
  }

  get value() {
    if (!this.hasModelPath) {
      return undefined;
    }
    if (this.useNestedValuePath) {
      return get(this.model, this.valuePath);
    }
    return this.model?.[this.valuePath];
  }

  set value(newValue) {
    if (!this.hasModelPath) {
      return;
    }
    if (this.useNestedValuePath) {
      ensurePathExists(this.model, this.valuePath);
      set(this.model, this.valuePath, newValue);
      return;
    }
    this.model[this.valuePath] = newValue;
  }

  get useDefaultValue() {
    return this.args.useDefaultValue ?? false;
  }

  get useNestedValuePath() {
    return this.args.useNestedValuePath ?? true;
  }

  get defaultValue() {
    if (this.args.defaultValue !== undefined) {
      return this.args.defaultValue;
    }
    return this.getDefaultValue();
  }

  get hasModelPath() {
    return Boolean(this.model && this.valuePath);
  }

  getDefaultValue() {
    return undefined;
  }

  @action
  onChange(newValue) {
    this.value = newValue;
    this.args.onChange?.(...arguments);
  }
}
