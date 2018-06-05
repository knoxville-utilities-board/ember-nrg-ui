import {
  notEmpty
} from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';
import ValidationContainer from 'ember-nrg-ui/mixins/validation-container';

export default Component.extend(ValidationContainer, {
  layout,
  tagName: 'form',
  classNames: ['ui', 'form'],
  classNameBindings: ['error', 'loading'],

  secondaryFirst: false,

  primaryButton: 'submit',
  secondaryButton: '',

  hasFormLinks: notEmpty('formLinks'),

  submit: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.sendAction('action', this.get('param'));
    this.showValidation();
  },

  actions: {
    cancel() {
      this.sendAction('cancel');
    },
    publishFormLinkAction(action) {
      this.sendAction(action);
    },
  },
});
