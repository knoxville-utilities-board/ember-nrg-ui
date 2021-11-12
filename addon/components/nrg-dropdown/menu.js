import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class NrgDropdownMenuComponent extends Component {
  @action
  onSelectInternal(option, evt) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    this.args.onSelectInternal && this.args.onSelectInternal(...arguments);
  }
}
