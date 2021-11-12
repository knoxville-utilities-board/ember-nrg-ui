import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class NrgDropdownItemComponent extends Component {
  get active() {
    return (
      this.args.index == this.args.activeItem &&
      this.args.activeItem != undefined
    );
  }

  @action
  _onClick(option, evt) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    this.args.onSelect && this.args.onSelect(option);
    this.args.onSelectInternal && this.args.onSelectInternal(option);
  }
}
