import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class NrgSidebarComponent extends Component {
  @service
  application;

  @service
  responsive;

  @tracked
  isOpen = false;

  @action
  onResize() {
    if (
      this.application.sidebarIsOpen &&
      this.responsive.isComputerScreenGroup
    ) {
      this.application.sidebarIsOpen = false;
    }
  }

  @action
  onLinkClick(item) {
    this.application.sidebarIsOpen = false;
    this.args.onSidebarItemClick?.(item);
  }
}
