import { scheduleOnce } from '@ember/runloop';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  classNames: ['ui field'],

  classNameBindings: ['required', 'errorMessage:error', 'inline'],

  label: '',

  hasInput: computed(function() {
    return this.$('input').length;
  }),

  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'getFocusId');
  },

  getFocusId() {
    if (this.get('hasInput')) {
      const inputId = this.$('input').prop('id');
      this.set('focusId', inputId);
    }
  },
});
