import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/nrg-dropdown/sub-menu';

export default Component.extend({
  layout,
  classNames: ['item'],
  classNameBindings: ['disabled', 'active'],
  attributeBindings: ['data-dropdown-item'],
  dataDropdownItem: 'true',
  isOpen: false,
  menuClass: computed('menuDirection', 'isOpen', function() {
    let computedClasses = '';
    if (this.menuDirection) {
      computedClasses += ` ${this.menuDirection}`;
    }
    if (this.isOpen) {
      computedClasses += ' transition visible';
    } else {
      computedClasses += ' transition hidden';
    }
    return computedClasses;
  }),
  mouseEnter() {
    this.set('isOpen', true);
  },
  mouseLeave() {
    this.set('isOpen', false);
  },
  _onSelect() {
    // Implemented by dropdown
  },
});
