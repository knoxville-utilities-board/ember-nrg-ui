import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class FreestyleNrgSideBySideComponent extends Component {
  @tracked
  items = A([
    {
      animal: 'rabbit',
      name: 'Alfred',
      meta: 'type 1',
    },
    {
      animal: 'rabbit',
      name: 'Betty',
      meta: 'type 2',
    },
    {
      animal: 'dog',
      name: 'Bobby',
      meta: 'type 1',
    },
    {
      animal: 'dog',
      name: 'Harley',
      meta: 'type 2',
    },
    {
      animal: 'cat',
      name: 'Sam',
      meta: 'type 1',
    },
    {
      animal: 'cat',
      name: 'Sally',
      meta: 'type 2',
    },
    {
      animal: 'cat',
      name: 'Sally',
      meta: 'type 2',
    },
    {
      animal: 'cat',
      name: 'Sally',
      meta: 'type 2',
    },
    {
      animal: 'cat',
      name: 'Sally',
      meta: 'type 2',
    },
    {
      animal: 'cat',
      name: 'Sally',
      meta: 'type 2',
    },
    {
      animal: 'cat',
      name: 'Sally',
      meta: 'type 2',
    },
    {
      animal: 'cat',
      name: 'Sally',
      meta: 'type 2',
    },
    {
      animal: 'cat',
      name: 'Sally',
      meta: 'type 2',
    },
    {
      animal: 'cat',
      name: 'Sally',
      meta: 'type 2',
    },
  ]);

  get mappedItems() {
    return this.items.map((item) => {
      return {
        header: item.name,
        meta: item.meta,
        extra: item.animal,
      };
    });
  }

  get pageMeta() {
    return {
      start: 0,
      count: this.items.length,
      total: this.items.length,
    };
  }

  @tracked
  selectedItem;

  @action
  onSelect(item) {
    const animal = this.items.findBy('name', item.header);
    this.selectedItem = animal;
  }
}
