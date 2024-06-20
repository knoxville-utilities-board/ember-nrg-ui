import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import dayjs from 'dayjs';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MINUTE_INTERVAL = 5;

@AddNrgDeprecations()
export default class NrgDateTimeCalendarComponent extends Component {
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

  get selectedIndex() {
    if (this.args.value) {
      return this.args.value;
    }

    const now = dayjs();

    if (now.isBefore(this.args.minDate)) {
      return this.args.minDate;
    } else if (now.isAfter(this.args.maxDate)) {
      return this.args.maxDate;
    }
    return now;
  }

  get selectedDayIndex() {
    const value = this.selectedIndex;
    return dayjs(value).date();
  }

  get selectedMonthIndex() {
    const value = this.selectedIndex;
    return dayjs(value).month();
  }

  get selectedYearIndex() {
    const value = this.selectedIndex;
    return dayjs(value).year();
  }

  get selectedHourIndex() {
    const value = this.selectedIndex;
    const hasTime = this.args.type === 'datetime' || this.args.type === 'time';
    if (!hasTime) {
      return null;
    }
    return dayjs(value).hour();
  }

  get selectedMinuteIndex() {
    const value = this.selectedIndex;
    const hasTime = this.args.type === 'datetime' || this.args.type === 'time';
    if (!hasTime) {
      return null;
    }
    return dayjs(value).minute();
  }

  get showNowShortcut() {
    if (this.args.showNowShortcut === false) {
      return false;
    }
    const now = dayjs();
    const userDisabled = this.args.isDateDisabled?.(now);
    const afterMaxDate = now.isAfter(this.args.maxDate, 'date');
    const beforeMinDate = now.isBefore(this.args.minDate, 'date');
    return !userDisabled && !afterMaxDate && !beforeMinDate;
  }

