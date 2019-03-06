import { alias } from '@ember/object/computed';
import layout from './template';
import FlashMessage from 'ember-cli-flash/components/flash-message';

export default FlashMessage.extend({
  layout,

  classNames: ['ui', 'floating', 'message', 'flash-message'],

  classNameBindings: ['size', 'isStuck:is-stuck'],

  alertType: alias('flash.type'),

  didInsertElement() {
    this._super(...arguments);
    this.sendAction('updateHeight', this.$().innerHeight());
  },
});
