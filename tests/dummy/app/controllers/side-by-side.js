import { A } from '@ember/array';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SideBySideController extends Controller {
  @service
  router;

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

  @action
  onSelect(item) {
    const animal = this.items.findBy('name', item.header);
    this.router.transitionTo('side-by-side.detail', animal);
  }
}
