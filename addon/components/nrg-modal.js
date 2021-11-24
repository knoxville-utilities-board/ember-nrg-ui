import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NrgModal extends Component {
  @service('modal') modalService;
  @service('application') applicationService;
  @tracked renderIndex;
  @tracked renderTo;

  get hasButtons() {
    return !!(this.primaryButton || this.secondaryButton);
  }

  get isTesting() {
    return this.applicationService?.isTesting ?? false;
  }

  get dismissable() {
    return this.args.dismissable !== false;
  }

  get basic() {
    return this.args.basic ?? false;
  }

  get sidebar() {
    return this.args.sidebar ?? false;
  }

  get lightbox() {
    return this.args.lightbox ?? false;
  }

  get scrolling() {
    return (
      !this.takeover && !this.lightbox && !this.sidebar && this.renderInModal
    );
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

  get renderInPlace() {
    return this.args.renderInPlace ?? this.isTesting;
  }

  get renderInModal() {
    return this.args.renderInModal ?? !this.renderInPlace;
  }

  get shouldWormhole() {
    return this.args.isOpen && this.renderInModal;
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

  get takeover() {
    return this.args.takeover ?? false;
  }

  get secondaryButtonClass() {
    let classList = 'basic';
    classList += this.basic ? ' secondary' : ' black';
    return classList;
  }

  @action
  handleIsOpenChange(element) {
    if (this.shouldWormhole) {
      this.addToService(element);
    } else {
      this.removeFromService();
    }
  }

  @action
  addToService() {
    if (this.shouldWormhole) {
      this.modalService.add(this);
    }
  }

  @action
  removeFromService() {
    this.modalService.remove(this);
  }

  @action
  _onPrimary() {
    this.onHide();
    this.onPrimaryButtonClick();
  }

  @action
  _onSecondary() {
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
  onHide() {
    if (this.args.isOpen && this.dismissable) {
      this.args.onDismiss?.();
      this.removeFromService();
    }
  }
}
