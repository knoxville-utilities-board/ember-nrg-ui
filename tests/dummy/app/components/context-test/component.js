//BEGIN-SNIPPET context-menu-example
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NrgContextTestComponent extends Component {
  @service('context-menu')
  contextService;

  @tracked
  counter = 0;

  @tracked
  checked = true;

  @tracked
  checkedIcon = false;

  @tracked
  checkedDisabled = false;

  @tracked
  contextItems = [
    {
      label: 'Context Item',
      action: this.contextCounter,
      disabled: false,
    },
    {
      label: 'Context Item With Icon',
      action: this.contextCounter,
      disabled: false,
      priority: 7, // Changes the order of the context items
      iconClass: 'settings',
    },
    {
      label: 'Disabled Context Item',
      actionName: this.contextCounter,
      disabled: true,
    },
    {
      isCheckbox: true,
      checked: true,
      priority: 21,
      label: 'Context Item w/ Checkbox',
      action: this.contextChecked,
      disabled: false,
    },
    {
      isCheckbox: true,
      checked: false,
      label: 'Context Item w/ Checkbox and Icon',
      action: this.contextCheckedIcon,
      disabled: false,
      iconClass: 'settings',
    },
    {
      isCheckbox: true,
      checked: false,
      priority: 14,
      label: 'Disabled Context Item w/ Checkbox',
      action: this.contextCheckedDisabled,
      disabled: true,
    },
    {
      isDivider: true,
      priority: 11,
    },
  ];

  @action
  onInsert() {
    this.contextService.addClient(this);
  }

  @action
  onDestroy() {
    this.contextService.removeClient(this);
  }

  @action
  contextCounter() {
    this.counter++;
  }

  @action
  contextChecked(checked) {
    this.checked = checked;
  }

  @action
  contextCheckedIcon(checked) {
    this.checkedIcon = checked;
  }

  @action
  contextCheckedDisabled(checked) {
    this.checkedDisabled = checked;
  }
}
//END-SNIPPET
