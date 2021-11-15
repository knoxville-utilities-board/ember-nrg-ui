import Controller from '@ember/controller';
import { debug } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const defaultFilters = [
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
];

const defaultList = [
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
];

export default class ViewComponentsNrgFormsController extends Controller {
  @tracked
  filters = defaultFilters;

  @tracked
  query = {};

  @tracked
  pageStart = 0;

  get filteredItems() {
    let items = defaultList;
    const query = this.query || {};
    if (!this.query?.search && !this.query?.animal) {
      return items;
    }
    items = items.filter((item) => {
      let include = true;
      if (query.animal) {
        include = item.animal === query.animal;
      }
      if (query.search) {
        include =
          include &&
          item.name.toLowerCase().indexOf(query.search?.toLowerCase()) !==
            -1;
      }
      return include;
    });
    items.meta = {
      start: 0,
      count: items.length,
      total: items.length,
    };
    return items;
  }

  get mappedItems() {
    return defaultList.map((item) => {
      return {
        header: item.name,
        meta: item.gender,
        extra: item.animal,
      };
    });
  }

  get pageItems() {
    const start = this.pageStart;
    const count = 2;
    const items = this.mappedItems.slice(0, start + count);
    items.meta = {
      start,
      count,
      total: this.mappedItems.length,
    };
    return items;
  }

  @action
  groupHeaderHandler(item) {
    return item.header.substr(0, 1);
  }

  @action
  onQuery(query) {
    this.query = query;
  }

  @action
  onItemSelect() {
    debug('item selected', ...arguments);
  }

  @action
  onChangePage(pageStart) {
    this.pageStart = pageStart;
  }
}
