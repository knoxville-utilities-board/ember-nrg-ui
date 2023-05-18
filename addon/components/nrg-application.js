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

  get flyoutIsActive() {
    return this.modal.activeModal?.isFlyout;
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

  @action
  onFlyoutDimmerClick() {
    const isDismissable = this.modal.activeModal?.dismissable;
    const isFlyout = this.flyoutIsActive;
    const flyoutHasRendered = this.modal.activeModal?.args?.hasRendered;
    if (isDismissable && isFlyout && flyoutHasRendered) {
      this.modal.activeModal?.onHide();
    }
  }
}
