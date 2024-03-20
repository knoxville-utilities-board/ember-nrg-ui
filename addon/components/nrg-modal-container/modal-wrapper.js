import { action } from '@ember/object';
import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const isIE11 = !window.ActiveXObject && 'ActiveXObject' in window;
const useFlexBox = !isIE11;

export default class ModalWrapper extends Component {
  @service('modal')
  modalService;

  @tracked
  modalStyles;

  @tracked
  animationState = 'closed';

  get hasCloseIcon() {
    return this.args.modal?.dismissable && !this.args.modal?.sidebar;
  }

  @action
  onResize({ target }) {
    if (
      useFlexBox ||
      this.args.modal?.takeover ||
      this.args.modal?.sidebar ||
      this.args.modal?.lightbox
    ) {
      this.modalStyles = '';
    }
    const marginTop = target.offsetHeight / 2;
    this.modalStyles = htmlSafe(`margin-top: -${marginTop}px`);
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
  onInsert() {
    next(() => {
      this.animationState = 'open';
    });
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
