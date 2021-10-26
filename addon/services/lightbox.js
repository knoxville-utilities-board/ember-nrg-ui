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
    this.items.pushObject(item);
  },

  remove(thumbnailId) {
    const items = this.items.rejectBy('thumbnailId', thumbnailId);
    this.set('items', items);
  },

  selectAndOpen(thumbnailId) {
    const item = this.items.findBy('thumbnailId', thumbnailId);
    this.set('selectedItem', item);
    this.set('lightboxIsOpen', true);
  },

  updateDetail(thumbnailId, detail) {
    const item = this.items.findBy('thumbnailId', thumbnailId);
    if (item) {
      set(item, 'detail', detail);
    }
  },

  selectedIndex: computed('selectedItem', 'items.[]', function() {
    return this.items.indexOf(this.selectedItem);
  }),

  previousDisabled: lte('selectedIndex', 0),

  nextDisabled: computed('selectedIndex', 'items.[]', function() {
    const selectedIndex = this.selectedIndex;
    const totalPhotos = this.get('items.length');
    return selectedIndex === -1 || totalPhotos - 1 === selectedIndex;
  }),

  selectNext() {
    if (!this.nextDisabled) {
      const selectedIndex = this.selectedIndex;
      const items = this.items;
      const photo = items.objectAt(selectedIndex + 1);
      this.set('selectedItem', photo);
      this.set('rotationClass', '');
    }
  },

  selectPrevious() {
    if (!this.previousDisabled) {
      const selectedIndex = this.selectedIndex;
      const items = this.items;
      const photo = items.objectAt(selectedIndex - 1);
      this.set('selectedItem', photo);
      this.set('rotationClass', '');
    }
  },
});
