import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { or, readOnly, reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import layout from './template';

export default Component.extend({
  layout,
  hasButtons: or('primaryButton', 'secondaryButton'),

  applicationService: service('application'),
  modalService: service('modal'),

  renderInPlace: reads('applicationService.isTesting'),
  isOpen: false,
  hasMovedDom: false,
  isActive: false,

  dismissable: true,
  basic: false,
  sidebar: false,
  lightbox: false,
  modalClass: '',
  dimmerClass: '',
  priority: 10,

  isVisible: readOnly('renderInPlace'),

  secondaryButtonClass: computed('basic', function() {
    let classList = 'basic';
    classList += this.basic ? ' secondary' : ' black';
    return classList;
  }),

  openObserver: observer('isOpen', 'renderInPlace', function() {
    if (this.isOpen && !this.renderInPlace) {
      this.addToService();
    } else {
      this.removeFromService();
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    this.openObserver();
  },

  willDestroy() {
    this._super(...arguments);
    this.removeFromService();
  },

  addToService() {
    this.modalService.add(this);
  },

  removeFromService() {
    this.modalService.remove(this);
    this.onModalClose();
  },

  onModalClose() {
    // implement
  },

  _onPrimary() {
    if (this.dismissable) {
      this.set('isOpen', false);
    }
    this.onPrimaryButtonClick();
  },

  onPrimaryButtonClick() {
    this.sendAction('action');
  },

  _onSecondary() {
    if (this.dismissable) {
      this.set('isOpen', false);
    }
    this.onSecondaryButtonClick();
  },

  onSecondaryButtonClick() {
    this.sendAction('cancel');
  },

  onHide() {
    if (this.isOpen && this.dismissable) {
      this.set('isOpen', false);
    }
  },
});
