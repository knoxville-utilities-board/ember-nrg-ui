import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { next } from '@ember/runloop';

export const OPENING = 0;
export const OPEN = 1;
export const CLOSING = 2;
export const CLOSED = 3;

export default class NrgAnimatableComponent extends Component {
  @tracked
  animationState;

  @tracked
  animatableElement;

  @tracked
  openedEvent = 'transitionend';

  @tracked
  closedEvent = 'transitionend';

  constructor() {
    super(...arguments);
    this.animationState = CLOSED;
  }

  get isOpening() {
    return this.animationState === OPENING;
  }

  get openingClasses() {
    return 'opening';
  }

  get isOpen() {
    return this.animationState === OPEN;
  }

  get openClasses() {
    return 'open';
  }

  get isClosing() {
    return this.animationState === CLOSING;
  }

  get closingClasses() {
    return 'closing';
  }

  get isClosed() {
    return this.animationState === CLOSED;
  }

  get closedClasses() {
    return 'closed';
  }

  get isAnimating() {
    return this.isOpening || this.isClosing;
  }

  get animationClasses() {
    switch (this.animationState) {
      case OPENING:
        return this.openingClasses ?? '';
      case OPEN:
        return this.openClasses ?? '';
      case CLOSING:
        return this.closingClasses ?? '';
      case CLOSED:
        return this.closedClasses ?? '';
      default:
        return '';
    }
  }

  @action
  open() {
    next(() => {
      this.animatableElement?.addEventListener(this.openedEvent, this.didOpen);
      this.animationState = OPENING;
    });
  }

  @action
  didOpen(event) {
    if (event?.target !== this.animatableElement) {
      return;
    }
    this.animationState = OPEN;
    this.animatableElement?.removeEventListener(this.openedEvent, this.didOpen);
  }

  @action
  close(callback) {
    this.animatableElement?.addEventListener(
      this.closedEvent,
      () => {
        this.didClose();
        callback?.();
      },
      { once: true }
    );
    this.animationState = CLOSING;
  }

  @action
  didClose() {
    this.animationState = CLOSED;
  }
}
