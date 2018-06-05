import {
  observer,
  computed,
} from '@ember/object';
import Component from '@ember/component';
import layout from './template';
import moment from 'moment';
import Validation from 'ember-nrg-ui/mixins/validation';

export default Component.extend(Validation, {
  layout,
  classNames: ['ui', 'calendar'],

  type: 'date', // picker type, can be 'datetime', 'date', 'time', 'month', or 'year'
  today: true, // show a 'today/now' button at the bottom of the calendar
  inline: false, // create the calendar inline instead of inside a popup
  startMode: false, // display mode to start in, can be 'year', 'month', 'day', 'hour', 'minute' (false = 'day')
  minDate: null, // minimum date/time that can be selected, dates/times before are disabled
  maxDate: null, // maximum date/time that can be selected, dates/times after are disabled
  disableYear: false, // disable year selection mode
  disableMonth: false, // disable month selection mode
  disableMinute: false, // disable minute selection mode
  startCalendar: null, // jquery object or selector for another calendar that represents the start date of a date range
  endCalendar: null, // jquery object or selector for another calendar that represents the end date of a date range

  icon: computed('type', function() {
    const type = this.get('type');
    let icon = 'calendar';
    if (type === 'time') {
      icon = 'clock';
    }
    return icon;
  }),

  isDisabled: function( /* date */ ) {
    return false;
  },

  dateFormat: function(date) {
    return moment(date).format('LL');
  },

  timeFormat: function(date) {
    return moment(date).format('LT');
  },

  didInsertElement: function() {
    this._super(...arguments);
    var self = this;
    this.$().calendar({
      onChange: function(date) {
        self.set('isSettingDate', true);
        self.set('value', date);
        self.set('isSettingDate', false);
        return true;
      },

      type: this.get('type'),
      today: this.get('today'),
      inline: this.get('inline'),
      startMode: this.get('startMode'),
      minDate: this.get('minDate'),
      maxDate: this.get('maxDate'),
      disableYear: this.get('disableYear'),
      disableMonth: this.get('disableMonth'),
      disableMinute: this.get('disableMinute'),
      startCalendar: this.get('startCalendar'),
      endCalendar: this.get('endCalendar'),

      formatter: {
        date: this.dateFormat,
        time: this.timeFormat,
      },
      isDisabled: this.isDisabled,
    });
    var date = this.get('value');
    if (date) {
      this.$().calendar('set date', date);
    }
  },

  willDestroyElement: function() {
    this._super(...arguments);
    this.$().calendar('destroy');
  },

  dateObserver: observer('value', function() {
    if (this.get('isSettingDate')) {
      return;
    }
    var date = this.get('value');
    this.$().calendar('set date', date);
  }),
});
