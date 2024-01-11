import { action } from '@ember/object';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from '../utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgButtonComponent extends Component {
  @action
  onClick() {
    this.args.onClick?.();
  }
}
