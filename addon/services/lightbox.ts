import { A } from '@ember/array';
import { action } from '@ember/object';
import Service from '@ember/service';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';

export type LightboxItem = {
  thumbnailId: string;
  detail: string;

  photo?: {
    url?: string;
    altText?: string;
  };
};

export default class LightboxService extends Service {
  @tracked
  lightboxIsOpen = false;

  @tracked
  items = A<LightboxItem>();

  @tracked
  selectedItem: LightboxItem | undefined;

  @tracked
  selectedPhotoDetail: unknown;

  @tracked
  bottomDetails = false;

  get hasChildren() {
    return this.items?.length > 0;
  }

  get previousDisabled() {
    return this.selectedIndex <= 0;
  }

  get selectedIndex() {
    if (!this.selectedItem) {
      return -1;
    }
    return this.items.indexOf(this.selectedItem);
  }

  get nextDisabled() {
    return (
      this.selectedIndex === -1 || this.items.length - 1 === this.selectedIndex
    );
  }

  @action
  add(item: LightboxItem) {
    this.items.pushObject(item);
  }

  @action
  remove(thumbnailId: string) {
    const items = A(this.items.rejectBy('thumbnailId', thumbnailId));
    this.items = items;
  }

  @action
  selectAndOpen(thumbnailId: string) {
    const item = this.items.findBy('thumbnailId', thumbnailId);
    this.selectedItem = item;
    this.lightboxIsOpen = true;
    this.setSelectedDetail();
  }

  @action
  updateDetail(thumbnailId: string, detail: string) {
    const item = this.items.findBy('thumbnailId', thumbnailId);
    if (!item) {
      return;
    }
    item.detail = detail;
    this.setSelectedDetail();
  }

  setSelectedDetail() {
    if (!this.selectedItem) {
      return;
    }
    this.selectedPhotoDetail = htmlSafe(this.selectedItem?.detail);
  }

  @action
  selectNext() {
    if (this.nextDisabled) {
      return;
    }
    this.selectedItem = this.items.objectAt(this.selectedIndex + 1);
    this.setSelectedDetail();
  }

  @action
  selectPrevious() {
    if (this.previousDisabled) {
      return;
    }
    this.selectedItem = this.items.objectAt(this.selectedIndex - 1);
    this.setSelectedDetail();
  }
}
