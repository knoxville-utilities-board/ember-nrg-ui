import { guidFor } from '@ember/object/internals';
import $ from 'jquery';
import { observer, computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { or, not } from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';
import { next } from '@ember/runloop';
import Ember from 'ember';

export default Component.extend({
  layout,
  hasButtons: or('primaryButton', 'secondaryButton'),

  flashMessages: service(),

  context: 'body',
  isOpen: false,
  autofocus: true,
  testing: Ember.testing,
  detachable: not('testing'),
  dismissable: true,
  basic: false,
  duration: 400,
  transition: 'scale',
  modalClass: '',

  renderBodyAfterOpen: false,
  showFlashMessages: true,

  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'openObserver');
  },

  openObserver: observer('isOpen', function() {
    if (this.get('isOpen')) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }),

  openModal() {
    this.set('_isOpen', false);
    next(() => {
      $(`#${this.elementId}-modal`).modal('show');
      this.sendAction('onModalOpen');
      this.set('_isOpen', true);
    });
  },

  closeModal(sendAction = true) {
    $(`#${this.elementId}-modal`).modal('hide');
    if (sendAction) {
      this.sendAction('onModalClose');
    }
  },

  onHidden() {
    $('.ui.modal.visible').modal('refresh');
  },

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

  modalId: computed(function() {
    return guidFor(this) + '-modal';
  }),

  didDestroyElement() {
    this._super(...arguments);
    this.closeModal(false);
    // Cleanup since semantic moved the modal DOM element
    $(`#${this.get('modalId')}`).remove();
  },

  actions: {
    onHide() {
      if (this.get('isOpen')) {
        // This happens when the modal is closed by clicking the x or clicking out of the modal
        if (this.get('dismissable')) {
          this.set('isOpen', false);
        }
        return false; // Don't close the modal yet, wait for the observer to close it.
      }
    },

    ok: function() {
      if (this.get('dismissable')) {
        this.set('isOpen', false);
      }
      this.sendAction('action');
    },

    cancel: function() {
      if (this.get('dismissable')) {
        this.set('isOpen', false);
      }
      this.sendAction('cancel');
    },
  },
});
