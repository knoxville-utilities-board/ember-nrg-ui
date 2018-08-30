import Component from '@ember/component';
import layout from './template';
import {
  A,
} from '@ember/array';
import {
  computed,
  observer
} from '@ember/object';
import {
  bool,
  readOnly
} from '@ember/object/computed';
import {
  isEmpty
} from '@ember/utils';
import ArrayProxy from '@ember/array/proxy';

export default Component.extend({
  layout,

  classNames: ['ui', 'attached', 'segment', 'nrg-list'],

  classNameBindings: ['loading:disabled'],

  noResultsLabel: 'No Results',

  selectionType: '',

  selected: A([]),

  canSelect: bool('selectionType'),

  canShowActiveItem: computed('selected.[]', function() {
    const selected = this.get('selected');
    return !isEmpty(selected);
  }),

  init() {
    this._super(...arguments);
    const items = this.get('items');
    if (items) {
      this.get('_items').pushObjects(items.toArray && items.toArray() || items);
    }
  },

  _items: computed(function() {
    return new ArrayProxy({
      content: A(),
    });
  }),

  _start: readOnly('pageMeta.start'),

  _total: readOnly('pageMeta.total'),

  currentPage: computed('_start', 'selectedPageSize', function() {
    return (this.get('_start') / this.get('selectedPageSize')) + 1;
  }),

  totalPages: computed('selectedPageSize', '_total', function() {
    return Math.ceil(this.get('_total') / this.get('selectedPageSize'));
  }),

  canStepForward: computed('currentPage', 'totalPages', function() {
    return this.get('currentPage') < this.get('totalPages');
  }),

  itemsObserver: observer('items', function() {
    const items = this.get('items');
    const start = this.get('_start');
    if (!start) {
      this.set('_items', new ArrayProxy({
        content: A(),
      }));
    }
    this.get('_items').pushObjects(items.toArray && items.toArray() || items);
  }),

  actions: {
    select(item) {
      let selected = A([item]);
      if (!this.isSelectable(item)) {
        return;
      }
      const selectionType = this.get('selectionType');
      if (selectionType === 'multiple') {
        if (this.get('selected').includes(item)) {
          selected = A(this.get('selected').without(item));
        } else {
          selected = A(this.get('selected').concat(selected));
        }
      } else if (!selectionType) {
        return;
      }
      if (selectionType !== 'click') {
        this.set('selected', selected);
      }
      this.itemClicked(item, selected);
    },
    nextPage() {
      const pageSize = this.get('selectedPageSize');
      const start = this.get('pageMeta.start');
      this.changePage(start + pageSize);
    },
  },
});
