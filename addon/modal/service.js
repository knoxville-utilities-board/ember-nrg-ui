import { A } from '@ember/array';
import { filterBy, readOnly, sort } from '@ember/object/computed';
import Service from '@ember/service';

export default Service.extend({
  items: A(),

  renderIndex: 0,

  renderedModals: filterBy('items', 'renderInPlace', false),

  _openModals: filterBy('renderedModals', 'isOpen', true),

  modalSort: Object.freeze(['priority:asc', 'renderIndex:asc']),

  openModals: sort('_openModals', 'modalSort'),

  activeModal: readOnly('openModals.lastObject'),

  add(item) {
    this.get('items').pushObject(item);
    item.set('renderIndex', this.renderIndex);
    this.incrementProperty('renderIndex');
  },

  remove(item) {
    this.get('items').removeObject(item);
  },
});
