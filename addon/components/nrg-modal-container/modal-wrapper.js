import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const isIE11 = !window.ActiveXObject && 'ActiveXObject' in window;
const useFlexBox = !isIE11;

export default class ModalWrapper extends Component {
  @service('modal') modalService;
  @tracked _parentContentNode;
  @tracked modalElement;
  @tracked contentNode;

  get isTesting() {
    return this.args.modal?.isTesting;
  }

  get isOpen() {
    return this.args.modal?.isOpen;
  }

  get isActive() {
    return this.args.modal?.isActive;
  }

  get renderInPlace() {
    return this.args.modal?.renderInPlace;
  }

  get hasMovedDom() {
    return this.args.modal?.hasMovedDom;
  }

  get takeover() {
    return this.args.modal?.takeover;
  }

  get sidebar() {
    return this.args.modal?.sidebar;
  }

  get basic() {
    return this.args.modal?.basic;
  }

  get lightbox() {
    return this.args.modal?.lightbox;
  }

  get scrolling() {
    return this.args.modal?.scrolling;
  }

  get hasCloseIcon() {
    return this.args.modal?.dismissable && !this.args.modal?.sidebar;
  }

  get modalContent() {
    return this.modalElement?.querySelector('.modal-content');
  }

  get marginTop() {
    return this.modalElement?.offsetHeight / 2;
  }

  get marginLeft() {
    return this.modalElement?.offsetWidth / 2;
  }

  get modalStyles() {
    if (
      useFlexBox ||
      !this.modalElement ||
      this.takeover ||
      this.sidebar ||
      this.lightbox
    ) {
      return '';
    }
    return htmlSafe(
      `margin-top: -${this.marginTop}px; margin-left: -${this.marginLeft}px;`
    );
  }

  @action
  addModalToWormhole(element) {
    if (this.hasMovedDom || this.renderInPlace || this.isTesting) {
      return;
    }
    this.contentNode = this.args.modal?.element?.querySelector('.modal-js');
    this._parentContentNode = element;
    element.appendChild(this.contentNode);
    this.args.modal.hasMovedDom = true;
  }

  @action
  removeModalFromWormhole() {
    if (!this.hasMovedDom) {
      return;
    }
    if (
      !this.args.modal ||
      this.args.modal?.isDestroying ||
      !this.args.modal?.element
    ) {
      this._parentContentNode.removeChild(this.contentNode);
    } else {
      this.args.modal?.element?.appendChild(this.contentNode);
      this.modalService?.remove(this);
      this.args.modal.hasMovedDom = false;
    }
  }

  @action
  modalElementAdded(element) {
    this.modalElement = element;
  }

  @action
  onHide() {
    this.args.modal?.onHide?.();
  }

  @action
  _onPrimary() {
    this.args.modal?._onPrimary?.();
  }

  @action
  _onSecondary() {
    this.args.modal?._onSecondary?.();
  }
}
