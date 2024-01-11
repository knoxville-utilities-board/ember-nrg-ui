import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

@AddNrgDeprecations()
export default class Modal extends Component {
  @service('modal')
  modalService;
}
