import { A, isArray } from '@ember/array';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import NrgValidationComponent from '../../components/nrg-validation-component';
import { assert } from '@ember/debug';
import { AddNrgDeprecations } from '../../utils/deprecation-handler';
import { tracked } from '@glimmer/tracking';
import defaultItemHash from '../../utils/object-hash';

const defaultNoResultsLabel = 'No Results';
const defaultPageSize = 25;

function ensureArray(value) {
  if (isArray(value)) {
    return value;
  }
  return A([value]);
}

@AddNrgDeprecations(
  {
    id: 'list.onItemSelect.click',
    test(target) {
      const selectionType = target.args.selectionType;
      return (
        (!selectionType || selectionType == 'click') && target.args.onItemSelect
      );
    },
    message(target) {
      const selectionType = target.selectionType;
      return `\`onItemSelect(item)\` is deprecated for ${
        selectionType
          ? `selection type "${selectionType}"`
          : 'no selection type'
      }, please use onItemClick(item) instead`;
    },
    since: '4.5.0',
    until: '5.0.0',
  },
  {
    id: 'list.onItemSelect.selection',
    test(target) {
      return (
        target.args.onItemSelect &&
        ['single', 'multiple'].includes(target.args.selectionType)
      );
    },
    message(target) {
      return `\`onItemSelect(item, value)\` is deprecated for selection type "${target.args.selectionType}", please use onChange(value, item) instead`;
    },
    since: '4.5.0',
    until: '5.0.0',
  }
)
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

  get selectedPageSize() {
    return this.args.selectedPageSize ?? defaultPageSize;
  }

  get currentPage() {
    return this.args.pageMeta?.start / this.selectedPageSize + 1;
  }

  get totalPages() {
    return Math.ceil(this.args.pageMeta?.total / this.selectedPageSize);
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
      this.args.onItemSelect?.(item);
      this.args.onItemClick?.(item);
      return;
    }
    let allSelected = this.value ?? A([]);

    if (this.args.isSelectable && !this.args.isSelectable(item)) {
      return;
    }

    if (selectionType === 'multiple') {
      allSelected = ensureArray(allSelected);
      const itemHash = this.getItemHash(item);
      const matchingItemIndex = allSelected.findIndex(
        (i) => this.getItemHash(i) === itemHash
      );
      if (matchingItemIndex > -1) {
        allSelected.removeAt(matchingItemIndex);
      } else {
        allSelected.pushObject(item);
      }
    } else if (selectionType === 'single') {
      allSelected = item;
    }
    this.onChange(allSelected, item);
    this.args.onItemSelect?.(item, allSelected);
  }

  @action
  nextPage() {
    const pageSize = this.selectedPageSize;
    const start = this.args.pageMeta?.start;
    this.args.onChangePage?.(start + pageSize);
  }
}
