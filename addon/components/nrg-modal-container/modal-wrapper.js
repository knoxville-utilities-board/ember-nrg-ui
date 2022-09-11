import Component from '@glimmer/component';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const isIE11 = !window.ActiveXObject && 'ActiveXObject' in window;
const useFlexBox = !isIE11;

export default class ModalWrapper extends Component {
  @service('modal')
  modalService;

  @tracked
  modalStyles;

  get hasCloseIcon() {
    return this.args.modal?.dismissable && !this.args.modal?.sidebar;
  }

  @action
  onResize(element) {
    if (
      useFlexBox ||
      this.args.modal?.takeover ||
      this.args.modal?.sidebar ||
      this.args.modal?.lightbox
    ) {
      this.modalStyles = '';
    }
    const marginTop = element.offsetHeight / 2;
    const marginLeft = element.offsetWidth / 2;
    this.modalStyles = htmlSafe(
      `margin-top: -${marginTop}px; margin-left: -${marginLeft}px;`
    );
  }

  @action
  addModalToWormhole(element) {
    this.args.modal.renderTo = element;
  }

  @action
  removeModalFromWormhole() {
    this.args.modal.renderTo = null;
  }

  @action
  onHide() {
    this.args.modal?.onHide?.();
  }

  @action
  onPrimary() {
    this.args.modal?.onPrimary?.();
  }

  @action
  onSecondary() {
    this.args.modal?.onSecondary?.();
  }
}
