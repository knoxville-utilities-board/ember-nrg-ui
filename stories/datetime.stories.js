import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Datetime',
  component: 'nrg-datetime',
};

const defaultDateFormat = 'LL';
const defaultTimeFormat = 'LT';

const Template = (args) => ({
  template: hbs`<NrgDatetime @value={{this.value}} @type={{this.type}}
  @dateFormat={{this.dateFormat}} @timeFormat={{this.timeFormat}} @showNowShortcut={{this.showNowShortcut}}
  @initializeDate={{this.initializeDate}} @onBlur={{this.onBlur}} @onFocus={{this.onFocus}} @onDateSelect={{this.onDateSelect}}>
      <NrgButton @class="primary">
        Open Datetime
      </NrgButton>
    </NrgDatetime>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  value: new Date(),
  type: 'datetime',
  dateFormat: defaultDateFormat,
  timeFormat: defaultTimeFormat,
  showNowShortcut: false,
  initializeDate: false,
  onBlur: () => {},
  onFocus: () => {},
  onDateSelect: () => {},
};

export const DateDisplay = Template.bind({});
DateDisplay.args = {
  value: new Date(),
  type: 'date',
  dateFormat: defaultDateFormat,
  timeFormat: defaultTimeFormat,
  showNowShortcut: false,
  initializeDate: false,
  onBlur: () => {},
  onFocus: () => {},
  onDateSelect: () => {},
};

export const TimeDisplay = Template.bind({});
TimeDisplay.args = {
  value: new Date(),
  type: 'time',
  dateFormat: defaultDateFormat,
  timeFormat: defaultTimeFormat,
  showNowShortcut: false,
  initializeDate: false,
  onBlur: () => {},
  onFocus: () => {},
  onDateSelect: () => {},
};

export const ShowNowShortcut = Template.bind({});
ShowNowShortcut.args = {
  value: new Date(),
  type: 'datetime',
  dateFormat: defaultDateFormat,
  timeFormat: defaultTimeFormat,
  showNowShortcut: true,
  initializeDate: false,
  onBlur: () => {},
  onFocus: () => {},
  onDateSelect: () => {},
};
