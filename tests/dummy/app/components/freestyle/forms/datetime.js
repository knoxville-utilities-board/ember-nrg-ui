import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import dayjs from 'dayjs';

export default class FreestyleFormsDatetimeComponent extends Component {
  maxDate = dayjs().add(5, 'days').toDate();

  dateTimeTypeOptions = ['date', 'datetime'];

  dateTimeValue = new Date();

  @tracked
  dateTimeType = 'date';
}
