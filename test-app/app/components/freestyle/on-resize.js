import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FreestyleOnResizeComponent extends Component {
  @tracked
  width = 'onResize event not yet fired';

  @tracked
  height = 'onResize event not yet fired';

  @action
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
