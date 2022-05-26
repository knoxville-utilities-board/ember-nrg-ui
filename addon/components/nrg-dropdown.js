import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import NrgValidationComponent from './nrg-validation-component';

const baseDefaultText = 'Select an Option';
const defaultDropdownAction = 'activate';
const defaultMatch = 'both';

export default class NrgDropdownComponent extends NrgValidationComponent {
  wrapperElement = null;

  @tracked
  isOpen = false;

  @tracked
  activeItem = -1;

  @tracked
  searchValue = '';

  @tracked
  selected;

  constructor() {
    super(...arguments);

    if (
      this.args.forceSelection &&
      !this.hasSelected &&
      this.args.options.length
    ) {
      this.onSelectInternal(this.args.options[0]);
    }
    if (this.args.multiple && !this.value) {
      this.value = A();
    }
  }

  get options() {
    return this.args.options ?? [];
  }

  get defaultText() {
    return this.args.defaultText ?? baseDefaultText;
  }

  get dropdownAction() {
    return this.args.dropdownAction ?? defaultDropdownAction;
  }

  get allowTab() {
    return this.args.allowTab !== false;
  }

  get showOnFocus() {
    return this.args.showOnFocus !== false;
  }

  get hideAdditions() {
    return this.args.hideAdditions !== false;
  }

  get match() {
    return this.args.match ?? defaultMatch;
  }

  get _dropdownDisabled() {
    return this.args.loading || this.args.disabled;
  }

  get selection() {
    return this.args.selection ?? this.args.field;
  }

  get menuClass() {
    let computedClasses = '';
    if (this.menuDirection) {
      computedClasses = this.menuDirection;
    }
    if (this.args.scrollable) {
      computedClasses += ' scrollable';
    }
    if (this.isOpen) {
      computedClasses += ' transition visible';
    } else {
      computedClasses += ' transition hidden';
    }
    return computedClasses;
  }

  get textClass() {
    if (this.isSearching) {
      return 'filtered';
    }
    if (this.hasSelected) {
      return '';
    }
    if (this.hasDefaultText) {
      return 'default';
    }
    return '';
  }

  get isSearching() {
    return this.args.search && this.searchValue;
  }

  get hasSelected() {
    return this.value && !this.hideAction;
  }

  get hasDefaultText() {
    return !this.hideAction;
  }

  get _hideAction() {
    return this.args.dropdownAction == 'hide';
  }

  get hideAction() {
    return this._hideAction || this.args.freeform;
  }

  get isStringData() {
    return this.args.options.length && typeof this.args.options[0] == 'string';
  }

  get displayDefaultText() {
    return !this.args.multiple && !this.searchValue;
  }

  get filteredOptions() {
    let options = this.options;
    if (this.args.multiple) {
      options = options.filter((option) => {
        return !this.isCurrentlySelected(option);
      });
    } else if (!this.isSearching) {
      return options;
    }
    return options.filter((option) => {
      return this.isSearchMatch(option, this.searchValue);
    });
  }

  get displayedOptions() {
    let filteredOptions = this.filteredOptions;
    if (
      this.args.allowAdditions &&
      this.searchValue &&
      filteredOptions.length == 0
    ) {
      if (this.isStringData) {
        return [this.searchValue];
      }
      return [
        {
          label: this.searchValue,
          value: this.searchValue,
        },
      ];
    } else {
      return filteredOptions;
    }
  }

  get isAddingOption() {
    return (
      this.args.allowAdditions &&
      this.searchValue &&
      this.filteredOptions.length == 0
    );
  }

  focusInput() {
    if (!this.args.search || this._dropdownDisabled) {
      return;
    }
    const input = this.wrapperElement.querySelector('input');
    if (input) {
      input.focus();
    }
  }

  scrollToItem(itemIndex) {
    const item = this.wrapperElement.querySelector(
      `[data-dropdown-index="${itemIndex}"]`
    );
    if (!item) {
      return;
    }
    item.scrollIntoView(false);
  }

