import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Modal extends Service {
  @tracked
  items = A();

  @tracked
  renderIndex = 0;

  get openModals() {
    return this.items
      ?.filter((item) => !item.renderInPlace && item.args.isOpen)
      ?.sort((a, b) =>
        a.priority == b.priority
          ? a.renderIndex - b.renderIndex
          : a.priority - b.priority
      );
  }

  get dimmerIndex() {
    const lastUnstackable = this.openModals.findLastIndex(
      (item) => !item.stackable
    );
    if (lastUnstackable === -1) {
      return 0;
    }
    if (lastUnstackable === this.openModals.length - 1) {
      return lastUnstackable;
    }
    return lastUnstackable + 1;
  }

  get activeModals() {
    if (!this.openModals.length) {
      return [];
    }
    return this.openModals.slice(this.dimmerIndex, this.openModals.length);
  }

  get modalRenderList() {
    if (!this.openModals.length) {
      return [];
    }
    const modalRenderList = this.openModals.slice();
    modalRenderList.splice(this.dimmerIndex, 0, 'dimmer');
    return modalRenderList;
  }

  get hasOpenModals() {
    return this.openModals.length;
  }

  get dimmerClickable() {
    return this.activeModals.some((item) => item.dismissable);
  }

  get dimmerType() {
    if (this.activeModals.some((item) => item.dimmerType === 'dark')) {
      return 'dark';
    }
    return 'light';
  }

  get dimmerClass() {
    if (!this.openModals.length) {
      return null;
    }
    const dimmerClasses = ['visible active'];
    let baseClass = 'light';
    let animating = false;
    let closing = false;
    for (const item of this.activeModals) {
      if (item.dimmerType === 'dark') {
        baseClass = 'dark';
      }
      if (item.wrapper?.isAnimating) {
        animating = true;
      }
      if (item.wrapper?.isClosing) {
        closing = true;
      }
    }
    // dimmerClasses.push(c ? 'animating' : baseClass);
    if (!closing) {
      dimmerClasses.push(baseClass);
    }
    if (animating) {
      dimmerClasses.push('animating');
    }
    if (!this.dimmerClickable) {
      dimmerClasses.push('not-dismissable');
    }
    return dimmerClasses.join(' ');
  }

  @action
  onDimmerClick() {
    for (const item of this.activeModals) {
      if (item.dismissable) {
        item.wrapper?.onHide();
      }
    }
  }

  @action
  add(item) {
    this.items.pushObject(item);
    item.renderIndex = this.renderIndex;
    this.renderIndex++;
  }

  @action
  remove(item) {
    this.items.removeObject(item);
  }
}
