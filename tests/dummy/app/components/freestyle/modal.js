import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FreestyleModalComponent extends Component {
  @tracked
  modalOpen = false;

  @action
  toggleModalOpen() {
    this.modalOpen = !this.modalOpen;
  }
}
