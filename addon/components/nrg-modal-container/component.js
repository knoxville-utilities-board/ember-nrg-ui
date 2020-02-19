import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, bool, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',
  modalService: service('modal'),
  openModals: alias('modalService.items'),
  hasOpenModals: bool('openModals.length'),
  sidebarItems: filterBy('openModals', 'sidebar', true),
  hasSidebar: bool('sidebarItems.length'),

  _containerClass: computed('hasOpenModals', 'hasSidebar', function() {
    let appliedClass = '';
    if(this.hasOpenModals){
      appliedClass += ' visible active';
    } else {
      appliedClass += ' hidden';
    }
    if (this.hasSidebar) {
      appliedClass += ' sidebar-container';
    }
    return appliedClass;
  }),
});
