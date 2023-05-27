import NrgAnimatableComponent from 'ember-nrg-ui/components/nrg-animatable';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const isIE11 = !window.ActiveXObject && 'ActiveXObject' in window;
const useFlexBox = !isIE11;

export default class ModalWrapper extends NrgAnimatableComponent {
  @service('modal')
  modalService;

  @tracked
  modalStyles;

  get hasCloseIcon() {
    return this.args.modal?.dismissable && !this.args.modal?.sidebar;
  }

  get wrapperClasses() {
    const classes = ['ui'];
    const { modal } = this.args;

    // classes.push('visible active');
    // if (!modal.flyout) {
    //   classes.push('visible active');
    // }

    if (this.args.aboveDimmer) {
      // classes.push('above-dimmer');
    }

    let typeClass = 'modal';
    if (modal.flyout) {
      typeClass = `simple flyout ${modal.position}`;
      // typeClass = `simple flyout overlay ${modal.position}`;
    } else if (modal.lightbox) {
      typeClass = 'fullscreen lightbox';
    } else if (modal.takeover) {
      typeClass = 'side-by-side--takeover';
    }

    classes.push(typeClass);
    classes.push(modal.modalClass);

    if (modal.basic) {
      classes.push('basic');
    }

    classes.push(this.animationClasses);

    return classes.filter(Boolean).join(' ');
  }

  get openClasses() {
    const openClasses = [];
    if (this.args.modal.flyout) {
      openClasses.push('overlay visible');
    }
    return openClasses.join(' ');
  }

  get openingClasses() {
    const openingClasses = [];
    if (this.args.modal.flyout) {
      openingClasses.push('overlay visible');
    }
    return openingClasses.join(' ');
  }

  get closingClasses() {
    const closingClasses = [];
    if (this.args.modal.flyout) {
      closingClasses.push('overlay animating');
    }
    return closingClasses.join(' ');
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
  didInsertModalElement(element) {
    this.animatableElement = element;
    this.open();
  }

  @action
  didInsert(element) {
    this.args.modal.renderTo = element;
    this.args.modal.wrapper = this;
  }

  @action
  willDestroyElement() {
    this.args.modal.renderTo = null;
  }

  @action
  onHide() {
    this.close(this.args.modal?.onHide);
  }

  @action
  onPrimary() {
    this.close(this.args.modal?.onPrimary);
  }

  @action
  onSecondary() {
    this.close(this.args.modal?.onSecondary?.());
  }
}
