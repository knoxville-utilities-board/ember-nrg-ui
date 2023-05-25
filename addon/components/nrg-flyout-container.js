import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class NrgFlyoutContainerComponent extends Component {
  @service('flyout')
  flyoutService;
}
