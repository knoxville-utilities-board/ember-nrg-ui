import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',
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