  get headerDisplay() {
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

  get minutes() {
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
        const disabled = this.isDateDisabled(calendar, 'minute');
        const selected =
          !disabled && this.args.value && this.selectedMinuteIndex === minute;
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
  }

  get hours() {
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
        const disabled = this.isDateDisabled(calendar, 'hour');
        const selected =
          !disabled && this.args.value && this.selectedHourIndex === hour;
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
  }

  get days() {
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
        const disabled =
          this.isDateDisabled(calendar, 'date') || isDifferentMonth;
        const selected =
          !disabled && this.args.value && this.selectedDayIndex === date;

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
  }

  get months() {
    const rows = [];
    let calendar = dayjs({
      year: this.selectedYearIndex,
    });
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        const month = calendar.month();
        const disabled = this.isDateDisabled(calendar, 'month');
        const selected =
          !disabled && this.args.value && this.selectedMonthIndex === month;
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
  }

  get years() {
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
        const disabled = this.isDateDisabled(calendar, 'year');
        const selected =
          !disabled && this.args.value && this.selectedYearIndex === year;
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

  get allowMinuteSelection() {
    return this.args.allowMinuteSelection !== false;
  }

  isBeyondDateRange(date, precision) {
    date = dayjs(date);
    let valid = true;
    if (this.args.minDate) {
      valid = !date.isBefore(this.args.minDate, precision);
    }
    if (this.args.maxDate) {
      valid = valid && !date.isAfter(this.args.maxDate, precision);
    }
    return !valid;
  }

  isDateDisabled(date, precision) {
    const userDisabled = this.args.isDateDisabled?.(date, precision);
    const isBeyondDateRange = this.isBeyondDateRange(date, precision);
    return userDisabled || isBeyondDateRange;
  }

  manipulateDate(operation, dateTransformation, evt) {
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
    const currentDate = date.clone();

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

    const userDisabled = this.args.isDateDisabled?.(date, precision);
    if (userDisabled) {
      this.onSelect(currentDate.toDate());
      return;
    }

    const dateBeforeMinDate =
      this.args.minDate && date.isBefore(this.args.minDate);
    const dateAfterMaxDate =
      this.args.maxDate && date.isAfter(this.args.maxDate);

    if (dateBeforeMinDate) {
      date = dayjs(this.args.minDate).clone();
      const remainder = date.minute() % MINUTE_INTERVAL;
      date = date.add(remainder, 'minute');
    } else if (dateAfterMaxDate) {
      date = dayjs(this.args.maxDate).clone();
      const remainder = date.minute() % MINUTE_INTERVAL;
      date = date.subtract(remainder, 'minute');
    }

    this.onSelect(date.toDate());
  }

  selectDate() {
    const value = dayjs({
      hour: this.selectedHourIndex,
      minute: this.selectedMinuteIndex,
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    });
    this.onSelect(value.toDate());
  }

  onSelect(date) {
    this.args.onSelect?.(date);
  }

  close() {
    this.args.onClose?.();
  }

  @action
  moveLeft(evt) {
    if (this.isSelectingDays) {
      this.manipulateDate('subtract', { day: 1 }, evt);
    } else if (this.isSelectingMonths) {
      this.manipulateDate('subtract', { month: 1 }, evt);
    } else if (this.isSelectingYears) {
      this.manipulateDate('subtract', { year: 1 }, evt);
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('subtract', { minute: MINUTE_INTERVAL }, evt);
    } else if (this.isSelectingHours) {
      this.manipulateDate('subtract', { hour: 1 }, evt);
    }
  }

  @action
  moveRight(evt) {
    if (this.isSelectingDays) {
      this.manipulateDate('add', { day: 1 }, evt);
    } else if (this.isSelectingMonths) {
      this.manipulateDate('add', { month: 1 }, evt);
    } else if (this.isSelectingYears) {
      this.manipulateDate('add', { year: 1 }, evt);
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('add', { minute: MINUTE_INTERVAL }, evt);
    } else if (this.isSelectingHours) {
      this.manipulateDate('add', { hour: 1 }, evt);
    }
  }

  @action
  moveUp(evt) {
    if (this.isSelectingDays) {
      this.manipulateDate('subtract', { week: 1 }, evt);
    } else if (this.isSelectingMonths) {
      this.manipulateDate('subtract', { month: 3 }, evt);
    } else if (this.isSelectingYears) {
      this.manipulateDate('subtract', { year: 2 }, evt);
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('subtract', { minute: MINUTE_INTERVAL * 3 }, evt);
    } else if (this.isSelectingHours) {
      this.manipulateDate('subtract', { hour: 4 }, evt);
    }
  }

  @action
  moveDown(evt) {
    if (this.isSelectingDays) {
      this.manipulateDate('add', { week: 1 }, evt);
    } else if (this.isSelectingMonths) {
      this.manipulateDate('add', { month: 3 }, evt);
    } else if (this.isSelectingYears) {
      this.manipulateDate('add', { year: 2 }, evt);
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('add', { minute: MINUTE_INTERVAL * 3 }, evt);
    } else if (this.isSelectingHours) {
      this.manipulateDate('add', { hour: 4 }, evt);
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
    const now = new Date();
    if (!this.allowMinuteSelection) {
      now.setMinutes(0, 0, 0);
    }
    this.onSelect(now);
  }

  @action
  clickCell(cell, evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isSelectingMinutes) {
      this.manipulateDate('set', { minute: cell.minute });
    } else if (this.isSelectingHours) {
      this.manipulateDate('set', {
        hour: cell.hour,
        minute: 0,
      });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('set', { month: cell.month });
    } else if (this.isSelectingYears) {
      this.manipulateDate('set', { year: cell.year });
    } else if (this.isSelectingDays) {
      this.manipulateDate('set', {
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
        if (this.allowMinuteSelection) {
          this.isSelectingMinutes = true;
        } else {
          this.close();
        }
        return;
      } else if (this.isSelectingMinutes) {
        this.close();
        return;
      }
    }
    if (this.args.type === 'datetime' && this.isSelectingDays) {
      this.isSelectingDays = false;
      this.isSelectingHours = true;
    } else if (this.args.type === 'date') {
      this.close();
    }
  }

  @action
  onPrevious() {
    if (this.isSelectingDays) {
      this.manipulateDate('subtract', { month: 1 });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('subtract', { year: 1 });
    } else if (this.isSelectingYears) {
      this.manipulateDate('subtract', { year: 10 });
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      this.manipulateDate('subtract', { day: 1 });
    }
  }

  @action
  onNext() {
    if (this.isSelectingDays) {
      this.manipulateDate('add', { month: 1 });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('add', { year: 1 });
    } else if (this.isSelectingYears) {
      this.manipulateDate('add', { year: 10 });
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      this.manipulateDate('add', { day: 1 });
    }
  }
}
