import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias, and, bool, reads } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import layout from './template';

export default Component.extend({
  layout,

  whatsNewService: service('whats-new'),

  hasContent: bool('content'),
  isOpen: reads('hasContent'),
  _isOpen: and('isOpen', 'canOpen'),

  headerText: alias('whatsNewService.headerText'),

  primaryButtonText: alias('whatsNewService.primaryButtonText'),
  secondaryButtonText: alias('whatsNewService.secondaryButtonText'),
  htmlContent: computed('content', function() {
    return htmlSafe(this.content);
  }),

  didInsertElement() {
    this._super(...arguments);
    this.set('canOpen', true);
  },

  content: alias('whatsNewService.content'),

  closeModal() {
    this.set('isOpen', false);
  },

  onModalClose() {
    this.whatsNewService.onModalClose();
  },

  onPrimaryClick() {
    this.whatsNewService.onPrimaryClick();
    this.closeModal();
  },

  onSecondaryClick() {
    this.whatsNewService.onSecondaryClick();
    this.closeModal();
  },
});
