import Component from '@ember/component';
import layout from '../templates/components/nrg-home-cards';

export default Component.extend({
  layout,

  columns: 'three',

  classNameBindings: ['columns'],

  classNames: ['ui', 'cards'],

  actionCard: false,
});
