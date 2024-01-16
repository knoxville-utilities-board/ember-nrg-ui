import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

import type Service from '@ember/service';

interface ResizeObserverService extends Service {
  observe(element: HTMLElement, callback: (...args: unknown[]) => void): void;
  unobserve(element: HTMLElement, callback: (...args: unknown[]) => void): void;
}

declare module '@ember/service' {
  interface Registry {
    'resize-observer': ResizeObserverService;
  }
}

type Args = {
  Positional: [(...args: unknown[]) => void];
};

export default class OnResizeModifier extends Modifier<Args> {
  @service
  declare resizeObserver: ResizeObserverService;

  @tracked
  callback?: (...args: unknown[]) => void;

  modify(element: HTMLElement, positional: [(...args: unknown[]) => void]) {
    this.callback = positional[0];

    registerDestructor(this, () => {
      this.resizeObserver.unobserve(element, this.handleResize);
    });

    this.resizeObserver.observe(element, this.handleResize);
  }

  @action
  handleResize(...args: unknown[]) {
    assert('You must pass a function to the on-resize modifier', this.callback);
    this.callback(...args);
  }
}
