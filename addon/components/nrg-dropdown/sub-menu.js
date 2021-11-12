import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NrgDropdownSourceComponent extends Component {
  @tracked
  isOpen = false;

  get menuClass() {
    let computedClasses = '';
    if (this.args.menuDirection) {
      computedClasses = this.args.menuDirection;
    }
    if (this.isOpen) {
      computedClasses += ' transition visible';
    } else {
      computedClasses += ' transition hidden';
    }
    return computedClasses;
  }

  @action
  onMouseEnter() {
    this.isOpen = true;
  }

  @action
  onMouseLeave() {
    this.isOpen = false;
  }

  @action
  onSelectInternal(option, evt) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    this.args.onSelectInternal && this.args.onSelectInternal(...arguments);
  }
}
