import Component from '@ember/component';
import {
  isBlank,
} from '@ember/utils';
import layout from './template';
import ContextMenuMixin from 'ember-nrg-ui/mixins/context-menu';
import {
  next
} from '@ember/runloop'

const contextItems = [{
  label: 'Refresh',
  actionName: 'refresh',
  iconClass: 'refresh',
}];

const DEFAULT_PAGE_SIZE = 25;

export default Component.extend(ContextMenuMixin, {
  layout,

  tagName: '',

  hasRefreshContextItem: true,

  filters: null,

  filterParam: null,

  searchString: '',

  searchParam: '',

  selectedPageSize: DEFAULT_PAGE_SIZE,

  selectionType: '',

  init() {
    if (this.get('hasRefreshContextItem')) {
      this.contextItems = contextItems;
    }
    this._super(...arguments);
  },

  updateQuery(actionName = 'query') {
    const query = {};
    const searchParam = this.get('searchParameter') || 'search';
    const searchString = this.get('searchString');
    const selectedFilterValue = this.get('selectedFilter.value');
    const filterParam = this.get('filterParam');

    if (!isBlank(searchString)) {
      query[searchParam] = searchString;
    }

    if (!isBlank(selectedFilterValue) && !isBlank(filterParam)) {
      query[this.get('filterParam')] = selectedFilterValue;
    }

    next(() => {
      this.sendAction(actionName, query);
    });
  },

  actions: {
    filterChanged(filterParam, selectedFilter) {
      this.setProperties({
        filterParam,
        selectedFilter,
      });
      this.updateQuery();
    },
    searchChanged(searchString) {
      this.set('searchString', searchString);
      this.updateQuery();
    },
    refresh() {
      this.updateQuery('refresh');
    },
    itemClicked(item) {
      this.sendAction('select', item);
    },
    changePage(start) {
      this.sendAction('changePage', start);
    },
  },
});
