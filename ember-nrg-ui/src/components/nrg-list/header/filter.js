import { action } from '@ember/object';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from '../../../utils/deprecation-handler';

const baseDefaultText = 'Select a Filter';
const defaultDirection = 'down';
const defaultMenuDirection = 'left';

@AddNrgDeprecations()
export default class NrgListHeaderFilterComponent extends Component {
  get defaultText() {
    return this.args.defaultText ?? baseDefaultText;
  }

  get direction() {
    return this.args.direction ?? defaultDirection;
  }

  get menuDirection() {
    return this.args.menuDirection ?? defaultMenuDirection;
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
      this.args.onChange?.(filterParam, selectedFilter);
    }
  }
}
