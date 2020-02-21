import { or } from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  tagName: 'button',
  type: 'button',
  classNames: ['ui button'],
  classNameBindings: ['disabled', 'loading'],
  attributeBindings: ['type', '_disabled:disabled', 'name', 'tabindex', 'title', 'autofocus'],

  loading: false,
  disabled: false,

  _disabled: or('disabled', 'loading'),

  click: function(evt) {
    this.onClick(evt);
  },

  onClick(evt) {
    this.sendAction('action', evt);
  },
});
