import { A } from '@ember/array';
import { filterBy, notEmpty, readOnly, sort } from '@ember/object/computed';
import Service from '@ember/service';

export default Service.extend({
  items: A(),

  renderIndex: 0,

  renderedModals: filterBy('items', 'renderInPlace', false),

  _openModals: filterBy('renderedModals', 'isOpen', true),

  modalSort: Object.freeze(['priority:asc', 'renderIndex:asc']),

  openModals: sort('_openModals', 'modalSort'),

  activeModal: readOnly('openModals.lastObject'),

  hasOpenModals: notEmpty('openModals'),

  add(item) {
    this.items.pushObject(item);
    item.set('renderIndex', this.renderIndex);
    this.incrementProperty('renderIndex');
  },

  remove(item) {
    this.items.removeObject(item);
  },
});
