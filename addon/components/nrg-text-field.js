import Component from '@ember/component';
import layout from '../templates/components/nrg-text-field';
import Validation from 'ember-nrg-ui/mixins/validation';

export default Component.extend(Validation, {
  layout,

  classNames: ['ui', 'input'],

  classNameBindings: ['fluid'],

  type: 'text',

  input() {
    this.sendAction('action', this.value);
  },

  onFocus() {},

  onBlur() {},

  onChange() {},
});
