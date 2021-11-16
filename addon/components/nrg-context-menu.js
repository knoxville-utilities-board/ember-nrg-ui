import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class NrgContextMenuComponent extends Component {
  @service('context-menu')
  contextService;

  @action
  itemSelected(option) {
    if (option.isCheckbox) {
      option.checked = !option.checked;
    }
    option.action?.(option.checked);
  }
}
