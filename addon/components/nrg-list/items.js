import { A, isArray } from '@ember/array';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import NrgValidationComponent from 'ember-nrg-ui/components/nrg-validation-component';
import { deprecate, assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import defaultItemHash from 'ember-nrg-ui/utils/object-hash';

const defaultNoResultsLabel = 'No Results';

function ensureArray(value) {
  if (isArray(value)) {
    return value;
  }
  return A([value]);
}

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

  get getItemHash() {
    const { getItemHash } = this.args;
    if (getItemHash) {
      assert(
        '`getItemHash` must be a function',
        typeof this.args.getItemHash === 'function'
      );
    }
    return this.args.getItemHash ?? defaultItemHash;
  }

  getDefaultValue() {
    return A([]);
  }

  @action
  onItemClick(item, evt) {
    evt?.preventDefault();
    evt?.stopPropagation();
    const selectionType = this.args.selectionType;

    if (!selectionType || selectionType === 'click') {
      if (this.args.onItemSelect) {
        deprecate(
          `\`onItemSelect(item)\` is deprecated for ${
            selectionType
              ? `selection type "${selectionType}"`
              : 'no selection type'
          }, please use onItemClick(item) instead`,
          false,
          {
            id: 'nrg-list.onItemSelect.click',
            until: '5.0.0',
            for: 'ember-nrg-ui',
            since: '4.5.0',
          }
        );
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
      allSelected = ensureArray(allSelected);
      if (allSelected.includes(item)) {
        allSelected.removeObject(item);
      } else {
        allSelected.addObject(item);
      }
    } else if (selectionType === 'single') {
      allSelected = item;
    }
    this.onChange(allSelected, item);

    deprecate(
      `\`onItemSelect(item, value)\` is deprecated for selection type "${selectionType}", please use onChange(value, item) instead`,
      !this.args.onItemSelect,
      {
        id: 'nrg-list.onItemSelect.selection',
        until: '5.0.0',
        for: 'ember-nrg-ui',
        since: '4.5.0',
      }
    );
    this.args.onItemSelect?.(item, allSelected);
  }

  @action
  nextPage() {
    const pageSize = this.args.selectedPageSize;
    const start = this.args.pageMeta?.start;
    this.args.onChangePage?.(start + pageSize);
  }
}
