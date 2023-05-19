import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FreestyleContextMenuComponent extends Component {
  @tracked
  contextTestsEnabled;
}
