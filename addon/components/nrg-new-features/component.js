import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias, bool, reads } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import layout from './template';

export default Component.extend({
  layout,

  whatsNewService: service('whats-new'),

  hasContent: bool('content'),
  isOpen: reads('hasContent'),

  headerText: alias('whatsNewService.headerText'),

  primaryButtonText: alias('whatsNewService.primaryButtonText'),
  secondaryButtonText: alias('whatsNewService.secondaryButtonText'),

  checkContent: task(function*() {
    let content = yield this.get('whatsNewService').getContent();
    this.set('content', content);
  }).on('init'),

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
