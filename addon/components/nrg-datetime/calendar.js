import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { on } from '@ember/object/evented';
import {
  EKFirstResponderOnFocusMixin,
  EKMixin,
  keyDown
} from 'ember-keyboard';
import dayjs from 'dayjs';
import layout from '../../templates/components/nrg-datetime/calendar';

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

  showNowShortcut: true,

  _showNowShortcut: computed('showNowShortcut', 'minDate', 'maxDate', 'isDateDisabled', function() {
    if (!this.showNowShortcut) {
      return;
    }
    const now = dayjs();
    const userDisabled = this.isDateDisabled && this.isDateDisabled(now);
    const afterMaxDate = now.isAfter(this.maxDate, 'date');
    const beforeMinDate = now.isBefore(this.minDate, 'date');
    return !userDisabled && !afterMaxDate && !beforeMinDate;
  }),

  init() {
    this._super(...arguments);
    if (this.type === 'datetime' || this.type === 'date') {
      this.set('isSelectingDays', true);
    } else if (this.type === 'time') {
      this.set('isSelectingHours', true);
    }
    this._updateSelectedIndexes(this.value);
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
      const calendar = dayjs({
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

  _isBeyondDateRange(date, precision) {
    date = dayjs(date);
    let invalid = false;
    if (this.minDate) {
      invalid = date.isBefore(this.minDate, precision);
    }
    if (this.maxDate) {
      invalid = invalid || date.isAfter(this.maxDate, precision);
    }
    return invalid;
  },

  _isDateDisabled(date, precision) {
    const userDisabled = this.isDateDisabled && this.isDateDisabled(date, precision);
    const isBeyondDateRange = this._isBeyondDateRange(date, precision);
    return userDisabled || isBeyondDateRange;
  },

  minutes: computed('selectedMinuteIndex', function() {
    let calendar = dayjs({
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
        const disabled = this._isDateDisabled(calendar, 'minute');
        const selected = !disabled && this.selectedMinuteIndex === minute;
        row.push({
          display: calendar.format('LT'),
          minute,
          disabled,
          selected,
        });
        calendar = calendar.add(MINUTE_INTERVAL, 'minute');
      }
      rows.push(row);
    }
    return rows;
  }),

  hours: computed('selectedHourIndex', function() {
    let calendar = dayjs({
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    });
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const hour = calendar.hour();
        const disabled = this._isDateDisabled(calendar, 'hour');
        const selected = !disabled && this.selectedHourIndex === hour;
        row.push({
          display: calendar.format('LT'),
          hour,
          disabled,
          selected,
        });
        calendar = calendar.add(1, 'hour');
      }
      rows.push(row);
    }
    return rows;
  }),

  days: computed('selectedDayIndex', 'selectedMonthIndex', 'selectedYearIndex', function() {
    const today = dayjs();
    const weeks = [];
    let calendar = dayjs({
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    }).startOf('week');
    for (let i = 0; i < 6; i++) {
      const week = [];
      do {
        const date = calendar.date();
        const month = calendar.month();
        const year = calendar.year();
        const isDifferentMonth = month !== this.selectedMonthIndex;
        const dateIsToday = calendar.isSame(today, 'date');
        const disabled = this._isDateDisabled(calendar, 'date') || isDifferentMonth;
        const selected = !disabled && this.selectedDayIndex === date;

        week.push({
          customClass: (dateIsToday && 'today') || '',
          display: date,
          date,
          month,
          year,
          disabled,
          selected,
        });
        calendar = calendar.add(1, 'day');
      } while (calendar.day() != 0);

      weeks.push(week);
    }
    return weeks;
  }),

  months: computed('selectedMonthIndex', function() {
    const rows = [];
    let calendar = dayjs({
      year: this.selectedYearIndex,
    });
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        const month = calendar.month();
        const disabled = this._isDateDisabled(calendar, 'month');
        const selected = !disabled && this.selectedMonthIndex === month;
        row.push({
          display: calendar.format('MMM'),
          month,
          disabled,
          selected,
        });
        calendar = calendar.add(1, 'month');
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
        const calendar = dayjs({
          year,
        });
        const disabled = this._isDateDisabled(calendar, 'year');
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

  _manipulateDate(operation, dateTransformation, evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    let date = dayjs({
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
      hour: this.selectedHourIndex,
      minute: this.selectedMinuteIndex,
    });

    date = date[operation](dateTransformation);

    let precision = null;

    if (this.isSelectingDays) {
      precision = 'day';
    } else if (this.isSelectingMonths) {
      precision = 'month';
    } else if (this.isSelectingYears) {
      precision = 'year';
    } else if (this.isSelectingHours) {
      precision = 'hour';
    } else if (this.isSelectingMinutes) {
      precision = 'minute';
    }

    const userDisabled = this.isDateDisabled && this.isDateDisabled(date, precision);
    if (userDisabled) {
      return;
    }

    const dateBeforeMinDate = this.minDate && date.isBefore(this.minDate);
    const dateAfterMaxDate = this.maxDate && date.isAfter(this.maxDate);

    if (dateBeforeMinDate) {
      date = dayjs(this.minDate).clone();
      const remainder = date.minute() % MINUTE_INTERVAL;
      date = date.add(remainder, 'minute');
    } else if (dateAfterMaxDate) {
      date = dayjs(this.maxDate).clone();
      const remainder = date.minute() % MINUTE_INTERVAL;
      date = date.subtract(remainder, 'minute');
    }

    this._updateSelectedIndexes(date);
  },

  moveLeft: on(keyDown('ArrowLeft'), function(evt) {
    if (this.isSelectingDays) {
      this._manipulateDate('subtract', { day: 1 }, evt);
    } else if (this.isSelectingMonths) {
      this._manipulateDate('subtract', { month: 1 }, evt);
    } else if (this.isSelectingYears) {
      this._manipulateDate('subtract', { year: 1 }, evt);
    } else if (this.isSelectingMinutes) {
      this._manipulateDate('subtract', { minute: MINUTE_INTERVAL }, evt);
    } else if (this.isSelectingHours) {
      this._manipulateDate('subtract', { hour: 1 }, evt);
    }
  }),

  moveRight: on(keyDown('ArrowRight'), function(evt) {
    if (this.isSelectingDays) {
      this._manipulateDate('add', { day: 1 }, evt);
    } else if (this.isSelectingMonths) {
      this._manipulateDate('add', { month: 1 }, evt);
    } else if (this.isSelectingYears) {
      this._manipulateDate('add', { year: 1 }, evt);
    } else if (this.isSelectingMinutes) {
      this._manipulateDate('add', { minute: MINUTE_INTERVAL }, evt);
    } else if (this.isSelectingHours) {
      this._manipulateDate('add', { hour: 1 }, evt);
    }
  }),

  moveUp: on(keyDown('ArrowUp'), function(evt) {
    if (this.isSelectingDays) {
      this._manipulateDate('subtract', { week: 1 }, evt);
    } else if (this.isSelectingMonths) {
      this._manipulateDate('subtract', { month: 3 }, evt);
    } else if (this.isSelectingYears) {
      this._manipulateDate('subtract', { year: 2 }, evt);
    } else if (this.isSelectingMinutes) {
      this._manipulateDate('subtract', { minute: MINUTE_INTERVAL * 3}, evt);
    } else if (this.isSelectingHours) {
      this._manipulateDate('subtract', { hour: 4 }, evt);
    }
  }),

  moveDown: on(keyDown('ArrowDown'), function(evt) {
    if (this.isSelectingDays) {
      this._manipulateDate('add', { week: 1 }, evt);
    } else if (this.isSelectingMonths) {
      this._manipulateDate('add', { month: 3 }, evt);
    } else if (this.isSelectingYears) {
      this._manipulateDate('add', { year: 2 }, evt);
    } else if (this.isSelectingMinutes) {
      this._manipulateDate('add', { minute: MINUTE_INTERVAL * 3 }, evt);
    } else if (this.isSelectingHours) {
      this._manipulateDate('add', { hour: 4 }, evt);
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
      this._manipulateDate('set', { minute: cell.minute });
    } else if (this.isSelectingHours) {
      this._manipulateDate('set', { hour: cell.hour });
    } else if (this.isSelectingMonths) {
      this._manipulateDate('set', { month: cell.month });
    } else if (this.isSelectingYears) {
      this._manipulateDate('set', { year: cell.year });
    } else if (this.isSelectingDays) {
      this._manipulateDate('set', { date: cell.date, month: cell.month, year: cell.year });
    }
    this.goToNextWorkFlowStep();
  },

  selectDate() {
    const value = dayjs({
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
      this._manipulateDate('subtract', { month: 1 });
    } else if (this.isSelectingMonths) {
      this._manipulateDate('subtract', { year: 1 });
    } else if (this.isSelectingYears) {
      this._manipulateDate('subtract', { year: 10 });
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      this._manipulateDate('subtract', { day: 1 });
    }
  },

  onNext() {
    if (this.isSelectingDays) {
      this._manipulateDate('add', { month: 1 });
    } else if (this.isSelectingMonths) {
      this._manipulateDate('add', { year: 1 });
    } else if (this.isSelectingYears) {
      this._manipulateDate('add', { year: 10 });
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      this._manipulateDate('add', { day: 1 });
    }
  },

  _updateSelectedIndexes(value) {
    if (!value) {
      return;
    }
    value = dayjs(value);
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
