import {
  computed,
} from '@ember/object';
import {
  alias,
} from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';
import Validation from 'ember-nrg-ui/mixins/validation';

export default Component.extend(Validation, {
  layout,
  classNames: ['ui', 'checkbox'],
  classNameBindings: ['type', 'disabled', 'fitted', 'readonly:read-only'],

  readonly: false,
  checked: alias('value'),
  _checked: computed('checked', {
    get() {
      return this.get('checked');
    },
    set(key, value) {
      this.set('checked', value);
      this.sendAction('action', value);
      return value;
    },
  }),

  bindValue: true,

  inputId: computed('elementId', function(){
    return this.get('elementId') + '-input';
  }),
});
