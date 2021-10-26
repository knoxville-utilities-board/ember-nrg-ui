import Component from '@ember/component';
import layout from '../../templates/components/nrg-list/items';
import { A } from '@ember/array';
import { computed, observer } from '@ember/object';
import { bool, readOnly } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import ArrayProxy from '@ember/array/proxy';

function createArrayProxy(content) {
  if (ArrayProxy.create) {
    return ArrayProxy.create({
      content,
    });
  }
  return new ArrayProxy({
    content,
  });
}

export default Component.extend({
  layout,

  classNames: ['ui', 'attached', 'segment', 'nrg-list'],

  classNameBindings: ['loading:disabled'],

  noResultsLabel: 'No Results',

  selectionType: '',

  selected: A([]),

  canSelect: bool('selectionType'),

  canShowActiveItem: computed('selected.[]', function() {
    const selected = this.selected;
    return !isEmpty(selected);
  }),

  init() {
    this._super(...arguments);
    const items = this.items;
    if (items) {
      this._items.pushObjects((items.toArray && items.toArray()) || items);
    }
  },

  _items: computed(function() {
    return createArrayProxy(A());
  }),

  _start: readOnly('pageMeta.start'),

  _total: readOnly('pageMeta.total'),

  currentPage: computed('_start', 'selectedPageSize', function() {
    return this._start / this.selectedPageSize + 1;
  }),

  totalPages: computed('selectedPageSize', '_total', function() {
    return Math.ceil(this._total / this.selectedPageSize);
  }),

  canStepForward: computed('currentPage', 'totalPages', function() {
    return this.currentPage < this.totalPages;
  }),

  itemsObserver: observer('items', function() {
    const items = this.items;
    const start = this._start;
    if (!start) {
      this.set('_items', createArrayProxy(A()));
    }
    this._items.pushObjects((items.toArray && items.toArray()) || items);
  }),

  actions: {
    select(item) {
      let selected = A([item]);
      if (!this.isSelectable(item)) {
        return;
      }
      const selectionType = this.selectionType;
      if (selectionType === 'multiple') {
        if (this.selected.includes(item)) {
          selected = A(this.selected.without(item));
        } else {
          selected = A(this.selected.concat(selected));
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
      const pageSize = this.selectedPageSize;
      const start = this.get('pageMeta.start');
      this.changePage(start + pageSize);
    },
  },
});
