import { action } from '@ember/object';
import NrgAnimatableComponent from 'ember-nrg-ui/components/nrg-animatable';

export default class NrgDimmerComponent extends NrgAnimatableComponent {
  get dimmerClasses() {
    const dimmerClasses = ['dimmer'];

    if (this.args.visible) {
      dimmerClasses.push('visible');
    }
    dimmerClasses.push(this.animationClasses);

    return dimmerClasses.filter(Boolean).join(' ');
  }

  get openClasses() {
    return this.args.shading;
  }

  get openingClasses() {
    return this.args.shading;
  }

  constructor() {
    super(...arguments);
    this.args.onRegister?.(this);
  }

  @action
  didInsert(element) {
    this.animatableElement = element;
    this.open();
  }

  @action
  maybeShow(_, [visible]) {
    // debugger;
    if (visible && !this.isOpen && !this.isOpening) {
      this.open();
    }
  }

  @action
  onClick() {
    this.args.onClick?.();
  }
}
