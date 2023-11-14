import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgPopupComponent extends Component {
  @service('lightbox')
  lightboxService;

  @tracked
  rotationClass;

  get bottomDetails() {
    return this.lightboxService.bottomDetails;
  }

  set bottomDetails(bottomDetails) {
    this.lightboxService.bottomDetails = bottomDetails;
  }

  clearRotationClass() {
    this.rotationClass = '';
  }

  @action
  onModalOpen() {
    this.clearRotationClass();
  }

  @action
  onDismiss() {
    this.lightboxService.lightboxIsOpen = false;
  }

  @action
  previousImage() {
    this.lightboxService.selectPrevious();
    this.clearRotationClass();
  }

  @action
  nextImage() {
    this.lightboxService.selectNext();
    this.clearRotationClass();
  }

  @action
  toggleDetailLocation() {
    this.bottomDetails = !this.bottomDetails;
    this.lightboxService.onBottomDetailsChange?.(this.bottomDetails);
  }

  @action
  moveLeft() {
    if (!this.lightboxService.previousDisabled) {
      this.lightboxService.selectPrevious();
    }
    this.clearRotationClass();
  }

  @action
  moveRight() {
    if (!this.lightboxService.nextDisabled) {
      this.lightboxService.selectNext();
    }
    this.clearRotationClass();
  }

  @action
  rotateLeft() {
    const rotationClass = this.rotationClass;
    if (!rotationClass) {
      this.rotationClass = 'rotate-left';
    }
    if (rotationClass === 'rotate-left') {
      this.rotationClass = 'rotate-down';
    }
    if (rotationClass === 'rotate-down') {
      this.rotationClass = 'rotate-right';
    }
    if (rotationClass === 'rotate-right') {
      this.rotationClass = '';
    }
  }

  @action
  rotateRight() {
    const rotationClass = this.rotationClass;
    if (!rotationClass) {
      this.rotationClass = 'rotate-right';
    }
    if (rotationClass === 'rotate-right') {
      this.rotationClass = 'rotate-down';
    }
    if (rotationClass === 'rotate-down') {
      this.rotationClass = 'rotate-left';
    }
    if (rotationClass === 'rotate-left') {
      this.rotationClass = '';
    }
  }
}
