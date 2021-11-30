import Controller from '@ember/controller';
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
  checkbox2: [validator('presence', true)],
  selectedOption: [validator('presence', true)],
  textArea: [
    validator('presence', true),
    validator('length', {
      min: 3,
      max: 5,
    }),
  ],
  searchResult: [validator('presence', true)],
};

export default class ViewComponentsNrgFormsController extends Controller {
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
  textArea;

  @tracked
  textArea1;

  @tracked
  checkbox1 = true;

  @tracked
  dateTime1;

  @tracked
  dateTime2;

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
