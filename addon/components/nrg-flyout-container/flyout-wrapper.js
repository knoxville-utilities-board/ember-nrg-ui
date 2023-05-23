import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FlyoutWrapper extends Component {
  @service('flyout')
  flyoutService;

  @tracked
  flyoutStyles;

  get hasCloseIcon() {
    return this.args.flyout?.dismissable;
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
    this.args.flyout._renderTo = element;
  }

  @action
  removeFlyoutFromWormhole() {
    this.args.flyout._renderTo = null;
  }

  @action
  onClickOutside() {
    if (this.args.flyout?.dismissable) {
      this.onHide();
    }
  }

  @action
  onHide() {
    this.args.flyout?.onHide?.();
  }

  @action
  onPrimary() {
    this.args.flyout?.onPrimary?.();
  }

  @action
  onSecondary() {
    this.args.flyout?.onSecondary?.();
  }
}
