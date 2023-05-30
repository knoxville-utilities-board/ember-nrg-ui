import { action } from '@ember/object';
import NrgComponentAnimatable from 'ember-nrg-ui/components/nrg-animatable';

export default class NrgDimmerComponent extends NrgComponentAnimatable {
  get shading() {
    return this.args.shading ?? 'dark';
  }

  get openClasses() {
    return 'active';
  }

  get openingClasses() {
    return 'active';
  }

  get dimmerClasses() {
    const dimmerClasses = [`ui ${this.shading} nrg-dimmer`];

    if (this.args.dismissable) {
      dimmerClasses.push('dismissable');
    }
    dimmerClasses.push(this.animationClasses);

    return dimmerClasses.join(' ');
  }

  @action
  didInsert(element) {
    this.animatableElement = element;
  }

  @action
  maybeShowDimmer() {
    const { visible } = this.args;
    if (visible && !(this.isOpen || this.isOpening)) {
      this.open();
      return;
    }
    if (!visible && !(this.isClosed || this.isClosing)) {
      this.close();
    }
  }

  @action
  onClick() {
    if (this.args.dismissable) {
      this.args.onClick?.();
    }
  }
}
