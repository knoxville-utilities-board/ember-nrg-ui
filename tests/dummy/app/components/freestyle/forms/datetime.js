import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FreestyleFormsDatetimeComponent extends Component {
  dateTimeTypeOptions = ['date', 'datetime'];

  dateTimeValue = new Date();

  @tracked
  dateTimeType = 'date';
}
