import Component from '@ember/component';
import layout from './template';
import Validation from 'ember-nrg-ui/mixins/validation';

export default Component.extend(Validation, {
  layout,

  tagName: '',

  readonly: false,

  onClick(value) {
    if (this.disabled || this.readOnly) {
      return;
    }
    this.set('selectedValue', value);
    this.onChange(value);
  },

  onChange(value) {
    this.sendAction('action', value);
  },
});
