import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NrgFlyoutContainerComponent extends Component {
  @service('flyout')
  flyoutService;
}
