import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class OnResizeModifier extends Modifier {
  @service resizeObserver;

  @tracked
  _element;

  @tracked
  positional;

  @tracked
  named;

  get callback() {
    return this.positional[0];
  }

  modify(element, positional, named) {
    this._element = element;
    this.positional = positional;
    this.named = named;

    this.resizeObserver.observe(this._element, this.handleResize);
  }

  willRemove() {
    this.resizeObserver.unobserve(this._element, this.handleResize);
  }

  @action
  handleResize() {
    this.callback(...arguments);
  }
}
