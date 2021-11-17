import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class NrgContextItemComponent extends Component {
  get renderTo() {
    return this.args.bottom
      ? document.querySelector('.context-menu-container.bottom')
      : document.querySelector('.context-menu-container.top');
  }

  @action
  _onClick(evt) {
    if (this.args.disabled) {
      return;
    }
    evt.preventDefault();

    this.args.onClick?.();
  }
}
