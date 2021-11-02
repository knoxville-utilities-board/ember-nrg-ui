import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
import validationState, { validator } from 'ember-nrg-ui/validation';

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
  checkbox1: [
    validator('inclusion', {
      in: [true],
    }),
  ],
  checkbox2: [validator('presence', true)],
  textArea: [
    validator('length', {
      min: 0,
      max: 5,
    }),
  ],
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
  textArea1 = 'Sample Text';

  @tracked
  checkbox1 = true;

  @tracked
  dateTime1;

  @tracked
  dateTime2;

  @tracked
  maxDate = moment().add(5, 'days').toDate();

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
  requiredToggle() {
    this.required = !this.required;
  }

  @action
  disabledToggle() {
    this.disabled = !this.disabled;
  }
}
