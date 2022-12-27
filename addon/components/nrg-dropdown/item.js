import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/nrg-dropdown/item';

export default Component.extend({
  layout,
  tagName: '',
  active: computed('index', 'activeItem', function() {
    return this.index == this.activeItem && this.activeItem != undefined;
  }),
  _onClick(option) {
    if (this.onSelect) {
      this.onSelect(option);
      this._onSelect();
    } else if (option) {
      this._onSelect(option);
    }
  },
  _onSelect() {
    // Implemented by menu
  },
  // onSelect() implemented by user
});
