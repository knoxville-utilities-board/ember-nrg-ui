import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/nrg-lightbox-container';

export default Component.extend({
  layout,

  lightboxService: service('lightbox'),

  isOpen: alias('lightboxService.lightboxIsOpen'),

  selectedItem: alias('lightboxService.selectedItem'),

  selectedPhoto: alias('selectedItem.photo'),

  selectedPhotoDetail: computed('selectedItem.detail', function() {
    return htmlSafe(this.get('selectedItem.detail'));
  }),

  rotationClass: alias('lightboxService.rotationClass'),

  previousDisabled: alias('lightboxService.previousDisabled'),

  nextDisabled: alias('lightboxService.nextDisabled'),

  bottomDetailClass: computed('bottomDetails', function() {
    return this.bottomDetails ? '--bottom' : '';
  }),

  onModalOpen() {
    this.set('rotationClass', '');
  },

  previousImage() {
    this.lightboxService.selectPrevious();
  },

  nextImage() {
    this.lightboxService.selectNext();
  },

  toggleDetailLocation() {
    this.toggleProperty('bottomDetails');
  },

  rotateLeft() {
    const rotationClass = this.rotationClass;
    if (!rotationClass) {
      this.set('rotationClass', 'rotate-left');
    }
    if (rotationClass === 'rotate-left') {
      this.set('rotationClass', 'rotate-down');
    }
    if (rotationClass === 'rotate-down') {
      this.set('rotationClass', 'rotate-right');
    }
    if (rotationClass === 'rotate-right') {
      this.set('rotationClass', '');
    }
  },

  rotateRight() {
    const rotationClass = this.rotationClass;
    if (!rotationClass) {
      this.set('rotationClass', 'rotate-right');
    }
    if (rotationClass === 'rotate-right') {
      this.set('rotationClass', 'rotate-down');
    }
    if (rotationClass === 'rotate-down') {
      this.set('rotationClass', 'rotate-left');
    }
    if (rotationClass === 'rotate-left') {
      this.set('rotationClass', '');
    }
  },
});
