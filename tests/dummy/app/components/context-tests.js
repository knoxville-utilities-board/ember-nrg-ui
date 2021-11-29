//BEGIN-SNIPPET context-item-js
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NrgContextTestsComponent extends Component {
  @tracked
  counter = 0;

  @tracked
  checked = true;

  @tracked
  checkedIcon = false;

  @tracked
  checkedDisabled = false;

  @action
  contextCounter() {
    this.counter++;
  }

  @action
  contextChecked() {
    this.checked = !this.checked;
  }

  @action
  contextCheckedIcon() {
    this.checkedIcon = !this.checkedIcon;
  }

  @action
  contextCheckedDisabled() {
    this.checkedDisabled = !this.checkedDisabled;
  }
}
//END-SNIPPET
