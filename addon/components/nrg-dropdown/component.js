import { A } from '@ember/array';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { and, equal, not, notEmpty, or, readOnly, reads } from '@ember/object/computed';
import { on } from '@ember/object/evented';
import { next } from '@ember/runloop';
import { EKFirstResponderOnFocusMixin, EKMixin, keyDown } from 'ember-keyboard';
import Validation from 'ember-nrg-ui/mixins/validation';
import layout from './template';

export default Component.extend(Validation, EKMixin, EKFirstResponderOnFocusMixin, {
  layout,
  tagName: 'div',
  attributeBindings : ['tabindex'],

  tabindex: computed('search', function() {
    return this.search ? null : "0";
  }),

  defaultText: 'Select an Option',
  disabled: false,
  loading: false,
  dropdownAction: 'activate',
  direction: undefined,
  allowTab: true,
  selected: null,
  forceSelection: false,
  showOnFocus: true,
  allowAdditions: false,
  isAddingOption: false,
  hideAdditions: true,
  menuDirection: '',
  match: 'both',
  isOpen: false,
  searchProperty: undefined,
  activeItem: -1,
  _dropdownDisabled: or('disabled', 'loading'), 

  classNames: ['ui', 'dropdown'],
  classNameBindings: [
    'selection',
    'search',
    'search:selection',
    'loading',
    'loading:disabled',
    'disabled',
    'isOpen:active',
    'isOpen:visible',
    'multiple',
  ],

  _selection: notEmpty('field'),
  selection: reads('_selection'),

  _hideAction: equal('dropdownAction', 'hide'),
  hideAction: or('_hideAction', 'freeform'),
  notHideAction: not('hideAction'),
  hasSelected: and('selected', 'notHideAction'),
  hasDefaultText: readOnly('notHideAction'),
  isSearching: and('search', 'searchValue'),
  isStringData: computed('options', function() {
    return this.get('options.length') && typeof this.options[0] == 'string';
  }),

  searchPlaceholder: computed('activeItem', function() {
    if (this.activeItem === -1 || this.multiple || !this.isSearching) {
      return '';
    }
    const option = this.displayedOptions[this.activeItem];
    if (this.isStringData) {
      return option || '';
    }
    
    if (!option) {
      return '';
    }

    if (!option.label) {
      const item = this.element.querySelector(`[data-dropdown-index="${this.activeItem}"]`);
      if (item) {
        const text = item.textContent;
        return text && text.trim() || '';
      }
    }
    return option.label || ''
  }),

  init() {
    this._super(...arguments);
    this.optionsObserver();
  },

  didInsertElement() {
    this._super(...arguments);
    this.createClickHandler();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeWindowClickListener();
  },

  addWindowClickListener() {
    document.addEventListener('click', this._clickHandler, true);
  },

  removeWindowClickListener() {
    document.removeEventListener('click', this._clickHandler, true);
  },

  createClickHandler() {
    this.set('_clickHandler', evt => {
      if (this.element && !this.element.contains(evt.target)) {
        if (this.activeItem !== -1) {
          this._onSelect(this.options[this.activeItem]);
        }
        this.closeDropdown();
        this.set('activeItem', -1);
      }
      return true;
    });
  },

  openDropdown() {
    if (this.isOpen) {
      return;
    }
    this.set('isOpen', true);
    this.addWindowClickListener();
    this.focusInput(true);
  },

  closeDropdown() {
    if (!this.isOpen) {
      return;
    }
    this.set('isOpen', false);
    this.focusInput(false);
    this.removeWindowClickListener();
  },

  optionsObserver: observer('options', function() {
    this.set('activeItem', -1);

    next(() => {
      if (this.forceSelection && !this.hasSelected && this.get('options.length')) {
        this._onSelect(this.options[0]);
      }
    });
  }),

  keyboardEscapeHandler: on(keyDown('Enter'), keyDown('NumpadEnter'), keyDown('Tab'), keyDown('Escape'), function(evt) {
    if (this._dropdownDisabled) {
      return;
    }
    const displayedOptionsLength = this.get('displayedOptions.length');
    const isSearchAndFoundOneResult = this.isSearching && displayedOptionsLength === 1;
    if(isSearchAndFoundOneResult) {
      this.set('activeItem', 0);
    }
    const validRange = this.activeItem >= 0 && this.activeItem < displayedOptionsLength;
    if (!this.isOpen) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    if (validRange) {
      this._onSelect(this.displayedOptions[this.activeItem]);
    } else {
      this.closeDropdown();
    }
  }),

  moveUp: on(keyDown('ArrowUp'), function(evt) {
    if (!this.isOpen || this._dropdownDisabled) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    if (this.activeItem > 0) {
      this.decrementProperty('activeItem');
      this.scrollToItem(this.activeItem);
    }
  }),

  moveDown: on(keyDown('ArrowDown'), function(evt) {
    if (!this.isOpen || this._dropdownDisabled) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    if (this.activeItem < this.get('displayedOptions.length') - 1) {
      this.incrementProperty('activeItem');
      this.scrollToItem(this.activeItem);
    }
  }),
  
  scrollToItem(itemIndex) {
    const item = this.element.querySelector(`[data-dropdown-index="${itemIndex}"]`);
    if (!item) {
      return;
    }
    item.scrollIntoView(false);
  },

  menuClass: computed('menuDirection', 'isOpen', function() {
    let computedClasses = '';
    if (this.menuDirection) {
      computedClasses += ` ${this.menuDirection}`;
    }
    if (this.isOpen) {
      computedClasses += ' transition visible';
    } else {
      computedClasses += ' transition hidden';
    }
    return computedClasses;
  }),

  textClass: computed('hasSelected', 'hasDefaultText', 'isSearching', function() {
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
  }),

  displayedOptions: computed(
    'options',
    'selected.[]',
    'searchValue',
    'isSearching',
    'allowAdditions',
    'hideAdditions',
    function() {
      this.set('isAddingOption', false);
      let options = this.options;
      if (this.multiple) {
        options = options.filter(option => {
          return !this.isCurrentlySelected(option);
        });
      } else if (!this.isSearching) {
        return options;
      }
      const filteredOptions = options.filter(option => {
        return this.isSearchMatch(option, this.searchValue);
      });
      if (this.allowAdditions && filteredOptions.length == 0) {
        this.set('isAddingOption', true);
        if (this.isStringData) {
          return [this.searchValue]
        }
        return [{
          label: this.searchValue,
          value: this.searchValue,
        }];
      } else {
        return filteredOptions;
      }
    }
  ),

  isSearchMatch(option, searchValue) {
    if (typeof option == 'string') {
      return this.stringContains(option, searchValue);
    } else if (this.searchProperty) {
      const optionAttribute = option[this.searchProperty]
      if(optionAttribute && typeof optionAttribute == 'string'){
        return this.stringContains(optionAttribute, searchValue);
      } else if (optionAttribute && typeof optionAttribute == 'number'){
        return this.stringContains(optionAttribute.toString(), searchValue);
      }
    } else {
      return this.stringContains(option.label, searchValue) || this.stringContains(option.value, searchValue);
    }
  },

  stringContains(s1, s2) {
    if (!s2 || typeof s2 != 'string') {
      return true;
    }
    if (!s1 || typeof s1 != 'string') {
      return false;
    }
    return s1.toLowerCase().indexOf(s2.toLowerCase()) != -1;
  },

  mouseDown(evt) {
    const isMultiSelection = evt.target.closest('[data-dropdown-multi-selection]');
    const isDropdownItem = evt.target.closest('[data-dropdown-item]');
    if (isMultiSelection || isDropdownItem) {
      return false;
    }
    const isDropdownIcon = evt.target.closest('.dropdown.icon');
    if (this.search && !this.isOpen) {
      this.openDropdown();
    } else if (!this.search || isDropdownIcon) {
      if (this.isOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    }
  },

  focusIn() {
    if (this._dropdownDisabled) {
      return;
    }
    if (this.showOnFocus) {
      this.openDropdown()
    }
    if (this.search) {
      this.focusInput(true);
    }
  },

  focusOut(evt) {
    if (evt.target && evt.target.closest('.dropdown')) {
      return;
    }
    this.closeDropdown();
  },

  focusInput(focus) {
    if (!this.search || this._dropdownDisabled) {
      return;
    }
    const input = this.element.querySelector('input');
    if (focus) {
      next(() => {
        input.focus();
      });
    } else {
      this.set('searchValue', '');
      input.blur();
    }
  },

  onSearchInputChange() {
    this.openDropdown();
  },

  isCurrentlySelected(option) {
    if (this.multiple) {
      if (!Array.isArray(this.selected)) {
        return false;
      }
      return this.selected.indexOf(option) != -1;
    } else {
      return option === this.selected;
    }
  },

  unselectOption(option) {
    this.selected.removeObject(option);
  },

  _onSelect(option) {
    if (!option || this._dropdownDisabled) {
      this.closeDropdown();
    }
    const notCurrentlySelected = !this.isCurrentlySelected(option);
    if (notCurrentlySelected) {
      if (this.multiple) {
        if (!Array.isArray(this.selected)) {
          this.set('selected', A());
        }
        this.selected.pushObject(option);
      } else {
        this.set('selected', option);
      }
    }
    if (this.hideAction || notCurrentlySelected) {
      this.onSelect(option);
    }
    if (this.isSearching) {
      this.set('searchValue', '');
    }
    if (this.isAddingOption && !this.hideAdditions) {
      this.get('options.push') && this.options.push(option);
    }
    if (!this.multiple) {
      this.closeDropdown();
    }
    this.set('isAddingOption', false);
    this.set('activeItem', -1);
  },

  onSelect(option) {
    this.sendAction('action', option);
  },
});
