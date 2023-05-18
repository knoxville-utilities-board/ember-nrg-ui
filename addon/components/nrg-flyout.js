import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NrgFlyoutComponent extends Component {
  @tracked
  hasRendered = false;

  @action
  didRenderElement() {
    debugger;
    this.hasRendered = true;
  }

  @action
  willDestroy() {
    super.willDestroy(...arguments);
    debugger;
    this.hasRendered = false;
  }
}
