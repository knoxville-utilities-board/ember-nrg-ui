import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { or } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import layout from './template';

export default Component.extend({
  layout,
  hasButtons: or('primaryButton', 'secondaryButton'),

  flashMessages: service(),
  modalService: service('modal'),

  isTesting: computed(function() {
    const config = getOwner(this).resolveRegistration('config:environment');
    return config.environment === 'test';
  }),

  isOpen: false,
  hasMovedDom: false,

  showFlashMessages: true,
  dismissable: true,
  basic: false,
  lightbox: false,
  modalClass: '',

  _modalClass: computed('basic', 'lightbox', 'modalClass', function() {
    let appliedClass = '';
    if (this.get('lightbox')) {
      appliedClass += ' fullscreen lightbox';
    }
    appliedClass += ' ' + this.get('modalClass');
    if (this.get('basic')) {
      appliedClass += ' basic';
    }
    return appliedClass;
  }),

  secondaryButtonClass: computed('basic', function() {
    let classList = 'basic';
    classList += this.get('basic') ? ' secondary' : ' black';
    return classList;
  }),

  openObserver: observer('isOpen', function() {
    if (!this.isOpen) {
      this.moveModalFromContainer();
    }
  }),

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

  onPrimary: function() {
    if (this.get('dismissable')) {
      this.set('isOpen', false);
    }
    this.sendAction('action');
  },

  onSecondary: function() {
    if (this.get('dismissable')) {
      this.set('isOpen', false);
    }
    this.sendAction('cancel');
  },
});
