import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class NrgSidebarMenuItem extends Component {
  get url() {
    return this.args.url ?? '';
  }

  @action
  onClick(evt) {
    if (!this.args.url) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    this.args.onClick?.(...arguments);
    this.args.onClickInternal?.(...arguments);
  }
}
