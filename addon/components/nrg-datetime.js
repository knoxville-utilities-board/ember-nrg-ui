import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/nrg-datetime';
import moment from 'moment';
import Validation from 'ember-nrg-ui/mixins/validation';
import { next } from '@ember/runloop';

export default Component.extend(Validation, {
  layout,

  tagName: '',

  classNames: [],

  type: 'date', // 'datetime', 'date', 'time'

  showNowShortcut: true,

  isFocused: false,

  minDate: null, // minimum date/time that can be selected, dates/times before are disabled

  maxDate: null, // maximum date/time that can be selected, dates/times after are disabled

  initializeDate: true,

  init() {
    this._super(...arguments);
    if (!this.value && this.initializeDate) {
      this.set('value', new Date());
    }
  },

  icon: computed('type', function() {
    const type = this.type;
    let icon = 'calendar';
    if (type === 'time') {
      icon = 'clock';
    }
    return icon;
  }),

  onBlur() {
    this.set('isFocused', false);
  },

  onFocus(evt) {
    if (this.isFocused || this.disabled) {
      return;
    }

    const wrapper = evt.currentTarget;
    next(() => {
      const popup = wrapper && wrapper.querySelector('.ui.popup.calendar');
      if (popup) {
        popup.focus();
      }
    });

    this.set('isFocused', true);
  },

  onCalendarClose() {
    this.set('isFocused', false);
  },

  isDateDisabled(/* date */) {},

  dateFormat: 'LL',

  timeFormat: 'LT',

  displayFormat: computed('dateFormat', 'timeFormat', 'type', function() {
    if (this.type === 'datetime') {
      return `${this.dateFormat} ${this.timeFormat}`;
    } else if (this.type === 'date') {
      return this.dateFormat;
    }
    return this.timeFormat;
  }),

  displayValue: computed('value', 'displayFormat', 'initializeDate', {
    get() {
      if (!this.value) {
        return '';
      }
      return moment(this.value).format(this.displayFormat);
    },
    set(type, value) {
      const newValue = moment(value, this.displayFormat);
      if (newValue.isValid()) {
        this.set('value', newValue);
      }
      return value;
    },
  }),

  onDateSelect(value) {
    this.set('isFocused', false);
    this.set('value', value);
  },
});
