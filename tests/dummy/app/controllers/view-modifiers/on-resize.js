import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// BEGIN-SNIPPET on-resize
export default class ViewModifiersOnResizeController extends Controller {
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
// END-SNIPPET
