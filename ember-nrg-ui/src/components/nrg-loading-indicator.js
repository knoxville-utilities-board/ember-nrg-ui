import Component from '@glimmer/component';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgLoadingIndicatorComponent extends Component {
  get centered() {
    return this.args.centered !== false;
  }

  get inline() {
    return this.args.inline !== false;
  }
}
