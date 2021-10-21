import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import ResizeMixin from 'ember-nrg-ui/mixins/resize';
import layout from './template';

export default Component.extend(ResizeMixin, {
  layout,

  isLargeScreen: alias('responsive.isComputerScreenGroup'),

  didResize() {
    if (this.isOpen && this.isLargeScreen) {
      this.set('isOpen', false);
    }
  },

  clickedLink(item) {
    this.set('isOpen', false);
    if (this.clickedSidebarItem) {
      this.clickedSidebarItem(item);
    }
  },
});
