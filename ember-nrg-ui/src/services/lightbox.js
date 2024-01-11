import { A } from '@ember/array';
import { action } from '@ember/object';
import Service from '@ember/service';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';

export default class LightboxService extends Service {
  @tracked
  lightboxIsOpen = false;

  @tracked
  items = A();

  @tracked
  selectedItem;

  @tracked
  selectedPhotoDetail;

  @tracked
  bottomDetails = false;

  get hasChildren() {
    return this.items?.length > 0;
  }

  get previousDisabled() {
    return this.selectedIndex <= 0;
  }

  get selectedIndex() {
    return this.items.indexOf(this.selectedItem);
  }

  get nextDisabled() {
    return (
      this.selectedIndex === -1 || this.items.length - 1 === this.selectedIndex
    );
  }

  @action
  add(item) {
    this.items.pushObject(item);
  }

  @action
  remove(thumbnailId) {
    const items = A(this.items.rejectBy('thumbnailId', thumbnailId));
    this.items = items;
  }

  @action
  selectAndOpen(thumbnailId) {
    const item = this.items.findBy('thumbnailId', thumbnailId);
    this.selectedItem = item;
    this.lightboxIsOpen = true;
    this.setSelectedDetail();
  }

  @action
  updateDetail(thumbnailId, detail) {
    const item = this.items.findBy('thumbnailId', thumbnailId);
    item.detail = detail;
    this.setSelectedDetail();
  }

  setSelectedDetail() {
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
