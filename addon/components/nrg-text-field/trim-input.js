import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TrimInputComponent extends Component {
  constructor() {
    super(...arguments);
    this.innerValue = this.trimmedOuterValue;
  }

  @tracked
  innerValue;

  get trimmedOuterValue() {
    const value = this.args.value;
    if (value && typeof value == 'string') {
      return value.trim() || '';
    } else if (value && typeof value == 'number') {
      return value.toString() || '';
    } else {
      return '';
    }
  }

  get trimmedInnerValue() {
    return (this.innerValue && this.innerValue.trim()) || '';
  }

  get displayValue() {
    if (this.trimmedInnerValue != this.trimmedOuterValue) {
      return this.trimmedOuterValue;
    }
    return this.innerValue;
  }

  @action
  blur() {
    this.args.onBlur && this.args.onBlur();
  }

  @action
  focus() {
    this.args.onFocus && this.args.onFocus();
  }

  @action
  _valueChange({ target }) {
    this.innerValue = target.value;
    const value = target.value.trim();
    this.args.onChange && this.args.onChange(value);
  }
}
