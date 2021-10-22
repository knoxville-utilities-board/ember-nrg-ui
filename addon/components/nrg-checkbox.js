import { computed } from '@ember/object';
import { alias, bool } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/nrg-checkbox';
import Validation from 'ember-nrg-ui/mixins/validation';

export default Component.extend(Validation, {
  layout,
  classNames: ['ui', 'checkbox'],
  classNameBindings: ['type', 'disabled', 'fitted', 'readonly:read-only'],

  checked: alias('value'),
  _checked: bool('checked'),
  bindValue: true,

  inputId: computed('elementId', function() {
    return this.elementId + '-input';
  }),

  handleValueChange(evt) {
    const checked = evt.target.checked;
    if (this.bindValue) {
      this.set('checked', checked);
    }
    this.onChange(checked);
  },

  onChange(checked) {
    this.sendAction('action', checked);
  },
});
