import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from '../utils/deprecation-handler';

@AddNrgDeprecations()
export default class Modal extends Component {
  @service('modal')
  modalService;
}
