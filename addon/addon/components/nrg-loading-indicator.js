import Component from '@glimmer/component';

export default class NrgLoadingIndicatorComponent extends Component {
  get centered() {
    return this.args.centered !== false;
  }

  get inline() {
    return this.args.inline !== false;
  }
}
