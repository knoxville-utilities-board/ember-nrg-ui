import Component from '@ember/component';
import layout from '../templates/components/nrg-form-action';

export default Component.extend({
  layout,
  tagName: 'a',
  classNames: ['item', 'form-link'],
  click(evt) {
    evt.preventDefault();
    this.sendAction();
  },
});
