import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';

type Args = {
  Positional: [(...args: unknown[]) => void];
};

export default class OnClickOutsideModifier extends Modifier<Args> {
  @tracked
  callback?: (...args: unknown[]) => void;

  @tracked
  named?: { disabled: boolean };

  guid = guidFor(this);

  get disabled() {
    return this.named?.['disabled'];
  }

  modify(
    element: HTMLElement,
    positional: [(...args: unknown[]) => void],
    named: { disabled: boolean }
  ) {
    this.callback = positional[0];
    this.named = named;

    registerDestructor(this, () => {
      delete element.dataset['clickHandler'];
      document.documentElement.removeEventListener(
        'click',
        this.clickHandler,
        true
      );
    });

    element.dataset['clickHandler'] = this.guid;
    document.documentElement.addEventListener('click', this.clickHandler, true);
  }

  @action
  clickHandler(evt: MouseEvent, ...args: unknown[]) {
    const eventTarget: HTMLElement = evt.target as unknown as HTMLElement;
    const foundTargetInWrapper = eventTarget?.closest(
      `[data-click-handler=${this.guid}]`
    );
    if (!foundTargetInWrapper && !this.disabled) {
      this.callback?.(evt, ...args);
    }
    return false;
  }
}
