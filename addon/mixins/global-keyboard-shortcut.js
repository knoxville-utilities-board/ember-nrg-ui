import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  keyboardService: service('keyboard-shortcut'),

  concatenatedProperties: ['keyboardShortcuts'],

  keyboardShortcuts: [],

  register() {
    this.keyboardService.registerKeyboardShortcuts(this);
  },
  unregister() {
    this.keyboardService.unregisterKeyboardShortcuts(this);
  },

  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'register');
  },
  willDestroyElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'unregister');
  },

  activate() {
    this._super(...arguments);
    this.register();
  },
  deactivate() {
    this._super(...arguments);
    this.unregister();
  },
});
