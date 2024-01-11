import { action } from '@ember/object';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgFormActionComponent extends Component {
  @action
  onClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.args.onClick?.();
  }
}
