import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NrgLightboxThumbnailComponent extends Component {
  @service('lightbox')
  lightboxService;

  @tracked
  detail;

  constructor() {
    super(...arguments);
    this.lightboxService.bottomDetails = this.args.bottomDetails ?? false;
    this.lightboxService.onBottomDetailsChange =
      this.args.onBottomDetailsChange;
  }

  thumbnailId = 'thumbnail-' + guidFor(this);

  @action
  onInsert() {
    this.lightboxService.add({
      thumbnailId: this.thumbnailId,
      photo: this.args.photo,
      detail: this.detail,
    });
  }

  @action
  onDestroy() {
    this.lightboxService.remove(this.thumbnailId);
  }

  @action
  setDetail({ innerHTML }) {
    this.detail = innerHTML;
    this.lightboxService.updateDetail(this.thumbnailId, innerHTML);
  }

  @action
  openLightbox() {
    this.lightboxService.selectAndOpen(this.thumbnailId);
  }
}
