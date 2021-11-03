import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
import NrgValidationComponent from './nrg-validation-component';

const defaultDateFormat = 'LL';
const defaultTimeFormat = 'LT';

export default class NrgTextFieldComponent extends NrgValidationComponent {
  @tracked
  isFocused = false;

  constructor() {
    super(...arguments);
    if (!this.value && this.initializeDate) {
      this.value = new Date();
    }
  }

  get dateFormat() {
    return this.args.dateFormat || defaultDateFormat;
  }

  get timeFormat() {
    return this.args.timeFormat || defaultTimeFormat;
  }

  get type() {
    return this.args.type || 'date'; // 'datetime', 'date', 'time'
  }

  get showNowShortcut() {
    return this.args.showNowShortcut !== false;
  }

  get initializeDate() {
    return this.args.initializeDate !== false;
  }

  get icon() {
    let icon = 'calendar';
    if (this.type === 'time') {
      icon = 'clock';
    }
    return icon;
  }

  get displayFormat() {
    if (this.type === 'datetime') {
      return `${this.dateFormat} ${this.timeFormat}`;
    } else if (this.type === 'date') {
      return this.dateFormat;
    }
    return this.timeFormat;
  }

  get displayValue() {
    if (!this.value) {
      return '';
    }
    return moment(this.value).format(this.displayFormat);
  }

  set displayValue(value) {
    const newValue = moment(value, this.displayFormat);
    if (!newValue.isValid()) {
      return;
    }

    if (newValue.isSame(this.value, 'minute')) {
      return;
    }
    this.value = newValue.toDate();
  }

  @action
  onBlur() {
    this.isFocused = false;
  }

  @action
  onFocus(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isFocused || this.args.disabled) {
      return;
    }

    this.isFocused = true;

    const wrapper = evt.currentTarget;
    const popup = wrapper && wrapper.querySelector('.ui.popup.calendar');
    if (popup) {
      popup.focus();
    }
  }

  @action
  onDateSelect(value) {
    this.value = value;
  }
}
