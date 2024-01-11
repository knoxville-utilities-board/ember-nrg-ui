import { action } from '@ember/object';
import { isBlank } from '@ember/utils';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from '../utils/deprecation-handler';

const defaultPageSize = 25;
const defaultSearchParameter = 'search';

@AddNrgDeprecations()
export default class NrgListComponent extends Component {
  filterParam;
  selectedFilter;
  searchString;

  get hasRefreshContextItem() {
    return this.args.hasRefreshContextItem !== false;
  }

  get selectedPageSize() {
    return this.args.selectedPageSize ?? defaultPageSize;
  }

  get searchParameter() {
    return this.args.searchParameter ?? defaultSearchParameter;
  }

  updateQuery(isRefresh) {
    const selectedFilterValue = this.selectedFilter?.value;

    const query = {};
    if (!isBlank(this.searchString)) {
      query[this.searchParameter] = this.searchString;
    }

    if (!isBlank(selectedFilterValue) && !isBlank(this.filterParam)) {
      query[this.filterParam] = selectedFilterValue;
    }

    if (isRefresh) {
      this.args.onRefresh?.(query) ?? this.args.onQuery?.(query);
    } else {
      this.args.onQuery?.(query);
    }
  }

  @action
  signalRefresh() {
    this.updateQuery(true);
  }

  @action
  onFilterChange(filterParam, selectedFilter) {
    this.filterParam = filterParam;
    this.selectedFilter = selectedFilter;
    this.updateQuery();
  }

  @action
  onSearchChange(searchString) {
    this.searchString = searchString;
    this.updateQuery();
  }

  @action
  groupHeaderHandler() {
    return this.args.groupHeaderHandler?.(...arguments) ?? '';
  }

  @action
  isSelectable() {
    return this.args.isSelectable?.(...arguments) ?? true;
  }

  @action
  onChangePage() {
    this.args.onChangePage?.(...arguments);
  }
}
