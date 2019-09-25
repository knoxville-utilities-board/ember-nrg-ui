import { lte, gt } from '@ember/object/computed';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import Service from '@ember/service';
import { set } from '@ember/object';

export default Service.extend({
  lightboxIsOpen: false,

  items: A(),

  selectedItem: null,

  hasChildren: gt('items.length', 0),

  add(item) {
    this.get('items').pushObject(item);
  },

  remove(thumbnailId) {
    const items = this.get('items').rejectBy('thumbnailId', thumbnailId);
    this.set('items', items);
  },

  selectAndOpen(thumbnailId) {
    const item = this.get('items').findBy('thumbnailId', thumbnailId);
    this.set('selectedItem', item);
    this.set('lightboxIsOpen', true);
  },

  updateDetail(thumbnailId, detail) {
    const item = this.get('items').findBy('thumbnailId', thumbnailId);
    if (item) {
      set(item, 'detail', detail);
    }
  },

  selectedIndex: computed('selectedItem', 'items.[]', function() {
    return this.get('items').indexOf(this.get('selectedItem'));
  }),

  previousDisabled: lte('selectedIndex', 0),

  nextDisabled: computed('selectedIndex', 'items.[]', function() {
    const selectedIndex = this.get('selectedIndex');
    const totalPhotos = this.get('items.length');
    return selectedIndex === -1 || totalPhotos - 1 === selectedIndex;
  }),

  selectNext() {
    if (!this.get('nextDisabled')) {
      const selectedIndex = this.get('selectedIndex');
      const items = this.get('items');
      const photo = items.objectAt(selectedIndex + 1);
      this.set('selectedItem', photo);
      this.set('rotationClass', '');
    }
  },

  selectPrevious() {
    if (!this.get('previousDisabled')) {
      const selectedIndex = this.get('selectedIndex');
      const items = this.get('items');
      const photo = items.objectAt(selectedIndex - 1);
      this.set('selectedItem', photo);
      this.set('rotationClass', '');
    }
  },
});
