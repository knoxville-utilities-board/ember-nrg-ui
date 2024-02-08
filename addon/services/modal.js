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

  // This was written with findLastIndex but caused issues with old versions of safari on Ipad
  get dimmerIndex() {
    let lastUnstackable = -1;
    for (let i = this.openModals.length - 1; i >= 0; i--) {
      if (!this.openModals[i].stackable) {
        lastUnstackable = i;
        break;
      }
    }
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

  get dimmerClass() {
    if (!this.openModals.length) {
      return null;
    }
    const baseClass = this.openModals.some((i) => i.dimmerType === 'dark')
      ? 'dark'
      : 'light';
    const dismissableClass = this.dimmerClickable ? '' : 'not-dismissable';
    return `${baseClass} ${dismissableClass}`;
  }

  @action
  onDimmerClick() {
    for (const item of this.activeModals) {
      if (item.dismissable) {
        item.onHide();
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
