import { A } from '@ember/array';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { and, equal, not, notEmpty, readOnly, reads } from '@ember/object/computed';
import { on } from '@ember/object/evented';
import { next } from '@ember/runloop';
import { EKFirstResponderOnFocusMixin, EKMixin, keyDown } from 'ember-keyboard';
import Validation from 'ember-nrg-ui/mixins/validation';
import layout from './template';

export default Component.extend(
  Validation,
  EKMixin,
  EKFirstResponderOnFocusMixin,
  {
    layout,
    tagName: 'div',

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

    hideAction: equal('dropdownAction', 'hide'),
    notHideAction: not('hideAction'),
    hasSelected: and('selected', 'notHideAction'),
    hasDefaultText: readOnly('notHideAction'),
    isSearching: and('search', 'searchValue'),
    isStringData: computed('options', function(){
      return this.get('options.length') && typeof this.options[0] == 'string';
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
      document.addEventListener('click', this.get('_clickHandler'), true);
    },

    removeWindowClickListener() {
      document.removeEventListener('click', this.get('_clickHandler'));
    },

    createClickHandler() {
      this.set('_clickHandler', evt => {
        if (this.element && !this.element.contains(evt.target)) {
          this.set('isOpen', false);
          this.set('activeItem', -1);
          this.focusInput(false);
        }
        return true;
      });
    },

    isOpenObserver: observer('isOpen', function() {
      next(() => {
        if (this.get('isOpen')) {
          this.addWindowClickListener();
        } else {
          this.removeWindowClickListener();
        }
      });
    }),

    optionsObserver: observer('options', function() {
      this.set('activeItem', -1);

      next(() => {
        if (
          this.forceSelection &&
          !this.hasSelected &&
          this.get('options.length')
        ) {
          this.select(this.options[0]);
        }
      });
    }),

    moveUp: on(keyDown('ArrowUp'), function(evt) {
      if (!this.isOpen) {
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      if (this.activeItem > 0) {
        this.decrementProperty('activeItem');
      }
    }),

    moveDown: on(keyDown('ArrowDown'), function(evt) {
      if (!this.isOpen) {
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      if (this.activeItem < this.get('displayedOptions.length') - 1) {
        this.incrementProperty('activeItem');
      }
    }),

    enter: on(keyDown('Enter'), function(evt) {
      const validRange = this.activeItem >= 0 && this.activeItem < this.get('displayedOptions.length');
      if (!this.isOpen || !validRange) {
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      this.select(this.displayedOptions[this.activeItem]);
    }),

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

    textClass: computed(
      'hasSelected',
      'hasDefaultText',
      'isSearching',
      function() {
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
    ),

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
        if(this.multiple){
          options = options.filter(option => {
            return !this.isCurrentlySelected(option);
          });
        }
        if (!this.isSearching) {
          return options;
        } else {
          const filteredOptions = options.filter(option => {
            return this.isSearchMatch(option, this.searchValue);
          });
          if(this.allowAdditions && filteredOptions.length == 0){
            this.set('isAddingOption', true);
            const addedOption = this.isStringData ? this.searchValue : {
              label: this.searchValue,
              value: this.searchValue,
            };
            return [addedOption];
          } else {
            return filteredOptions;
          }
        }
      }
    ),

    isSearchMatch(option, searchValue) {
      if (typeof option == 'string') {
        return this.stringContains(option, searchValue);
      } else if (this.searchProperty) {
        return this.stringContains(option[this.searchProperty], searchValue);
      } else {
        return (
          this.stringContains(option.label, searchValue) ||
          this.stringContains(option.value, searchValue)
        );
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

    click(evt) {
      var isMultiSelection = evt.target.closest('[data-dropdown-multi-selection]');
      var isDropdownItem = evt.target.closest('[data-dropdown-item]');
      if(isMultiSelection || isDropdownItem){
        return;
      }
      if (this.isOpen) {
        this.set('isOpen', false);
      } else {
        this.set('isOpen', true);
        this.focusInput(true);
      }
    },

    focusInput(focus) {
      if(!this.search){
        return;
      }
      const input = this.element.querySelector('input');
      if (focus) {
        input.focus();
      } else {
        this.set('searchValue', '');
        input.blur();
      }
    },

    isCurrentlySelected(option){
      if(this.multiple){
        if(!Array.isArray(this.selected)){
          return false;
        }
        return this.selected.indexOf(option) != -1;
      } else {
        return option === this.selected;
      }
    },

    unselectOption(option){
      this.selected.removeObject(option);
    },

    select(option) {
      const notCurrentlySelected = !this.isCurrentlySelected(option);
      const hideDropdownAction = this.dropdownAction === 'hide';
      if (notCurrentlySelected) {
        if(this.multiple){
          if(!Array.isArray(this.selected)){
            this.set('selected', A());
          }
          this.selected.pushObject(option);
        } else {
          this.set('selected', option);
        }
      }
      if (hideDropdownAction || notCurrentlySelected) {
        this.onSelect(option);
      }
      if (this.isSearching) {
        this.set('searchValue', '');
      }
      if(this.isAddingOption && !this.hideAdditions){
        this.get('options.push') && this.options.push(option);
      }
      if(!this.multiple){
        this.set('isOpen', false);
        this.focusInput(false);
      }
      this.set('isAddingOption', false);
      this.set('activeItem', -1);
    },

    onSelect(option) {
      this.sendAction('action', option);
    },
  }
);
