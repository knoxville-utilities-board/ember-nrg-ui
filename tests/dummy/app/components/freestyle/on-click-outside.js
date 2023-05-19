import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FreestyleOnClickOutsideComponent extends Component {
  @tracked
  lastState = 'None';

  @action
  onClick() {
    this.lastState = 'Clicked Inside';
  }

  @action
  onClickOutside() {
    this.lastState = 'Clicked Outside';
  }
}
