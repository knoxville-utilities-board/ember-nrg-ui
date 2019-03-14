import { lte, gt } from '@ember/object/computed';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import Service from '@ember/service';

export default Service.extend({
  lightboxIsOpen: false,
  allPhotos: A(),
  selectedPhoto: null,

  hasChildren: gt('allPhotos.length', 0),

  addPhoto(photo) {
    this.get('allPhotos').pushObject(photo);
  },
  removePhoto(photo) {
    this.get('allPhotos').removeObject(photo);
  },
  selectAndOpen(photo) {
    this.set('selectedPhoto', photo);
    this.set('lightboxIsOpen', true);
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
