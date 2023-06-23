import Component from '@glimmer/component';
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
];

export default class FreestyleListComponent extends Component {
  @tracked
  filters = defaultFilters;

  @tracked
  query = {};

  @tracked
  pageStart = 0;

  @tracked
  selectedPageSize = 2;

  selectionTypeOptions = ['', 'single', 'multiple'];

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
          item.name.toLowerCase().indexOf(query.search?.toLowerCase()) !== -1;
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
        meta: item.meta,
        extra: item.animal,
      };
    });
  }

  get pagedItems() {
    const start = this.pageStart;
    const count = this.selectedPageSize || this.filteredItems.length;
    const items = this.filteredItems.slice(0, start + count);
    items.meta = {
      start,
      count,
      total: this.filteredItems.length,
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
