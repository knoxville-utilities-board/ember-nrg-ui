import { action, set } from '@ember/object';
import Controller from '@ember/controller';

export default class NrgModalController extends Controller {
  @action
  openModal(modal) {
    set(this, modal, true);
  }

  @action
  forceDismiss() {
    this.modal5 = false;
    this.modal6 = false;
  }
}
