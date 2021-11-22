import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import validationState, { validator } from 'ember-nrg-ui/validation';

const Validators = {
  textField: [validator('presence', true)],
  textArea: [validator('presence', true)],
  dateTime: [validator('presence', true)],
  dropdown: [validator('presence', true)],
  checkbox: [validator('presence', true)],
  radio: [validator('presence', true)],
};

export default class ViewComponentsNrgFormsController extends Controller {
  @validationState(Validators)
  validations;

  @tracked
  textField;

  @tracked
  textArea;

  @tracked
  dateTime;

  @tracked
  dropdown;

  @tracked
  checkbox;

  @tracked
  radio;

  @tracked
  optionList = [
    {
      label: 'Item 1',
    },
    {
      label: 'Item 2',
    },
  ];
}
