import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { and, not, or, readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import layout from './template';

export default Component.extend({
  layout,
  hasButtons: or('primaryButton', 'secondaryButton'),

  flashMessages: service(),
  application: service(),
  modalService: service('modal'),

  isTesting: readOnly('application.isTesting'),

  isOpen: false,
  hasMovedDom: false,

  showFlashMessages: true,
  dismissable: true,
  basic: false,
  sidebar: false,
  lightbox: false,
  modalClass: '',
  dimmerClass: '',
  notSidebar: not('sidebar'),
  hasCloseIcon: and('dismissable', 'notSidebar'),

  _modalClass: computed('sidebar', 'basic', 'lightbox', 'modalClass', function() {
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
  }),

  _dimmerClass: computed('sidebar', 'dimmerClass', function() {
    let appliedClass = '';
    if (this.sidebar) {
      appliedClass += ' sidebar-dimmer';
    } else {
      appliedClass += ' page';
    }
    if (!this.dismissable) {
      appliedClass += ' not-dismissable';
    }
    appliedClass += ' ' + this.dimmerClass;
    return appliedClass;
  }),

  _contentClass: computed('sidebar', 'lightbox', function() {
    let appliedClass = '';
    if (this.lightbox) {
      appliedClass += ' image';
    }
    if (!this.sidebar) {
      appliedClass += ' content';
    }
    return appliedClass;
  }),

  secondaryButtonClass: computed('basic', function() {
    let classList = 'basic';
    classList += this.basic ? ' secondary' : ' black';
    return classList;
  }),

  openObserver: observer('isOpen', function() {
    if (!this.isOpen) {
      this.moveModalFromContainer();
    }
  }),

  willDestroy() {
    if (this.hasMovedDom) {
      const parentNode = document.querySelector('#modal-container');
      parentNode.removeChild(this.dimmerNode);
      parentNode.removeChild(this.modalNode);
      this.set('hasMovedDom', false);
      this.modalService.remove(this);
    }
  },

  moveModalToContainer() {
    if (this.hasMovedDom || this.isTesting) {
      return;
    }
    this.dimmerNode = this.element.querySelector('.dimmer-anchor');
    this.modalNode = this.element.querySelector('.modal');
    const newParent = document.querySelector('#modal-container');

    newParent.appendChild(this.dimmerNode);
    newParent.appendChild(this.modalNode);

    this.get('modalService').add(this);
    this.set('hasMovedDom', true);
  },

  moveModalFromContainer() {
    if (!this.hasMovedDom) {
      return;
    }
    this.get('modalService').remove(this);

    const newParent = this.element.querySelector('.modal-origin-container');

    newParent.appendChild(this.dimmerNode);
    newParent.appendChild(this.modalNode);
    this.set('hasMovedDom', false);
  },

  onHide() {
    if (this.get('isOpen')) {
      // This happens when the modal is closed by clicking the x or clicking out of the modal
      if (this.get('dismissable')) {
        this.set('isOpen', false);
      }
      return false; // Don't close the modal yet, wait for the observer to close it.
    }
  },

  onPrimary() {
    if (this.get('dismissable')) {
      this.set('isOpen', false);
    }
    this.sendAction('action');
  },

  onSecondary() {
    if (this.get('dismissable')) {
      this.set('isOpen', false);
    }
    this.sendAction('cancel');
  },
});
