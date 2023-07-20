//BEGIN-SNIPPET form-backing-component
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import validationState, { validator } from 'ember-nrg-ui/decorators/validation';
import dayjs from 'dayjs';

const Validators = {
  turkey: [validator('presence', true)],
  meal: [validator('presence', true)],
  super: [
    validator('presence', {
      presence: true,
      isWarning: true,
    }),
  ],
  deal: [validator('presence', true)],
  textArea1: [validator('presence', true)],
  radio: [validator('presence', true)],
  checkbox1: [
    validator('inclusion', {
      in: [true],
    }),
  ],
  checkbox2: [
    validator('inclusion', {
      in: [true],
    }),
  ],
  selectedOption: [validator('presence', true)],
  textArea2: [
    validator('presence', true),
    validator('length', {
      min: 3,
      max: 5,
      disabled() {
        return this.textArea3;
      },
    }),
  ],
  searchResult: [validator('presence', true)],
  dateTime1: [validator('presence', true)],
  dateTime2: [validator('presence', true)],
  time1: [validator('presence', true)],
  time2: [validator('presence', true)],
  date1: [validator('presence', true)],
};

export default class FreestyleFormsComponent extends Component {
  @validationState(Validators)
  validations;

  @tracked
  required = false;

  @tracked
  disabled = false;

  @tracked
  turkey = 'turkey';

  @tracked
  meal;

  @tracked
  super;

  @tracked
  deal;

  @tracked
  radio;

  @tracked
  textArea1;

  @tracked
  textArea2;

  @tracked
  textArea3;

  @tracked
  checkbox1 = true;

  @tracked
  checkbox2 = false;

  @tracked
  dateTime1;

  @tracked
  dateTime2;

  @tracked
  time1;

  @tracked
  time2;

  @tracked
  date1;

  @tracked
  selectedOption;

  @tracked
  maxDate = dayjs().add(5, 'days').toDate();

  @tracked
  searchResult;

  @tracked
  optionList = [
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
  ];

  @action
  searchQuery() {
    return this.optionList;
  }

  @action
  requiredToggle() {
    this.required = !this.required;
  }

  @action
  disabledToggle() {
    this.disabled = !this.disabled;
  }
}
//END-SNIPPET
