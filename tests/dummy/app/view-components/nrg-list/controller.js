import Controller from '@ember/controller';
import { A } from '@ember/array';
import { reads } from '@ember/object/computed';
import { computed } from '@ember/object';
import { debug } from '@ember/debug';

export default Controller.extend({
  filters: A([
    {
      label: 'Rabbits',
      value: 'rabbit',
    },
    {
      label: 'Dogs',
      value: 'dog',
    },
    {
      label: 'Cats',
      value: 'cat',
    },
    {
      label: 'This is a very long filter name that also filters by Cats.',
      value: 'cat',
    },
  ]),

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
  ]),

  groupHeaderHandler(item) {
    return item.header.substr(0, 1);
  },

  filteredItems: computed('items', 'query', function() {
    const query = this.query || {};
    let items = this.items;
    if (!query.search && !query.animal) {
      return items;
    }
    items = items.filter(item => {
      let include = true;
      if (query.animal) {
        include = item.animal === query.animal;
      }
      if (query.search) {
        include = include && item.name.toLowerCase().indexOf(query.search.toLowerCase()) !== -1;
      }
      return include;
    });
    items.meta = {
      start: 0,
      count: items.length,
      total: items.length,
    };
    return items;
  }),

  mappedItems: computed('items', function() {
    return this.items.map(item => {
      return {
        header: item.name,
        meta: item.gender,
        extra: item.animal,
      };
    });
  }),

  pageStart: 0,

  pageItems: computed('mappedItems', 'pageStart', function() {
    const start = this.pageStart;
    const count = 2;
    const items = this.mappedItems.slice(start, start + count);
    items.meta = {
      start,
      count,
      total: this.get('mappedItems.length'),
    };
    return items;
  }),

  selectedFilter: reads('filters.firstObject'),

  actions: {
    query(query) {
      this.set('query', query);
    },
    select() {
      debug('item selected');
    },
  },
});
