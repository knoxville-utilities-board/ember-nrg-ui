import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TrimInputComponent extends Component {
  constructor() {
    super(...arguments);
    this.valueChange();
  }

  @tracked
  _value;

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
    this._value = target.value;
    const value = target.value.trim();
    this.args.onChange && this.args.onChange(value);
  }

  @action
  valueChange() {
    const value = this.args.value;
    const oldValue = this._value && this._value.trim();
    let newValue = '';
    if (value && typeof value == 'string') {
      newValue = value.trim() || '';
    } else if (value && typeof value == 'number') {
      newValue = value.toString() || '';
    }

    if (oldValue !== newValue) {
      this._value = newValue;
    }
  }
}
