import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
export default class Modal extends Component {
  @service('modal')
  modalService;

  @action
  onDimmerClick() {
    if (this.modalService?.activeModal?.dismissable) {
      this.modalService?.activeModal?.onHide();
    }
  }
}
