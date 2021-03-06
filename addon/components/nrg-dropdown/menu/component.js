import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',
  subMenu: false,
  scrollable: false,
  scrollableClass: computed('scrollable', function() {
    return this.scrollable ? 'scrollable' : '';
  }),
  _onSelect() {
    // Implemented by dropdown
  },
});
