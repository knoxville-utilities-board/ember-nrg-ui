import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Controller.extend({
  items: A([
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
  ]),

  mappedItems: computed('items', function() {
    return this.items.map(item => {
      return {
        header: item.name,
        meta: item.gender,
        extra: item.animal,
      };
    });
  }),

  pageMeta: computed('items', function() {
    return {
      start: 0,
      count: this.get('items.length'),
      total: this.get('items.length'),
    };
  }),

  onSelect(item) {
    const animal = this.items.findBy('name', item.header);
    this.transitionToRoute('master-detail.detail', animal);
  },
});
