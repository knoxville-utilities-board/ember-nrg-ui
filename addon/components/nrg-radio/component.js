import { guidFor } from '@ember/object/internals';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',
  readonly: false,
  _name: computed('name', function() {
    const componentId = guidFor(this);
    return this.getWithDefault('name', componentId + '-radio');
  }),
  actions: {
    onChange(value) {
      this.set('selectedValue', value);
      this.sendAction('action', value);
    },
  },
});
