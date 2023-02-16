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

  selectedItem: alias('lightboxService.selectedItem'),

  selectedPhoto: alias('selectedItem.photo'),

  selectedVideo: alias('selectedItem.video'),

  isPhoto: computed('selectedItem.photo', 'selectedItem.video', function() {
    if(this.get('selectedItem.photo')){
      return true;
    }
    return false;
  }),
  
  selectedPhotoDetail: computed('selectedItem.detail', function() {
    return htmlSafe(this.get('selectedItem.detail'));
  }),

  rotationClass: alias('lightboxService.rotationClass'),

  previousDisabled: alias('lightboxService.previousDisabled'),

  nextDisabled: alias('lightboxService.nextDisabled'),

  bottomDetailClass: alias('lightboxService.bottomDetailClass'),

  showDetails: alias('lightboxService.showDetails'),

  showDetailsClass: computed('showDetails', function() {
    return this.showDetails ? '' : '--hide-details';
  }),

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
    this.get('lightboxService').toggleDetailLocation();
  },

  toggleDetails() {
    this.get('lightboxService').toggleDetails();
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
