import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ViewModifiersOnClickOutsideController extends Controller {
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
