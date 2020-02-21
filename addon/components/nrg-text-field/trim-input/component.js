import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  tagName: '',

  _value: '',

  value: computed('_value', {
    get() {
      return this.get('_value').trim();
    },
    set(key, value) {
      const oldValue = this.get('value');
      const newValue = (value && value.trim()) || '';
      if (oldValue !== newValue) {
        this.set('_value', newValue);
      }
    },
  }),

  onChange() {},
  onFocus() {},
  onBlur() {},
});
