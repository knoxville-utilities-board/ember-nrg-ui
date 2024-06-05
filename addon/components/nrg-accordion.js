import NrgValidationComponent from 'ember-nrg-ui/components/nrg-validation-component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import objectHash, { stringHash } from 'ember-nrg-ui/utils/object-hash';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgAccordionComponent extends NrgValidationComponent {
  @tracked
  activeItems = A();

  get model() {
    return this.args.model ?? this;
  }

  get valuePath() {
    return this.args.valuePath ?? 'activeItems';
  }

  get mappedItems() {
    const items = this.args.items ?? [];
    const { value, closeOnContentClick } = this;

    return items.map((item) => {
      const hash = stringHash(objectHash(item)).toString(36);
      const contentHash = closeOnContentClick ? hash : undefined;
      const active = value.includes(item);

      return { item, hash, contentHash, active };
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

  getDefaultValue() {
    return A();
  }

  openItem(data) {
    this.value.pushObject(data.item);

    this.onChange(this.value);
    this.args.onOpen?.(data.item);
  }

  closeItem(data) {
    this.value.removeObject(data.item);

    this.onChange(this.value);
    this.args.onClose?.(data.item);
  }

  @action
  clickItem({ srcElement }) {
    const clickedElement = srcElement.closest('[data-accordion-hash]');
    const clickedHash =
      clickedElement?.attributes['data-accordion-hash']?.value;
    if (!clickedElement && !clickedHash) {
      return;
    }
    const { exclusive, forceOpen, value, mappedItems } = this;
    const clickedItem = mappedItems.find((i) => i.hash === clickedHash);
    const currentlyOpen = mappedItems.filter((mappedItem) =>
      value.includes(mappedItem.item)
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

    this.args.onClick?.(clickedItem.item);
  }
}
