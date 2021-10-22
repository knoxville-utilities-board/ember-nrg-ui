import Component from '@ember/component';
import layout from '../templates/components/nrg-sidebar-menu-item';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  tagName: '',

  isVisible: readOnly('item.isShownInSidebar'),

  isParentGroup: false,

  _linkToItemClass: computed('isParentGroup', function() {
    return this.isParentGroup ? 'parent-route' : 'item';
  }),
});
