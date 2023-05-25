import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FlyoutService extends Service {
  @tracked
  items = A();

  @tracked
  renderIndex = 0;

  @tracked
  activeIsTransitioning = false;

  get openFlyouts() {
    return A(
      this.items
        ?.filter((item) => !item.renderInPlace && item.args.isOpen)
        ?.sort((a, b) =>
          a.priority == b.priority
            ? a.renderIndex - b.renderIndex
            : a.priority - b.priority
        )
    );
  }

  get activeFlyout() {
    if (this.openFlyouts?.length === 1) {
      return this.openFlyouts?.firstObject;
    }
    return this.openFlyouts?.findLast((item) => !item.closing);
  }

  get hasOpenFlyouts() {
    return this.openFlyouts?.length;
  }

  get allOpenFlyoutsAreClosing() {
    return this.openFlyouts?.length === 1 && this.activeFlyout?.closing;
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
