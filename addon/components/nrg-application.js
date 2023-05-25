import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
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
  flyout;

  @service
  responsive;

  @service
  flashMessages;

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

  get pusherClass() {
    let pusherClass = 'pusher';
    if (this.flyout.hasOpenFlyouts) {
      pusherClass += ' dimmed';
    }
    if (this.flyout.allOpenFlyoutsAreClosing) {
      pusherClass += ' closing';
    }
    return pusherClass;
  }

  @action
  setMainContentStyle() {
    this.mainContentStyle = htmlSafe(`height:${window.innerHeight}px`);
  }

  @action
  toggleSidebar() {
    if (this.responsive.isComputerScreenGroup) {
      this.application.sidebarMenuIsOpen = !this.application.sidebarMenuIsOpen;
    } else {
      this.application.sidebarIsOpen = !this.application.sidebarIsOpen;
    }
  }

  @action
  clickedLink(item) {
    this.args.onSidebarItemClick?.(item);
  }
}
