import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import layout from './template';

export default Component.extend({
  layout,

  whatsNewService: service('whats-new'),

  isOpen: false,

  headerText: alias('whatsNewService.headerText'),

  primaryButtonText: alias('whatsNewService.primaryButtonText'),
  secondaryButtonText: alias('whatsNewService.secondaryButtonText'),
  htmlContent: computed('content', function() {
    return htmlSafe(this.content);
  }),

  didInsertElement() {
    this._super(...arguments);
    this.checkContent();
  },

  async checkContent() {
    let content = await this.get('whatsNewService').getContent();
    this.set('content', content);
    this.set('isOpen', !!content);
  },

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
