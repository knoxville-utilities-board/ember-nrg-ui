import { next, scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',
  lightboxService: service('lightbox'),
  detail: null,

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
  cloneObject(initialPhoto) {
    if (initialPhoto.toJSON) {
      return initialPhoto.toJSON();
    }
    return JSON.parse(JSON.stringify(initialPhoto));
  },
  setDetail(node){
    this.detail = node.innerHTML;
  },
  actions: {
    openLightbox() {
      const photo = this.cloneObject(this.get('photo'));

      if (this.detail) {
        photo.detail = this.detail;
      }
      this.get('lightboxService').selectAndOpen(photo);
    },
  },
});
