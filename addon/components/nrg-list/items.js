import { A } from '@ember/array';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import NrgValidationComponent from 'ember-nrg-ui/components/nrg-validation-component';
import { tracked } from '@glimmer/tracking';

const defaultNoResultsLabel = 'No Results';

export default class NrgListItemsComponent extends NrgValidationComponent {
  @tracked
  internalSelection = A([]);

  get model() {
    return this.args.model ?? this;
  }

  get valuePath() {
    return this.args.valuePath ?? 'internalSelection';
  }

  get itemsProxy() {
    let content = this.args.items ?? [];
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
    return !isEmpty(this.value);
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

  getDefaultValue() {
    return A([]);
  }

  @action
  onItemClick(item) {
    const selectionType = this.args.selectionType;

    if (!selectionType || selectionType === 'click') {
      if (this.args.onItemSelect) {
        this.args.onItemSelect?.(item);
      }
      this.args.onItemClick?.(item);
      return;
    }
    let allSelected = this.value ?? A([]);

    if (this.args.isSelectable && !this.args.isSelectable(item)) {
      return;
    }

    if (selectionType === 'multiple') {
      if (allSelected.includes(item)) {
        allSelected.removeObject(item);
      } else {
        allSelected.addObject(item);
      }
    } else if (selectionType === 'single') {
      allSelected = item;
    }
    this.onChange(allSelected, item);
    this.args.onItemSelect?.(item, allSelected);
  }

  @action
  nextPage() {
    const pageSize = this.args.selectedPageSize;
    const start = this.args.pageMeta?.start;
    this.args.onChangePage?.(start + pageSize);
  }
}
