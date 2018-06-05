import {
  scheduleOnce,
  next
} from '@ember/runloop';
import {
  inject as service
} from '@ember/service';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',
  lightboxService: service('lightbox'),

  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, () => {
      this.get('lightboxService').addPhoto(this.get('photo'));
    });
  },
  didDestroyElement() {
    next(this, () => {
      this.get('lightboxService').removePhoto(this.get('photo'));
    });
    this._super(...arguments);
  },
  actions: {
    openLightbox() {
      this.get('lightboxService').selectAndOpen(this.get('photo'));
    },
  },
});
