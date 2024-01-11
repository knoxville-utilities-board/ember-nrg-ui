import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import dayjs from 'dayjs';
import NrgValidationComponent from './nrg-validation-component';
import { AddNrgDeprecations } from '../utils/deprecation-handler';

const defaultDateFormat = 'LL';
const defaultTimeFormat = 'LT';

@AddNrgDeprecations()
export default class NrgDatetimeComponent extends NrgValidationComponent {
  @tracked
  isFocused = false;

  get dateFormat() {
    return this.args.dateFormat ?? defaultDateFormat;
  }

  get timeFormat() {
    return this.args.timeFormat ?? defaultTimeFormat;
  }

  get type() {
    return this.args.type ?? 'date'; // 'datetime', 'date', 'time'
  }

  get showNowShortcut() {
    return this.args.showNowShortcut !== false;
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
    return dayjs(this.value).format(this.displayFormat);
  }

  set displayValue(value) {
    const newValue = dayjs(value, this.displayFormat);
    if (!newValue.isValid()) {
      return;
    }

    if (newValue.isSame(this.value, 'minute')) {
      return;
    }
    this.onDateSelect(newValue.toDate());
  }

  getDefaultValue() {
    return new Date();
  }

  @action
  onBlur() {
    this.isFocused = false;
  }

  @action
  onFocus(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isFocused || this.args.disabled || this.args.readonly) {
      return;
    }

    this.isFocused = true;

    evt.currentTarget?.querySelector('.ui.popup.calendar')?.focus();
  }

  @action
  onDateSelect(value) {
    this.onChange(value);
  }
}
