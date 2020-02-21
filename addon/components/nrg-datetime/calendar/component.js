import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { EKFirstResponderOnFocusMixin, EKMixin, keyDown } from 'ember-keyboard';
import moment from 'moment';
import layout from './template';

const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MINUTE_INTERVAL = 5;

export default Component.extend(EKMixin, EKFirstResponderOnFocusMixin, {
  layout,

  isSelectingDays: false,
  isSelectingMonths: false,
  isSelectingYears: false,
  isSelectingHours: false,
  isSelectingMinutes: false,

  selectedDayIndex: null,
  selectedMonthIndex: null,
  selectedYearIndex: null,
  selectedMinuteIndex: null,
  selectedHourIndex: null,

  value: null,

  init() {
    this._super(...arguments);
    if (this.type === 'datetime' || this.type === 'date') {
      this.set('isSelectingDays', true);
    } else if (this.type === 'time') {
      this.set('isSelectingHours', true);
    }
    if (!this.value) {
      this.set('value', new Date());
    }
    this._updateSelectedIndexes();
  },

  headerDisplay: computed(
    'selectedDayIndex',
    'selectedMonthIndex',
    'selectedYearIndex',
    'isSelectingDays',
    'isSelectingMonths',
    'isSelectingYears',
    'isSelectingHours',
    'isSelectingMinutes',
    function() {
      const calendar = moment({
        day: this.selectedDayIndex,
        month: this.selectedMonthIndex,
        year: this.selectedYearIndex,
      });
      if (this.isSelectingYears) {
        const firstYear = this.years[0][0].year;
        const lastYear = this.years[4][1].year;
        return `${firstYear} - ${lastYear}`;
      }
      let format = 'MMMM YYYY';
      if (this.isSelectingMonths) {
        format = 'YYYY';
      } else if (this.isSelectingHours || this.isSelectingMinutes) {
        format = 'LL';
      }
      return calendar.format(format);
    }
  ),

  valueObserver: observer('value', function() {
    this._updateSelectedIndexes();
  }),

  _isBeyondDateRange(date) {
    date = moment(date);
    let invalid = false;
    if (this.minDate) {
      invalid = date.isBefore(this.minDate);
    }
    if (this.maxDate) {
      invalid = invalid || date.isAfter(this.maxDate);
    }
    return invalid;
  },

  _isDateDisabled(date) {
    const userDisabled = this.isDisabled && this.isDisabled(date);
    const isBeyondDateRange = this._isBeyondDateRange(date);
    return userDisabled || isBeyondDateRange;
  },

  minutes: computed('selectedMinuteIndex', function() {
    const calendar = moment({
      hour: this.selectedHourIndex,
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    });
    const rows = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const minute = calendar.minute();
        const disabled = this._isDateDisabled(calendar);
        const selected = !disabled && this.selectedMinuteIndex === minute;
        row.push({
          display: calendar.format('LT'),
          minute,
          disabled,
          selected,
        });
        calendar.add(MINUTE_INTERVAL, 'minute');
      }
      rows.push(row);
    }
    return rows;
  }),

  hours: computed('selectedHourIndex', function() {
    const calendar = moment({
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    });
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const hour = calendar.hour();
        const disabled = this._isDateDisabled(calendar);
        const selected = !disabled && this.selectedHourIndex === hour;
        row.push({
          display: calendar.format('LT'),
          hour,
          disabled,
          selected,
        });
        calendar.add(1, 'hour');
      }
      rows.push(row);
    }
    return rows;
  }),

  days: computed(
    'selectedDayIndex',
    'selectedMonthIndex',
    'selectedYearIndex',
    function() {
      const today = moment();
      const weeks = [];
      const calendar = moment({
        month: this.selectedMonthIndex,
        year: this.selectedYearIndex,
      }).startOf('week');
      for (let i = 0; i < 6; i++) {
        const week = [];
        do {
          const day = calendar.date();
          const isDifferentMonth = calendar.month() !== this.selectedMonthIndex;
          const dateIsToday = calendar.isSame(today, 'day');
          const disabled = isDifferentMonth || this._isDateDisabled(calendar);
          const selected = !disabled && this.selectedDayIndex === day;

          week.push({
            customClass: (dateIsToday && 'today') || '',
            display: day,
            day,
            disabled,
            selected,
          });
          calendar.add(1, 'day');
        } while (calendar.day() != 0);

        weeks.push(week);
      }
      return weeks;
    }
  ),

  months: computed('selectedMonthIndex', function() {
    const rows = [];
    const calendar = moment({
      year: this.selectedYearIndex,
    });
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        const month = calendar.month();
        const disabled = this._isDateDisabled(calendar);
        const selected = !disabled && this.selectedMonthIndex === month;
        row.push({
          display: calendar.format('MMM'),
          month,
          disabled,
          selected,
        });
        calendar.add(1, 'month');
      }
      rows.push(row);
    }

    return rows;
  }),

  years: computed('selectedYearIndex', function() {
    const rows = [];
    const remainder = this.selectedYearIndex % 10;
    const beginYear = this.selectedYearIndex - remainder;

    let year = beginYear;

    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 2; j++, year++) {
        const calendar = moment({
          year,
        });
        const disabled = this._isDateDisabled(calendar);
        const selected = !disabled && this.selectedYearIndex === year;
        row.push({
          display: year,
          year,
          disabled,
          selected,
        });
      }
      rows.push(row);
    }

    return rows;
  }),

  table: computed(
    'isSelectingDays',
    'isSelectingMonths',
    'isSelectingYears',
    'isSelectingHours',
    'isSelectingMinutes',
    'days',
    'months',
    'years',
    'hours',
    'minutes',
    function() {
      let columnHeaders = DAY_HEADERS;
      let columnCountClass = 'seven';
      let rows = this.days;
      if (this.isSelectingMonths) {
        columnHeaders = null;
        columnCountClass = 'three';
        rows = this.months;
      } else if (this.isSelectingYears) {
        columnHeaders = null;
        columnCountClass = 'two';
        rows = this.years;
      } else if (this.isSelectingHours) {
        columnHeaders = null;
        columnCountClass = 'four';
        rows = this.hours;
      } else if (this.isSelectingMinutes) {
        columnHeaders = null;
        columnCountClass = 'three';
        rows = this.minutes;
      }
      return {
        columnCountClass,
        columnHeaders,
        rows,
      };
    }
  ),

  _manipulateDate(operation, number, unitType, evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    let date = moment({
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
      hour: this.selectedHourIndex,
      minute: this.selectedMinuteIndex,
    });
    date[operation](number, unitType);

    const dateBeforeMinDate = this.minDate && date.isBefore(this.minDate);
    const dateAfterMaxDate = this.maxDate && date.isAfter(this.maxDate);

    if (dateBeforeMinDate) {
      date = moment(this.minDate).clone();
      const remainder = date.minute() % MINUTE_INTERVAL;
      date.add(remainder, 'minute');
    } else if (dateAfterMaxDate) {
      date = moment(this.maxDate).clone();
      const remainder = date.minute() % MINUTE_INTERVAL;
      date.subtract(remainder, 'minute');
    }

    this._updateSelectedIndexes(date);
  },

  moveLeft: on(keyDown('ArrowLeft'), function(evt) {
    if (this.isSelectingDays) {
      this._manipulateDate('subtract', 1, 'day', evt);
    } else if (this.isSelectingMonths) {
      this._manipulateDate('subtract', 1, 'month', evt);
    } else if (this.isSelectingYears) {
      this._manipulateDate('subtract', 1, 'year', evt);
    } else if (this.isSelectingMinutes) {
      this._manipulateDate('subtract', MINUTE_INTERVAL, 'minute', evt);
    } else if (this.isSelectingHours) {
      this._manipulateDate('subtract', 1, 'hour', evt);
    }
  }),

  moveRight: on(keyDown('ArrowRight'), function(evt) {
    if (this.isSelectingDays) {
      this._manipulateDate('add', 1, 'day', evt);
    } else if (this.isSelectingMonths) {
      this._manipulateDate('add', 1, 'month', evt);
    } else if (this.isSelectingYears) {
      this._manipulateDate('add', 1, 'year', evt);
    } else if (this.isSelectingMinutes) {
      this._manipulateDate('add', MINUTE_INTERVAL, 'minute', evt);
    } else if (this.isSelectingHours) {
      this._manipulateDate('add', 1, 'hour', evt);
    }
  }),

  moveUp: on(keyDown('ArrowUp'), function(evt) {
    if (this.isSelectingDays) {
      this._manipulateDate('subtract', 1, 'week', evt);
    } else if (this.isSelectingMonths) {
      this._manipulateDate('subtract', 3, 'month', evt);
    } else if (this.isSelectingYears) {
      this._manipulateDate('subtract', 2, 'year', evt);
    } else if (this.isSelectingMinutes) {
      this._manipulateDate('subtract', MINUTE_INTERVAL * 3, 'minute', evt);
    } else if (this.isSelectingHours) {
      this._manipulateDate('subtract', 4, 'hour', evt);
    }
  }),

  moveDown: on(keyDown('ArrowDown'), function(evt) {
    if (this.isSelectingDays) {
      this._manipulateDate('add', 1, 'week', evt);
    } else if (this.isSelectingMonths) {
      this._manipulateDate('add', 3, 'month', evt);
    } else if (this.isSelectingYears) {
      this._manipulateDate('add', 2, 'year', evt);
    } else if (this.isSelectingMinutes) {
      this._manipulateDate('add', MINUTE_INTERVAL * 3, 'minute', evt);
    } else if (this.isSelectingHours) {
      this._manipulateDate('add', 4, 'hour', evt);
    }
  }),

  enter: on(keyDown('Enter'), function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.goToNextWorkFlowStep();
  }),

  esc: on(keyDown('Escape'), function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onClose();
  }),

  setToNow() {
    this.onSelect(new Date());
  },

  clickCell(cell) {
    if (this.isSelectingMinutes) {
      this.set('selectedMinuteIndex', cell.minute);
    } else if (this.isSelectingHours) {
      this.set('selectedHourIndex', cell.hour);
    } else if (this.isSelectingMonths) {
      this.set('selectedMonthIndex', cell.month);
    } else if (this.isSelectingYears) {
      this.set('selectedYearIndex', cell.year);
    } else if (this.isSelectingDays) {
      this.set('selectedDayIndex', cell.day);
    }
    this.goToNextWorkFlowStep();
  },

  selectDate() {
    const value = moment({
      hour: this.selectedHourIndex,
      minute: this.selectedMinuteIndex,
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    });
    this.onSelect(value.toDate());
  },

  onHeaderDisplayClick() {
    if (this.isSelectingDays) {
      this.set('isSelectingDays', false);
      this.set('isSelectingMonths', true);
    } else if (this.isSelectingMonths) {
      this.set('isSelectingMonths', false);
      this.set('isSelectingYears', true);
    } else if (this.isSelectingYears) {
      this.set('isSelectingYears', false);
      this.set('isSelectingDays', true);
    }
  },

  goToNextWorkFlowStep() {
    if (this.type === 'datetime' || this.type === 'date') {
      if (this.isSelectingMonths) {
        this.set('isSelectingMonths', false);
        this.set('isSelectingDays', true);
        return;
      } else if (this.isSelectingYears) {
        this.set('isSelectingYears', false);
        this.set('isSelectingDays', true);
        return;
      }
    }
    if (this.type === 'datetime' || this.type === 'time') {
      if (this.isSelectingHours) {
        this.set('selectedMinuteIndex', 0);
        this.set('isSelectingHours', false);
        this.set('isSelectingMinutes', true);
        return;
      } else if (this.isSelectingMinutes) {
        this.selectDate();
        return;
      }
    }
    if (this.type === 'datetime' && this.isSelectingDays) {
      this.set('isSelectingDays', false);
      this.set('isSelectingHours', true);
    } else if (this.type === 'date') {
      this.selectDate();
    }
  },

  onPrevious() {
    if (this.isSelectingDays) {
      this._manipulateDate('subtract', 1, 'month');
    } else if (this.isSelectingMonths) {
      this._manipulateDate('subtract', 1, 'year');
    } else if (this.isSelectingYears) {
      this._manipulateDate('subtract', 10, 'year');
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      this._manipulateDate('subtract', 1, 'day');
    }
  },

  onNext() {
    if (this.isSelectingDays) {
      this._manipulateDate('add', 1, 'month');
    } else if (this.isSelectingMonths) {
      this._manipulateDate('add', 1, 'year');
    } else if (this.isSelectingYears) {
      this._manipulateDate('add', 10, 'year');
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      this._manipulateDate('add', 1, 'day');
    }
  },

  _updateSelectedIndexes(value) {
    if (!value) {
      value = moment(this.value);
    }
    this.set('selectedDayIndex', value.date());
    this.set('selectedMonthIndex', value.month());
    this.set('selectedYearIndex', value.year());

    if (this.type === 'datetime' || this.type === 'time') {
      this.set('selectedHourIndex', value.hour());
      this.set('selectedMinuteIndex', value.minute());
    }
  },

  onSelect() {
    // Implement Action
  },

  onClose() {
    // Implement Action
  },
});
