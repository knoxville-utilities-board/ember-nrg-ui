import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgContextItemComponent extends Component {
  @service('context-menu')
  contextService;

  get renderTo() {
    return this.args.bottom ? this.bottomContainer : this.topContainer;
  }

  get topContainer() {
    return this.contextService.currentContextMenu?.topElement;
  }

  get bottomContainer() {
    return this.contextService.currentContextMenu?.bottomElement;
  }

  @action
  onClick(evt) {
    evt.preventDefault();
    if (this.args.disabled) {
      return;
    }
    this.args.onClick?.();
  }
}
