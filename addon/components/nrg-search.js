import { action, get } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import NrgValidationComponent from './nrg-validation-component';
import { inject as service } from '@ember/service';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

const defaultPlaceholder = 'Search';
const defaultMinCharacters = 1;
const defaultSearchTimeout = 300;
const defaultDisplayLabel = 'header';
const defaultNoResultsLabel = 'No Results';

@AddNrgDeprecations()
export default class NrgSearchComponent extends NrgValidationComponent {
  @service
  application;

  @tracked
  isFocused = false;

  @tracked
  activeItem = -1;

  @tracked
  searchString = null;

  @tracked
  items = null;

  get isTesting() {
    return this.application.isTesting ?? false;
  }

  get fluid() {
    return this.args.fluid !== false;
  }

  get searchTimeout() {
    if (this.isTesting) {
      return 0;
    }
    return this.args.searchTimeout ?? defaultSearchTimeout;
  }

  get minCharacters() {
    return this.args.minCharacters ?? defaultMinCharacters;
  }

  get placeholder() {
    return this.args.placeholder ?? defaultPlaceholder;
  }

  get displayLabel() {
    return this.args.displayLabel ?? defaultDisplayLabel;
  }

  get noResultsLabel() {
    return this.args.noResultsLabel ?? defaultNoResultsLabel;
  }

  get loading() {
    return this.args.loading ?? this.throttleQuery.isRunning;
  }

  get canPerformSearch() {
    return (this.searchString?.length ?? 0) >= this.minCharacters;
  }

  get receivedResults() {
    return this.items != null;
  }

  get showClearIcon() {
    return Boolean(!this.args.disabled && this.args.clearable);
  }

  get showResults() {
    return (
      this.isFocused &&
      this.canPerformSearch &&
      !this.loading &&
      this.receivedResults
    );
  }

  get displayValue() {
    const displayLabel = get(this.value ?? {}, this.displayLabel);
    return this.searchString ?? displayLabel ?? this.value ?? '';
  }

  set displayValue(value) {
    this.searchString = value;
  }

  selectItem(item) {
    if (!item) {
      item = this.items.slice()[this.activeItem];
    }

    if (!item) {
      return;
    }

    this.onChange(item);
    this.searchString = null;
    this.onBlur();
  }

  throttleQuery = restartableTask(async (searchString) => {
    await timeout(this.searchTimeout);
    this.items = await this.args.query(searchString);
    this.activeItem = -1;
    this.isFocused = true;
  });

  @action
  onBlur() {
    this.isFocused = false;
    this.items = null;
  }

  @action
  onFocus(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isFocused || this.args.disabled || this.args.readonly) {
      return;
    }

    this.isFocused = true;
    this.activeItem = -1;
    if (this.canPerformSearch) {
      this.query(this.searchString);
    }
  }

  @action
  moveUp(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.activeItem !== 0) {
      this.activeItem--;
    }
  }

  @action
  moveDown(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.activeItem < this.items.length - 1) {
      this.activeItem++;
    }
  }

  @action
  onEnter(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.selectItem();
  }

  @action
  onEscape(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onBlur();
  }

  @action
  onItemClick(item, evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (item?.disabled) {
      return;
    }
    this.selectItem(item);
  }

  @action
  query(searchString) {
    this.throttleQuery.perform(searchString);
  }

  @action
  clear() {
    this.searchString = null;
    this.onChange(null);
  }
}
