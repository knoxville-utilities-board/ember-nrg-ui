import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias, bool } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import layout from './template';

export default Component.extend({
  layout,

  whatsNewService: service('whats-new'),

  isOpen: bool('content'),

  headerText: alias('whatsNewService.headerText'),

  primaryButtonText: alias('whatsNewService.primaryButtonText'),
  secondaryButtonText: alias('whatsNewService.secondaryButtonText'),

  checkContent: task(function*() {
    let content = yield this.get('whatsNewService.getContent');
    if (content) {
      this.set('content', content);
    }
  }).on('init'),

  closeModal() {
    this.set('content', null);
  },

  onModalClose() {
    this.whatsNewService.onModalClose();
  },

  onButtonClick() {
    this.whatsNewService.onButtonClick();
    this.closeModal();
  },

  onSecondaryClick() {
    this.whatsNewService.onSecondaryClick();
    this.closeModal();
  },
});
