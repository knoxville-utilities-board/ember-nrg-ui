import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NrgFlyout extends Component {
  @service('flyout')
  flyoutService;

  @service('application')
  applicationService;

  @tracked
  renderIndex;

  @tracked
  _renderTo;

  @tracked
  flyoutElement;

  @tracked
  visible;

  get isTesting() {
    return this.applicationService.isTesting ?? false;
  }

  get renderTo() {
    if (this.renderInPlace || this.isTesting) {
      return null;
    }
    return this.args.renderTo ?? this._renderTo;
  }

  get renderInPlace() {
    return this.args.renderInPlace ?? this.isTesting;
  }

  get shouldWormhole() {
    return this.args.isOpen && this.renderInModal;
  }

  get flyoutClasses() {
    const classList = ['ui simple'];

    classList.push(this.args.width);
    if (this.args.fullscreen) {
      classList.push('fullscreen');
    }
    classList.push('flyout');
    classList.push(this.args.position ?? 'right');
    if (this.visible) {
      classList.push('overlay visible');
    }
    classList.push(this.args.class ?? '');

    return classList.filter(Boolean).join(' ');
  }

  get isHidden() {
    return !(this.renderInPlace && !this.renderTo);
  }

  get hasButtons() {
    return !!(this.primaryButton || this.secondaryButton);
  }

  get dismissable() {
    return this.args.dismissable !== false;
  }

  get modalClass() {
    return this.args.modalClass ?? '';
  }

  get dimmerClass() {
    return this.args.dimmerClass ?? '';
  }

  get headerText() {
    return this.args.headerText ?? '';
  }

  get priority() {
    return this.args.priority ?? 10;
  }

  get primaryButton() {
    return this.args.primaryButton;
  }

  get secondaryButton() {
    return this.args.secondaryButton;
  }

  get hidden() {
    return this.args.hidden ?? !this.renderInModal;
  }

  animateIn() {
    this.visible = true;
  }

  @action
  addToService() {
    this.flyoutService.add(this);
  }

  @action
  removeFromService() {
    this.flyoutService.remove(this);
  }

  @action
  onPrimary() {
    this.onHide();
    this.onPrimaryButtonClick();
  }

  @action
  onSecondary() {
    this.onHide();
    this.onSecondaryButtonClick();
  }

  @action
  onPrimaryButtonClick() {
    this.args.onPrimaryButtonClick?.();
  }

  @action
  onSecondaryButtonClick() {
    this.args.onSecondaryButtonClick?.();
  }

  @action
  async onHide() {
    if (this.args.isOpen && this.dismissable) {
      this.args.onDismiss?.();
    }
  }
}
