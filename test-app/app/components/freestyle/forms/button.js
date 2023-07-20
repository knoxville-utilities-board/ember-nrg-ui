import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FreestyleFormsButtonComponent extends Component {
  classOptions = ['', 'primary', 'secondary', 'basic black'];

  @tracked
  buttonText = 'Example';
}
