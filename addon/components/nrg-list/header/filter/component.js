import Component from '@ember/component';
import layout from './template';
import { observer } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['right', 'item'],
  defaultText: 'Select a Filter',
  direction: 'down',
  dropdownClass: 'floating',
  menuDirection: 'left',

  selectedFilter: null,

  init() {
    this._super(...arguments);
    this.handleChangedFilter(false);
  },

  selectedObserver: observer('selectedFilter', function() {
    this.handleChangedFilter();
  }),

  handleChangedFilter(sendFalsyValue = true) {
    const filterParam = this.filterParam;
    const selectedFilter = this.selectedFilter;
    const shouldSendFalsyValue = selectedFilter || sendFalsyValue;
    if (filterParam && shouldSendFalsyValue) {
      this.changed(filterParam, selectedFilter);
    }
  },
});
