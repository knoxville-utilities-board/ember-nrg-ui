import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import Modifier from 'ember-modifier';

export default class OnClickOutsideModifier extends Modifier {
  @tracked
  _element;

  @tracked
  callback;

  @tracked
  named;

  guid = guidFor(this);

  get disabled() {
    return this.named?.disabled;
  }

  modify(element, positional, named) {
    this._element = element;
    this.callback = positional[0];
    this.named = named;

    element.dataset.clickHandler = this.guid;
    document.documentElement.addEventListener('click', this.clickHandler, true);
  }

  willRemove() {
    delete this._element.dataset.clickHandler;
    document.documentElement.removeEventListener(
      'click',
      this.clickHandler,
      true
    );
  }

  @action
  clickHandler(evt) {
    const foundTargetInWrapper = evt.target.closest(
      `[data-click-handler=${this.guid}]`
    );
    if (!foundTargetInWrapper && !this.disabled) {
      this.callback(...arguments);
    }
    return false;
  }
}
