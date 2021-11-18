import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OnResizeModifier extends Modifier {
  @service resizeObserver;

  get callback() {
    return this.args.positional[0];
  }

  didInstall() {
    this.resizeObserver.observe(this.element, this.handleResize);
  }

  willRemove() {
    this.resizeObserver.unobserve(this.element, this.handleResize);
  }

  @action
  handleResize() {
    this.callback(...arguments);
  }
}
