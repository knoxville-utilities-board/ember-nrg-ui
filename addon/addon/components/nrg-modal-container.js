import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
export default class Modal extends Component {
  @service('modal')
  modalService;
}
