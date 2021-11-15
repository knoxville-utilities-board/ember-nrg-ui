import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class NrgFormComponent extends Component {
  @service
  application;

  @service
  lightbox;

  @service
  modal;

  @service
  responsive;

  @service
  resize;

  @service
  flashMessages;

  @tracked
  sidebarIsOpen = false;

  @tracked
  mainContentStyle;

  get computerScreenSidebarActive() {
    return (
      this.responsive.isComputerScreenGroup &&
      this.application.sidebarMenuIsOpen
    );
  }

  constructor() {
    super(...arguments);
    this.setMainContentStyle();
  }

  setMainContentStyle() {
    return htmlSafe(`height:${window.innerHeight}px`);
  }

  @action
  onInsert() {
    this.resize.on('didResize', this, this.setMainContentStyle);
  }

  @action
  onDestroy() {
    this.resize.off('didResize', this, this.setMainContentStyle);
  }

  @action
  toggleSidebar() {
    if (this.responsive.isComputerScreenGroup) {
      this.application.sidebarMenuIsOpen = !this.application.sidebarMenuIsOpen;
    } else {
      this.sidebarIsOpen = !this.sidebarIsOpen;
    }
  }

  @action
  clickedLink(item) {
    this.args.clickedSidebarItem?.(item);
  }
}
