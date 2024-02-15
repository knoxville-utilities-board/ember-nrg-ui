import { action, get, set } from '@ember/object';
import Component from '@glimmer/component';
import ensurePathExists from 'ember-nrg-ui/utils/ensure-path-exists';
import { schedule, next } from '@ember/runloop';

declare type Field = {
  model: unknown;
  valuePath: string;
};

declare type Model = {
  [key: string]: unknown;
};

declare type NrgValidationComponentArgs = {
  model: Model;
  valuePath: string;
  value: unknown;
  field?: Field;
  useDefaultValue?: boolean;
  useNestedValuePath?: boolean;
  defaultValue?: unknown;
  onChange?: (value: unknown, ...args: unknown[]) => void;

  // Deprecated
  class?: string;
};

export default class NrgValidationComponent extends Component<NrgValidationComponentArgs> {
  constructor(owner: unknown, args: NrgValidationComponentArgs) {
    super(owner, args);
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

    if (this.hasModelPath && this.args.field !== undefined) {
      next(() => {
        this.args.field!.model = this.model;
        this.args.field!.valuePath = this.valuePath;
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
  onChange(newValue: unknown, ...args: unknown[]) {
    this.value = newValue;
    this.args.onChange?.(newValue, ...args);
  }
}
