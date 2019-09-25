import { inject as service } from '@ember/service';
import { guidFor } from '@ember/object/internals';
import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  tagName: '',

  lightboxService: service('lightbox'),

  detail: null,

  thumbnailId: computed(function() {
    return guidFor(this);
  }),

  didInsertElement() {
    this._super(...arguments);
    const item = this.getProperties('thumbnailId', 'photo', 'detail');
    this.get('lightboxService').add(item);
  },

  didDestroyElement() {
    const thumbnailId = this.get('thumbnailId');
    this.get('lightboxService').remove(thumbnailId);
    this._super(...arguments);
  },

  setDetail({ innerHTML }) {
    this.set('detail', innerHTML);
    const thumbnailId = this.get('thumbnailId');
    this.get('lightboxService').updateDetail(thumbnailId, innerHTML);
  },

  openLightbox() {
    const thumbnailId = this.get('thumbnailId');
    this.get('lightboxService').selectAndOpen(thumbnailId);
  },
});
