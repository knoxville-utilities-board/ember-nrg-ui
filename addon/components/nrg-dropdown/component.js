import {
  computed
} from '@ember/object';
import {
  notEmpty
} from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';
import Validation from 'ember-nrg-ui/mixins/validation';

export default Component.extend(Validation, {
  layout,
  tagName: 'span',

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
  hideAdditions: true,
  menuDirection: '',

  selection: notEmpty('field'),

  _dropdownClass: computed('selection', 'loading', 'disabled', 'showError', 'class', function() {
    let computedClasses = '';
    if (this.get('selection') || this.get('search')) {
      computedClasses += ' selection';
    }
    if (this.get('search')) {
      computedClasses += ' search';
    }
    if (this.get('loading')) {
      computedClasses += ' loading';
    }
    if (this.get('disabled') || this.get('loading')) {
      computedClasses += ' disabled';
    }
    if (this.get('class')) {
      computedClasses += ` ${this.get('class')}`;
    }
    return computedClasses;
  }),

  actions: {
    select(option) {
      const notSelected = option !== this.get('selected');
      const hideDropdownAction = this.get('dropdownAction') === 'hide';
      const shouldHideDropdown = this.get('dropdownAction') !== 'nothing';
      if (notSelected) {
        this.set('selected', option);
      }
      if (hideDropdownAction || notSelected) {
        this.sendAction('action', option);
      }
      if(shouldHideDropdown){
        this.$('.dropdown').dropdown('hide');
      }
    },
  },
});
