import { A } from '@ember/array';
import { gt } from '@ember/object/computed';
import Service from '@ember/service';

export default Service.extend({
  items: A(),

  hasChildren: gt('items.length', 0),

  add(item) {
    this.get('items').pushObject(item);
    this.updateActive();
  },

  remove(item) {
    this.get('items').removeObject(item);
    item.set('isActive', false);
    this.updateActive();
  },

  updateActive() {
    this.items.forEach((item, index) => {
      item.set('isActive', index == this.items.length - 1);
    });
  },
});
