import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import layout from './template';

export default Component.extend({
  layout,

  classNames: ['ui field'],

  classNameBindings: ['required', 'errorMessage:error', 'inline'],

  label: '',

  focusId: '',

  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'getFocusId');
  },

  getFocusId() {
    const input = this.element.querySelector('input');
    if (input) {
      this.set('focusId', input.id);
    }
  },
});
