import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { and, not, or, readOnly, reads } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { inject as service } from '@ember/service';
import layout from './template';

export default Component.extend({
  layout,

  hasButtons: or('primaryButton', 'secondaryButton'),

  applicationService: service('application'),
  modalService: service('modal'),

  isTesting: reads('applicationService.isTesting'),
  isOpen: false,
  hasMovedDom: false,

  dismissable: true,
  basic: false,
  sidebar: false,
  lightbox: false,
  scrolling: true,
  modalClass: '',
  dimmerClass: '',
  priority: 10,

  renderInPlace: reads('isTesting'),
  renderInModal: not('renderInPlace'),
  shouldWormhole: and('isOpen', 'renderInModal'),

  attributeBindings: ['hidden'],

  hidden: readOnly('renderInModal'),

  secondaryButtonClass: computed('basic', function() {
    let classList = 'basic';
    classList += this.basic ? ' secondary' : ' black';
    return classList;
  }),

  openObserver: observer('shouldWormhole', function() {
    once(this, '_handleShouldWormHole');
  }),

  _handleShouldWormHole() {
    if (this.shouldWormhole) {
      this.addToService();
    } else {
      this.removeFromService();
    }
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.shouldWormhole) {
      this.addToService();
    }
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
