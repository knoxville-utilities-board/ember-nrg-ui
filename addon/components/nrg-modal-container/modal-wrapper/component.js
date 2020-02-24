import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { alias, and, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
export default Component.extend({
  layout,

  tagName: '',

  applicationService: service('application'),
  modalService: service('modal'),

  isTesting: alias('applicationService.isTesting'),
  isOpen: alias('modal.isOpen'),
  isActive: alias('modal.isActive'),
  renderInPlace: alias('modal.renderInPlace'),
  hasMovedDom: alias('modal.hasMovedDom'),

  sidebar: alias('modal.sidebar'),
  basic: alias('modal.basic'),
  lightbox: alias('modal.lightbox'),
  modalClass: alias('modal.modalClass'),
  dimmerClass: alias('modal.dimmerClass'),

  notSidebar: not('sidebar'),
  hasCloseIcon: and('dismissable', 'notSidebar'),
  dismissable: alias('modal.dismissable'),

  _modalClass: computed(
    'sidebar',
    'basic',
    'lightbox',
    'modalClass',
    function() {
      let appliedClass = '';
      if (this.sidebar) {
        appliedClass += ' sidebar-modal';
      }
      if (this.lightbox) {
        appliedClass += ' fullscreen lightbox';
      }
      appliedClass += ' ' + this.modalClass;
      if (this.basic) {
        appliedClass += ' basic';
      }
      return appliedClass;
    }
  ),

  _contentClass: computed('sidebar', 'lightbox', function() {
    let appliedClass = 'modal-content';
    if (this.lightbox) {
      appliedClass += ' image';
    }
    if (!this.sidebar) {
      appliedClass += ' content';
    }
    return appliedClass;
  }),

  addModalToWormhole(element) {
    if (this.hasMovedDom || this.renderInPlace || this.isTesting) {
      return;
    }
    this.contentNode = this.modal.element.querySelector('.modal-js');
    element.appendChild(this.contentNode);
    this.set('hasMovedDom', true);
  },

  removeModalFromWormhole() {
    if (!this.hasMovedDom) {
      return;
    }
    this.modalService.remove(this);
    this.modal.element.appendChild(this.contentNode);
    this.set('hasMovedDom', false);
    this.modal.onModalClose();
  },

  onHide() {
    this.modal.onHide();
  },

  _onPrimary() {
    this.modal._onPrimary();
  },

  _onSecondary() {
    this.modal._onSecondary();
  },
});
