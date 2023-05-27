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

  @action
  didInsert(element) {
    this.animatableElement = element;
    this.open();
  }

  @action
  onClick() {
    this.args.onClick?.();
    this.close();
  }
}
