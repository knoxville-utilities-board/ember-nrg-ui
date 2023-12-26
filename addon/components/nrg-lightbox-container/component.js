
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
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

  onModalOpen() {},
});