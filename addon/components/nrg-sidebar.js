import { action } from '@ember/object';
import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgSidebarComponent extends Component {
  @service
  application;

  @service
  responsive;

  @action
  onResize() {
    if (
      this.application.sidebarIsOpen &&
      this.responsive.isComputerScreenGroup
    ) {
      this.application.sidebarIsOpen = false;
    }
  }

  @action
  onClickInternal() {
    next(() => {
      this.application.sidebarIsOpen = false;
    });
  }
}
