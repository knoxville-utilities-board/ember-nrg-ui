import { action, get, set } from '@ember/object';
import Component from '@glimmer/component';
import ensurePathExists from 'ember-nrg-ui/utils/ensure-path-exists';
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
        this.onChange(this.defaultValue);
      });
    }

    if (this.hasModelPath && this.args.field) {
      next(() => {
        this.args.field.model = this.args.model;
        this.args.field.valuePath = this.args.valuePath;
      });
    }
  }

  get value() {
    if (!this.hasModelPath) {
      return undefined;
    }
    if (this.useNestedValuePath) {
      return get(this.args.model, this.args.valuePath);
    }
    return this.args.model?.[this.args.valuePath];
  }

  set value(newValue) {
    if (!this.hasModelPath) {
      return;
    }
    if (this.useNestedValuePath) {
      ensurePathExists(this.args.model, this.args.valuePath);
      set(this.args.model, this.args.valuePath, newValue);
      return;
    }
    this.args.model[this.args.valuePath] = newValue;
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
    return this.args.model && this.args.valuePath;
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
