import Component from '@ember/component';
import { computed } from '@ember/object';
import { bool, filterBy, readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',

  modalService: service('modal'),

  openModals: readOnly('modalService.openModals'),
  activeModal: readOnly('modalService.activeModal'),

  hasOpenModals: computed(
    'openModals.@each.{isOpen,renderInPlace}',
    function() {
      let hasOpenModals = false;
      this.openModals.forEach(openModal => {
        if (openModal.isOpen && !openModal.renderInPlace) {
          hasOpenModals = true;
        }
      });
      return hasOpenModals;
    }
  ),

  sidebarItems: filterBy('openModals', 'sidebar', true),

  hasSidebar: bool('sidebarItems.length'),

  _containerClass: computed('hasOpenModals', 'hasSidebar', function() {
    let appliedClass = '';
    if (this.hasOpenModals) {
      appliedClass += ' visible active';
    } else {
      appliedClass += ' hidden';
    }
    if (this.hasSidebar) {
      appliedClass += ' sidebar-container';
    }
    return appliedClass;
  }),

  dimmerClass: computed(
    'activeModal.sidebar',
    'activeModal.dimmerClass',
    'activeModal.dismissable',
    function() {
      const activeModal = this.activeModal;
      if (!activeModal) {
        return '';
      }
      let appliedClass = '';
      if (activeModal.sidebar) {
        appliedClass += ' sidebar-dimmer';
      } else {
        appliedClass += ' page';
      }
      if (!activeModal.dismissable) {
        appliedClass += ' not-dismissable';
      }
      appliedClass += ' ' + activeModal.dimmerClass;
      return appliedClass;
    }
  ),

  onDimmerClick() {
    if (!this.activeModal.dismissable) {
      return;
    }
    this.activeModal.onHide();
  },
});
