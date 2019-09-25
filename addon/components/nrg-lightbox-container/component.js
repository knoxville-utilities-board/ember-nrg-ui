import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  lightboxService: service('lightbox'),

  isOpen: alias('lightboxService.lightboxIsOpen'),

  selectedPhoto: alias('lightboxService.selectedPhoto.photo'),

  selectedPhotoDetail: computed(
    'lightboxService.selectedPhoto.detail',
    function() {
      const detail = this.get('lightboxService.selectedPhoto.detail');
      return htmlSafe(detail);
    }
  ),

  rotationClass: alias('lightboxService.rotationClass'),

  previousDisabled: alias('lightboxService.previousDisabled'),

  nextDisabled: alias('lightboxService.nextDisabled'),

  onModalOpen() {
    this.set('rotationClass', '');
  },

  previousImage() {
    this.get('lightboxService').selectPrevious();
  },

  nextImage() {
    this.get('lightboxService').selectNext();
  },

  toggleDetailLocation() {
    this.toggleProperty('bottomDetails');
  },

  rotateLeft() {
    const rotationClass = this.get('rotationClass');
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
    const rotationClass = this.get('rotationClass');
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
