import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Modal extends Service {
  @tracked
  items = A();

  @tracked
  renderIndex = 0;

  @tracked
  pageDimmer;

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

  get nextDimmerIndex() {
    const currentDimmerIndex = this.dimmerIndex;
    const lastUnstackable = this.openModals
      .slice(0, currentDimmerIndex)
      .findLastIndex((item) => !item.stackable);
    if (lastUnstackable < 0) {
      return 0;
    }
    return lastUnstackable;
  }

  get activeModals() {
    if (!this.openModals.length) {
      return [];
    }
    return this.openModals.slice(this.dimmerIndex, this.openModals.length);
  }

  get inactiveModals() {
    if (!this.openModals.length) {
      return [];
    }
    return this.openModals.slice(0, this.dimmerIndex);
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

  get allModalsAreClosing() {
    return this.openModals.every((item) => item.wrapper?.isClosing);
  }

  get dimmerClass() {
    if (!this.openModals.length) {
      return null;
    }
    const dimmerClasses = ['visible active'];
    let baseClass = 'light';
    let animating = false;
    const closing = this.allModalsAreClosing;
    for (const item of this.activeModals) {
      if (item.dimmerType === 'dark') {
        baseClass = 'dark';
      }
      if (item.wrapper?.isAnimating) {
        animating = true;
      }
    }
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
    const inactiveModals = this.inactiveModals;
    const nextDimmerIndex = this.nextDimmerIndex - 1;
    for (let idx = 0; idx < inactiveModals.length; idx++) {
      if (idx > nextDimmerIndex) {
        inactiveModals[idx].wrapper?.closeDimmer();
      }
    }
    for (const item of this.activeModals) {
      if (item.dismissable) {
        item.wrapper?.onHide();
      }
    }
    if (this.allModalsAreClosing) {
      this.pageDimmer?.close();
    }
  }

  @action
  registerDimmer(dimmer) {
    this.pageDimmer = dimmer;
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
