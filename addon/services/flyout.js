import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FlyoutService extends Service {
  @tracked
  items = A();

  @tracked
  renderIndex = 0;

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
    return this.openFlyouts?.lastObject;
  }

  get hasOpenFlyouts() {
    return this.openFlyouts?.length;
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