  isSearchMatch(option, searchValue) {
    if (typeof option == 'string') {
      return this.stringContains(option, searchValue);
    } else if (this.args.searchProperty) {
      const optionAttribute = option[this.args.searchProperty];
      if (optionAttribute && typeof optionAttribute == 'string') {
        return this.stringContains(optionAttribute, searchValue);
      } else if (optionAttribute && typeof optionAttribute == 'number') {
        return this.stringContains(optionAttribute.toString(), searchValue);
      }
    } else {
      return (
        this.stringContains(option.label, searchValue) ||
        this.stringContains(option.value, searchValue)
      );
    }
  }

  stringContains(s1, s2) {
    if (!s2 || typeof s2 != 'string') {
      return true;
    }
    if (!s1 || typeof s1 != 'string') {
      return false;
    }
    return s1.toLowerCase().indexOf(s2.toLowerCase()) != -1;
  }

  onSelect(option) {
    this._onChange(option);
  }

  isCurrentlySelected(option) {
    if (this.args.multiple) {
      if (!Array.isArray(this.value)) {
        return false;
      }
      return this.value.indexOf(option) != -1;
    }
    return option === this.value;
  }

  @action
  setWrapperElement(element) {
    this.wrapperElement = element;
  }

  @action
  onBlur() {
    if (!this.isOpen) {
      return;
    }
    if (this.activeItem !== -1) {
      this.onSelectInternal(this.args.options[this.activeItem]);
    } else {
      this.isOpen = false;
    }
  }

  @action
  onSearchInputChange({ target }) {
    this.searchValue = target.value;
  }

  @action
  unselectOption(option) {
    this.value.removeObject(option);
  }

  @action
  onSelectInternal(option, evt) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    if (!option || this._dropdownDisabled) {
      this.isOpen = false;
    }
    const notCurrentlySelected = !this.isCurrentlySelected(option);
    if (notCurrentlySelected) {
      if (this.args.multiple) {
        if (!Array.isArray(this.value)) {
          this.value = A();
        }
        this.value.pushObject(option);
        option = this.value;
      }
    }
    if (this.hideAction || notCurrentlySelected) {
      this.onSelect(option);
    }
    if (this.isAddingOption && !this.args.hideAdditions) {
      this.options?.push?.(option);
    }
    if (this.isSearching) {
      this.searchValue = '';
    }
    if (!this.args.multiple) {
      this.isOpen = false;
    }
    this.activeItem = -1;
  }

  @action
  keyboardEscapeHandler(evt) {
    if (this._dropdownDisabled) {
      return;
    }
    const displayedOptionsLength = this.displayedOptions.length;
    const isSearchAndFoundOneResult =
      this.isSearching && displayedOptionsLength === 1;
    if (isSearchAndFoundOneResult) {
      this.activeItem = 0;
    }
    const validRange =
      this.activeItem >= 0 && this.activeItem < displayedOptionsLength;
    if (!this.isOpen) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    if (validRange) {
      this.onSelectInternal(this.displayedOptions[this.activeItem]);
    } else {
      this.isOpen = false;
    }
  }

  @action
  moveUp(evt) {
    if (!this.isOpen || this._dropdownDisabled) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    if (this.activeItem > 0) {
      this.activeItem--;
      this.scrollToItem(this.activeItem);
    }
  }

  @action
  moveDown(evt) {
    if (!this.isOpen || this._dropdownDisabled) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    if (this.activeItem < this.displayedOptions.length - 1) {
      this.activeItem++;
      this.scrollToItem(this.activeItem);
    }
  }

  @action
  onClick(evt) {
    if (!this.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();

      if (this.args.disabled) {
        return;
      }

      this.isOpen = true;
      this.activeItem = -1;
      this.focusInput();
      return;
    }

    const isMultiSelection = evt.target.closest(
      '[data-dropdown-multi-selection]'
    );
    const isDropdownItem = evt.target.closest('[data-dropdown-item]');
    if (isMultiSelection || isDropdownItem) {
      return false;
    }
    const isDropdownIcon = evt.target.closest('.dropdown.icon');
    const clickedInsideDropdownElement = evt.target.closest('.dropdown');
    if (!this.search || isDropdownIcon) {
      if (this.isOpen && (isDropdownIcon || !clickedInsideDropdownElement)) {
        this.isOpen = false;
      }
    }
  }
}
