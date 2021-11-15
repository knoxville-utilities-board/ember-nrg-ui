import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class NrgButtonComponent extends Component {
  @action
  onClick() {
    this.args.onClick?.();
  }
}
