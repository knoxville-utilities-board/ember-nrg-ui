import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  contextService: service('context-menu'),

  concatenatedProperties: ['contextItems'],

  contextItems: [],

  registerContextItems() {
    this.contextService.addClient(this);
  },
  unregisterContextItems() {
    this.contextService.removeClient(this);
  },

  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'registerContextItems');
  },
  willDestroyElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'unregisterContextItems');
  },

  activate() {
    this._super(...arguments);
    this.registerContextItems();
  },
  deactivate() {
    this._super(...arguments);
    this.unregisterContextItems();
  },
});
