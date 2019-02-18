import {
  computed,
  observer,
} from '@ember/object';
import {
  alias,
  bool
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
  _checked: bool('checked'),
  bindValue: true,

  inputId: computed('elementId', function(){
    return this.get('elementId') + '-input';
  }),

  onExternalChange: observer('checked', function(){
    const value = this.get('checked');
    if (this.get('bindValue')) {
      this.set('_checked', !!value);
    }
  }),

  onInternalChange: observer('_checked', function(){
    const value = this.get('_checked');
    if (this.get('bindValue')) {
      this.set('checked', !!value);
    }
    this.sendAction('action', !!value);
  }),
});
