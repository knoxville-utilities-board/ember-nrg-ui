import { action } from '@ember/object';
import Component from '@glimmer/component';

const baseDefaultText = 'Select a Filter';
const defaultDirection = 'down';
const defaultMenuDirection = 'left';

export default class NrgListHeaderFilterComponent extends Component {
  get defaultText() {
    return this.args.defaultText || baseDefaultText;
  }

  get direction() {
    return this.args.direction || defaultDirection;
  }

  get menuDirection() {
    return this.args.menuDirection || defaultMenuDirection;
  }

  constructor() {
    super(...arguments);
    this.onFilterChange(null, false);
  }

  @action
  onFilterChange(selectedFilter, sendFalsyValue) {
    const filterParam = this.args.filterParam;
    const shouldSendFalsyValue = selectedFilter || sendFalsyValue;
    if (filterParam && shouldSendFalsyValue) {
      this.args.onChange && this.args.onChange(filterParam, selectedFilter);
    }
  }
}
