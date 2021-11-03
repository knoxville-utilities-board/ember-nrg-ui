import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MINUTE_INTERVAL = 5;

export default class NrgValidationComponent extends Component {
  @tracked
  isSelectingDays = false;

  @tracked
  isSelectingMonths = false;

  @tracked
  isSelectingYears = false;

  @tracked
  isSelectingHours = false;

  @tracked
  isSelectingMinutes = false;

  constructor() {
    super(...arguments);
    if (this.args.type === 'datetime' || this.args.type === 'date') {
      this.isSelectingDays = true;
    } else if (this.args.type === 'time') {
      this.isSelectingHours = true;
    }
  }

  get selectedDayIndex() {
    if (!this.args.value) {
      return null;
    }
    return moment(this.args.value).date();
  }

  get selectedMonthIndex() {
    if (!this.args.value) {
      return null;
    }
    return moment(this.args.value).month();
  }

  get selectedYearIndex() {
    if (!this.args.value) {
      return null;
    }
    return moment(this.args.value).year();
  }

  get selectedHourIndex() {
    const hasTime = this.args.type === 'datetime' || this.args.type === 'time';
    if (!this.args.value || !hasTime) {
      return null;
    }
    return moment(this.args.value).hour();
  }

  get selectedMinuteIndex() {
    const hasTime = this.args.type === 'datetime' || this.args.type === 'time';
    if (!this.args.value || !hasTime) {
      return null;
    }
    return moment(this.args.value).minute();
  }

  get _showNowShortcut() {
    if (this.args.showNowShortcut === false) {
      return false;
    }
    const now = moment();
    const userDisabled =
      this.args.isDateDisabled && this.args.isDateDisabled(now);
    const afterMaxDate = now.isAfter(this.args.maxDate, 'date');
    const beforeMinDate = now.isBefore(this.args.minDate, 'date');
    return !userDisabled && !afterMaxDate && !beforeMinDate;
  }

  get headerDisplay() {
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

  get minutes() {
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
        const disabled = this._isDateDisabled(calendar, 'minute');
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
  }

  get hours() {
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
        const disabled = this._isDateDisabled(calendar, 'hour');
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
  }

  get days() {
    const today = moment();
    const weeks = [];
    const calendar = moment({
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
        const disabled =
          this._isDateDisabled(calendar, 'date') || isDifferentMonth;
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
        calendar.add(1, 'day');
      } while (calendar.day() != 0);

      weeks.push(week);
    }
    return weeks;
  }

  get months() {
    const rows = [];
    const calendar = moment({
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
        calendar.add(1, 'month');
      }
      rows.push(row);
    }

    return rows;
  }

  get years() {
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
  }

  get table() {
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

  isBeyondDateRange(date, precision) {
    date = moment(date);
    let valid = true;
    if (this.args.minDate) {
      valid = !date.isBefore(this.args.minDate, precision);
    }
    if (this.args.maxDate) {
      valid = valid && !date.isAfter(this.args.maxDate, precision);
    }
    return !valid;
  }

  _isDateDisabled(date, precision) {
    const userDisabled =
      this.args.isDateDisabled && this.args.isDateDisabled(date, precision);
    const isBeyondDateRange = this.isBeyondDateRange(date, precision);
    return userDisabled || isBeyondDateRange;
  }

  _manipulateDate(operation, dateTransformation, evt) {
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

    date[operation](dateTransformation);

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

    const userDisabled =
      this.args.isDateDisabled && this.args.isDateDisabled(date, precision);
    if (userDisabled) {
      return;
    }

    const dateBeforeMinDate =
      this.args.minDate && date.isBefore(this.args.minDate);
    const dateAfterMaxDate =
      this.args.maxDate && date.isAfter(this.args.maxDate);

    if (dateBeforeMinDate) {
      date = moment(this.args.minDate).clone();
      const remainder = date.minute() % MINUTE_INTERVAL;
      date.add(remainder, 'minute');
    } else if (dateAfterMaxDate) {
      date = moment(this.args.maxDate).clone();
      const remainder = date.minute() % MINUTE_INTERVAL;
      date.subtract(remainder, 'minute');
    }

    this._onSelect(date.toDate());
  }

  selectDate() {
    const value = moment({
      hour: this.selectedHourIndex,
      minute: this.selectedMinuteIndex,
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    });
    this._onSelect(value.toDate());
  }

  _onSelect(date) {
    this.args.onSelect && this.args.onSelect(date);
  }

  close() {
    this.args.onClose && this.args.onClose();
  }

  @action
  moveLeft(evt) {
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
  }

  @action
  moveRight(evt) {
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
  }

  @action
  moveUp(evt) {
    if (this.isSelectingDays) {
      this._manipulateDate('subtract', { week: 1 }, evt);
    } else if (this.isSelectingMonths) {
      this._manipulateDate('subtract', { month: 3 }, evt);
    } else if (this.isSelectingYears) {
      this._manipulateDate('subtract', { year: 2 }, evt);
    } else if (this.isSelectingMinutes) {
      this._manipulateDate('subtract', { minute: MINUTE_INTERVAL * 3 }, evt);
    } else if (this.isSelectingHours) {
      this._manipulateDate('subtract', { hour: 4 }, evt);
    }
  }

  @action
  moveDown(evt) {
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
  }

  @action
  onEnter(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.goToNextWorkFlowStep();
  }

  @action
  onEscape(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.close();
  }

  @action
  setToNow() {
    this._onSelect(new Date());
  }

  @action
  clickCell(cell, evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isSelectingMinutes) {
      this._manipulateDate('set', { minute: cell.minute });
    } else if (this.isSelectingHours) {
      this._manipulateDate('set', {
        hour: cell.hour,
        minute: 0,
      });
    } else if (this.isSelectingMonths) {
      this._manipulateDate('set', { month: cell.month });
    } else if (this.isSelectingYears) {
      this._manipulateDate('set', { year: cell.year });
    } else if (this.isSelectingDays) {
      this._manipulateDate('set', {
        date: cell.date,
        month: cell.month,
        year: cell.year,
      });
    }
    this.goToNextWorkFlowStep();
  }

  @action
  onHeaderDisplayClick() {
    if (this.isSelectingDays) {
      this.isSelectingDays = false;
      this.isSelectingMonths = true;
    } else if (this.isSelectingMonths) {
      this.isSelectingMonths = false;
      this.isSelectingYears = true;
    } else if (this.isSelectingYears) {
      this.isSelectingYears = false;
      this.isSelectingDays = true;
    }
  }

  @action
  goToNextWorkFlowStep() {
    if (this.args.type === 'datetime' || this.args.type === 'date') {
      if (this.isSelectingMonths) {
        this.isSelectingMonths = false;
        this.isSelectingDays = true;
        return;
      } else if (this.isSelectingYears) {
        this.isSelectingYears = false;
        this.isSelectingMonths = true;
        return;
      }
    }
    if (this.args.type === 'datetime' || this.args.type === 'time') {
      if (this.isSelectingHours) {
        this.isSelectingHours = false;
        this.isSelectingMinutes = true;
        return;
      } else if (this.isSelectingMinutes) {
        this.selectDate();
        this.close();
        return;
      }
    }
    if (this.args.type === 'datetime' && this.isSelectingDays) {
      this.isSelectingDays = false;
      this.isSelectingHours = true;
    } else if (this.args.type === 'date') {
      this.selectDate();
      this.close();
    }
  }

  @action
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
  }

  @action
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
  }
}
