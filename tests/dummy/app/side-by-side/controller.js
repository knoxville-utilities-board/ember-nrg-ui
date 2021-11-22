import { A } from '@ember/array';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SideBySideController extends Controller {
  @service
  router;

  @tracked
  items = A([
    {
      animal: 'rabbit',
      name: 'Alfred',
      gender: 'male',
    },
    {
      animal: 'rabbit',
      name: 'Betty',
      gender: 'female',
    },
    {
      animal: 'dog',
      name: 'Bobby',
      gender: 'male',
    },
    {
      animal: 'dog',
      name: 'Harley',
      gender: 'female',
    },
    {
      animal: 'cat',
      name: 'Sam',
      gender: 'male',
    },
    {
      animal: 'cat',
      name: 'Sally',
      gender: 'female',
    },
    {
      animal: 'cat',
      name: 'Sally',
      gender: 'female',
    },
    {
      animal: 'cat',
      name: 'Sally',
      gender: 'female',
    },
    {
      animal: 'cat',
      name: 'Sally',
      gender: 'female',
    },
    {
      animal: 'cat',
      name: 'Sally',
      gender: 'female',
    },
    {
      animal: 'cat',
      name: 'Sally',
      gender: 'female',
    },
    {
      animal: 'cat',
      name: 'Sally',
      gender: 'female',
    },
    {
      animal: 'cat',
      name: 'Sally',
      gender: 'female',
    },
    {
      animal: 'cat',
      name: 'Sally',
      gender: 'female',
    },
  ]);

  get mappedItems() {
    return this.items.map((item) => {
      return {
        header: item.name,
        meta: item.gender,
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

  onSelect(item) {
    const animal = this.items.findBy('name', item.header);
    this.router.transitionTo('side-by-side.detail', animal);
  }
}
