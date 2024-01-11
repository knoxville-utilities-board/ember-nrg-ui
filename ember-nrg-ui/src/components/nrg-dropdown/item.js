import { action } from '@ember/object';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from '../../utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgDropdownItemComponent extends Component {
  get active() {
    return (
      this.args.index == this.args.activeItem &&
      this.args.activeItem != undefined
    );
  }

  @action
  onClick(option, evt) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    if (this.args.disabled) {
      return;
    }
    this.args.onSelect?.(option);
    this.args.onSelectInternal?.(option);
  }
}
