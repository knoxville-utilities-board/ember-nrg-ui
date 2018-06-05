import {
  alias,
  bool
} from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';
import Validation from 'ember-nrg-ui/mixins/validation';

export default Component.extend(Validation, {
  layout,
  tagName: '',

  readonly: false,
  checked: alias('value'),
  _checked: bool('checked'),
  bindValue: true,

  actions: {
    onChange(value) {
      if (this.get('bindValue')) {
        this.set('checked', value);
      }
      this.sendAction('action', value);
    },
  },
});
