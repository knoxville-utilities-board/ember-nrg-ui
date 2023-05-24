import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { next } from '@ember/runloop';

export default class FlyoutWrapper extends Component {
  @service('flyout')
  flyoutService;

  @tracked
  flyoutStyles;

  @tracked
  flyoutElement;

  get hasCloseIcon() {
    return this.flyout.dismissable;
  }

  get flyout() {
    return this.args.flyout;
  }

  @action
  onResize(element) {
    const marginTop = element.offsetHeight / 2;
    const marginLeft = element.offsetWidth / 2;
    this.flyoutStyles = htmlSafe(
      `margin-top: -${marginTop}px; margin-left: -${marginLeft}px;`
    );
  }

  @action
  addFlyoutToWormhole(element) {
    this.flyout._renderTo = element;
  }

  @action
  removeFlyoutFromWormhole() {
    this.flyout._renderTo = null;
  }

  @action
  didInsert(element) {
    this.flyoutElement = element;
    next(() => {
      this.animateIn();
    });
  }

  animateIn() {
    this.flyout.showOverlay = true;
  }

  async animateOut() {
    return new Promise((resolve) => {
      const finishTransition = () => {
        this.completeTransition();
        resolve();
        this.flyoutElement.removeEventListener(
          'transitionend',
          finishTransition
        );
      };
      this.flyoutElement.addEventListener('transitionend', finishTransition);
      this.flyout.closing = true;
      this.flyout.animating = true;
    });
  }

  @action
  completeTransition() {
    this.flyout.showOverlay = false;
    this.flyout.closing = false;
    this.flyout.animating = false;
  }

  @action
  async onClickOutside() {
    if (
      this.flyoutService.activeFlyout === this.flyout &&
      this.flyout.dismissable
    ) {
      await this.animateOut();
      this.onHide();
    }
  }

  @action
  onHide() {
    this.flyout.onHide();
  }

  @action
  onPrimary() {
    this.onHide();
    this.flyout.onPrimary();
  }

  @action
  onSecondary() {
    this.onHide();
    this.flyout.onSecondary();
  }
}
