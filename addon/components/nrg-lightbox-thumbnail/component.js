import { scheduleOnce, next } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from './template';
import { copy } from 'ember-copy';

export default Component.extend({
  layout,
  tagName: '',
  lightboxService: service('lightbox'),
  uuid:  '',

  init(){
    this._super(...arguments);
    this.uuid = Math.random().toString(36).replace(/[^a-z]+/g, '');
  },

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
      const photo = copy(this.get('photo'));
      const detail = $(`#thumb-${this.uuid}`).html();
      if(detail){
        photo.detail = detail;
      }
      this.get('lightboxService').selectAndOpen(photo);
    },
  },
});
