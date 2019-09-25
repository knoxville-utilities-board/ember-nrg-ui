import { lte, gt } from '@ember/object/computed';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import Service from '@ember/service';
import { set } from '@ember/object';

export default Service.extend({
  lightboxIsOpen: false,
  allPhotos: A(),
  selectedPhoto: null,

  hasChildren: gt('allPhotos.length', 0),

  add(item) {
    this.get('allPhotos').pushObject(item);
  },

  remove(thumbnailId) {
    const allPhotos = this.get('allPhotos').filterBy('thumbnailId', thumbnailId);
    this.set('allPhotos', allPhotos);
  },

  selectAndOpen(thumbnailId) {
    const item = this.get('allPhotos').findBy('thumbnailId', thumbnailId);

    this.set('selectedPhoto', item);
    this.set('lightboxIsOpen', true);
  },

  updateDetail(thumbnailId, detail) {
    const item = this.get('allPhotos').findBy('thumbnailId', thumbnailId);
    if (item) {
      set(item, 'detail', detail);
    }
  },

  selectedIndex: computed('selectedPhoto', 'allPhotos.[]', function() {
    return this.get('allPhotos').indexOf(this.get('selectedPhoto'));
  }),

  previousDisabled: lte('selectedIndex', 0),

  nextDisabled: computed('selectedIndex', 'allPhotos.[]', function() {
    const selectedIndex = this.get('selectedIndex');
    const totalPhotos = this.get('allPhotos.length');

    return selectedIndex === -1 || totalPhotos - 1 === selectedIndex;
  }),

  selectNext() {
    if (!this.get('nextDisabled')) {
      const selectedIndex = this.get('selectedIndex');
      const allPhotos = this.get('allPhotos');
      const photo = allPhotos.objectAt(selectedIndex + 1);
      this.set('selectedPhoto', photo);
      this.set('rotationClass', '');
    }
  },

  selectPrevious() {
    if (!this.get('previousDisabled')) {
      const selectedIndex = this.get('selectedIndex');
      const allPhotos = this.get('allPhotos');
      const photo = allPhotos.objectAt(selectedIndex - 1);
      this.set('selectedPhoto', photo);
      this.set('rotationClass', '');
    }
  },
});
