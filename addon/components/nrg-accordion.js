import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import objectHash, { stringHash } from 'ember-nrg-ui/utils/object-hash';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgAccordionComponent extends Component {
  @tracked
  activeItems = A();

  get mappedItems() {
    const items = this.args.items ?? [];
    const { activeItems, closeOnContentClick } = this;

    return items.map((item) => {
      const hash = stringHash(objectHash(item)).toString(36);
      const contentHash = closeOnContentClick ? hash : undefined;
      const active = activeItems.includes(hash);

      return { data: item, hash, contentHash, active };
    });
  }

  get classes() {
    const classes = ['ui'];

    if (this.basic) {
      classes.push('basic');
    }
    if (this.styled || this.basic) {
      classes.push('styled');
    }
    if (this.fluid) {
      classes.push('fluid');
    }
    if (this.args.class) {
      classes.push(this.args.class);
    }
    classes.push('accordion');

    return classes.join(' ');
  }

  get basic() {
    return this.args.basic === true;
  }

  get styled() {
    return this.args.styled === true;
  }

  get fluid() {
    return this.args.fluid === true;
  }

  get icon() {
    return this.args.icon ?? 'dropdown';
  }

  get rightIcon() {
    return this.args.rightIcon === true;
  }

  get iconClass() {
    const classes = [];

    classes.push(this.icon);
    if (this.rightIcon) {
      classes.push('right');
    }
    classes.push('icon');

    return classes.join(' ');
  }

  get exclusive() {
    return this.args.exclusive !== false;
  }

  get forceOpen() {
    return this.args.forceOpen === true;
  }

  get closeOnContentClick() {
    return this.args.contentClickable !== true;
  }

  openItem(item) {
    this.activeItems.pushObject(item.hash);

    this.args.onOpen?.(item.data);
  }

  closeItem(item) {
    this.activeItems.removeObject(item.hash);

    this.args.onClose?.(item.data);
  }

  @action
  clickItem({ srcElement }) {
    const clickedElement = srcElement.closest('[data-accordion-hash]');
    const clickedHash =
      clickedElement?.attributes['data-accordion-hash']?.value;
    if (!clickedElement && !clickedHash) {
      return;
    }
    const { exclusive, forceOpen, activeItems, mappedItems } = this;
    const clickedItem = mappedItems.find((i) => i.hash === clickedHash);
    const currentlyOpen = mappedItems.filter((mappedItem) =>
      activeItems.includes(mappedItem.hash)
    );

    const closingOnlyOpenItem =
      currentlyOpen.length === 1 && clickedItem.hash === currentlyOpen[0].hash;

    if (closingOnlyOpenItem && forceOpen) {
      return;
    }

    if (exclusive) {
      for (const openItem of currentlyOpen) {
        this.closeItem(openItem);
      }
      if (!clickedItem.active) {
        this.openItem(clickedItem);
      }
    } else if (clickedItem.active) {
      this.closeItem(clickedItem);
    } else {
      this.openItem(clickedItem);
    }

    this.args.onClick?.(clickedItem.data);
  }

  @action
  updateOpenItems(element, [_openItems]) {
    const openItems = _openItems ?? [];
    const { activeItems, mappedItems } = this;
    const openItemHashes = openItems.map((i) => mappedItems[i].hash);

    activeItems.clear();
    activeItems.pushObjects(openItemHashes);
  }
}
