import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class NrgSidebarComponent extends Component {
  @service
  application;

  @service
  resize;

  @service
  responsive;

  @tracked
  isOpen = false;

  @action
  onInsert() {
    this.resize.on('didResize', this, this.onResize);
  }

  @action
  onDestroy() {
    this.resize.off('didResize', this, this.onResize);
  }

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
    this.clickedSidebarItem?.(item);
  }
}
