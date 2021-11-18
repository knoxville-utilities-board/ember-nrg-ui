import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Modifier from 'ember-modifier';

export default class OnClickOutsideModifier extends Modifier {
  guid = guidFor(this);

  get callback() {
    return this.args.positional[0];
  }
  get disabled() {
    return this.args.named?.disabled;
  }

  didInstall() {
    this.element.dataset.clickHandler = this.guid;
    document.documentElement.addEventListener('click', this.clickHandler, true);
  }

  willRemove() {
    delete this.element.dataset.clickHandler;
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
