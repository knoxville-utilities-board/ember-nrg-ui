import Controller from '@ember/controller';
import Validations from './validations';
import dayjs from 'dayjs';

export default Controller.extend(Validations, {
  required: false,
  disabled: false,

  maxDate: dayjs()
    .add(5, 'days')
    .toDate(),

  optionList: [
    {
      label: 'Item 1',
    },
    {
      label: 'Item 2',
    },
    {
      label: 'Item 3',
    },
    {
      label: 'Item 4',
    },
    {
      label: 'Item 5',
    },
  ],

  actions: {
    requiredToggle() {
      this.toggleProperty('required');
    },
    disabledToggle() {
      this.toggleProperty('disabled');
    },
  },
});
