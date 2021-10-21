import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import layout from './template';
import ContextMenuMixin from 'ember-nrg-ui/mixins/context-menu';
import { next } from '@ember/runloop';

const contextItems = [
  {
    label: 'Refresh',
    actionName: 'signalRefresh',
    iconClass: 'refresh',
  },
];

const DEFAULT_PAGE_SIZE = 25;

export default Component.extend(ContextMenuMixin, {
  layout,

  tagName: '',

  hasRefreshContextItem: true,

  filters: null,

  filterParam: null,

  searchString: '',

  searchParameter: '',

  selectedPageSize: DEFAULT_PAGE_SIZE,

  selectionType: '',

  init() {
    if (this.hasRefreshContextItem) {
      this.contextItems = contextItems;
    }
    this._super(...arguments);
  },

  updateQuery(actionName = 'query') {
    const query = {};
    const searchParam = this.searchParameter || 'search';
    const searchString = this.searchString;
    const selectedFilterValue = this.get('selectedFilter.value');
    const filterParam = this.filterParam;

    if (!isBlank(searchString)) {
      query[searchParam] = searchString;
    }

    if (!isBlank(selectedFilterValue) && !isBlank(filterParam)) {
      query[this.filterParam] = selectedFilterValue;
    }

    next(() => {
      this.sendAction(actionName, query);
    });
  },

  isSelectable(/* item */) {
    return true;
  },

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

  onItemSelect(item) {
    this.sendAction('select', item);
  },

  onChangePage(start) {
    this.sendAction('changePage', start);
  },

  actions: {
    signalRefresh() {
      this.updateQuery('refresh');
    }
  }
});
