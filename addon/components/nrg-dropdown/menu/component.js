import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',
  subMenu: false,
  scrollable: false,
  scrollableClass: computed('scrollable', function() {
    if (this.scrollable) {
      return 'scrollable';
    }
    return '';
  }),
  _onSelect() {
    // Implemented by dropdown
  },
});
