import { A } from '@ember/array';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const defaultNoResultsLabel = 'No Results';

export default class NrgListItemsComponent extends Component {
  @tracked
  selected = A();

  get itemsProxy() {
    let content = this.args.items || [];
    if (content?.toArray) {
      content = content.toArray();
    }
    return A(content);
  }

  get noResultsLabel() {
    return this.args.noResultsLabel ?? defaultNoResultsLabel;
  }

  get canSelect() {
    return !!this.args.selectionType;
  }

  get canShowActiveItem() {
    return !isEmpty(this.selected);
  }

  get currentPage() {
    return this.args.pageMeta?.start / this.args.selectedPageSize + 1;
  }

  get totalPages() {
    return Math.ceil(this.args.pageMeta?.total / this.args.selectedPageSize);
  }

  get canStepForward() {
    return this.currentPage < this.totalPages;
  }

  @action
  onItemClick(item) {
    let selected = A([item]);

    if (!this.canSelect || !(this.args.isSelectable?.(item) ?? true)) {
      return;
    }

    const selectionType = this.args.selectionType;
    if (selectionType === 'multiple') {
      if (this.selected.includes(item)) {
        selected = A(this.selected.without(item));
      } else {
        selected = A(this.selected.concat(selected));
      }
    }
    if (selectionType !== 'click') {
      this.selected = selected;
    }
    this.args.onItemSelect?.(item, selected);
  }

  @action
  nextPage() {
    const pageSize = this.args.selectedPageSize;
    const start = this.args.pageMeta?.start;
    this.args.onChangePage?.(start + pageSize);
  }
}
