import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  columns: 'three',

  classNameBindings: ['columns'],

  classNames: ['ui', 'cards'],

  actionCard: false,
});
