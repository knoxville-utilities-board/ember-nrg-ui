import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',
  popupClass: computed('targetAttachment', function() {
    if (this.targetAttachment) {
      return this.targetAttachment.replace('middle', 'center');
    }
  }),
  popupContainer: computed(function() {
    return document.querySelector('#popup-container');
  }),
  onMouseEnter() {
    // implement
  },
  onMouseLeave() {
    // implement
  },
});
