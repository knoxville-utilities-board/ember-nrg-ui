import { action } from '@ember/object';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from '../../utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgDropdownMenuComponent extends Component {
  @action
  onSelectInternal(option, evt) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    this.args.onSelectInternal?.(...arguments);
  }
}
