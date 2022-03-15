import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NrgPopupComponent extends Component {
  @service('lightbox')
  lightboxService;

  @tracked
  rotationClass;

  @tracked
  bottomDetails = false;

  @action
  onModalOpen() {
    this.rotationClass = '';
  }

  @action
  onDismiss() {
    this.lightboxService.lightboxIsOpen = false;
  }

  @action
  previousImage() {
    this.lightboxService.selectPrevious();
  }

  @action
  nextImage() {
    this.lightboxService.selectNext();
  }

  @action
  toggleDetailLocation() {
    this.bottomDetails = !this.bottomDetails;
  }

  @action
  moveLeft() {
    if (!this.lightboxService.previousDisabled) {
      this.lightboxService.selectPrevious();
    }
  }

  @action
  moveRight() {
    if (!this.lightboxService.nextDisabled) {
      this.lightboxService.selectNext();
    }
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
