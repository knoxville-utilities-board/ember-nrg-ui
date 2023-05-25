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

  get classes() {
    let flyoutClasses = this.flyout.flyoutClasses;

    if (this.args.isActive) {
      flyoutClasses += ' active';
    }
    if (this.flyoutService.activeIsTransitioning) {
      flyoutClasses += ' transitioning';
    }

    return flyoutClasses;
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
    element.addEventListener('transitionend', this.completeTransition);
    next(() => {
      this.animateIn();
      this.flyoutService.activeIsTransitioning = true;
    });
  }

  @action
  completeTransition(evt) {
    if (!evt) {
      this.flyout.showOverlay = false;
    }
    this.flyoutService.activeIsTransitioning = false;
    this.flyout.closing = false;
    this.flyout.animating = false;
    this.flyoutElement.removeEventListener(
      'transitionend',
      this.completeTransition
    );
  }

  @action
  onClickOutside() {
    if (
      this.flyoutService.activeFlyout === this.flyout &&
      this.flyout.dismissable
    ) {
      this.onHide();
    }
  }

  @action
  async onHide() {
    await this.animateOut();
    this.flyout.onHide();
  }

  @action
  async onPrimary() {
    await this.onHide();
    this.flyout.onPrimary();
  }

  @action
  async onSecondary() {
    await this.onHide();
    this.flyout.onSecondary();
  }

  animateIn() {
    this.flyout.showOverlay = true;
  }

  async animateOut() {
    this.flyoutService.activeIsTransitioning = true;
    return new Promise((resolve) => {
      const finishTransition = (event) => {
        if (event?.target !== this.flyoutElement) {
          return;
        }
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
}
