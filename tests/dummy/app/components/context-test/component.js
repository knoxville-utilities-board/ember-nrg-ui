//BEGIN-SNIPPET context-menu-example
import Component from '@ember/component';
import ContextMenuMixin from 'ember-nrg-ui/mixins/context-menu';

export default Component.extend(ContextMenuMixin, {
  tagName: '',

  contextItems: [{
    label: 'Context Item',
    actionName: 'contextCounter',
    disabled: false,
  }, {
    label: 'Context Item With Icon',
    actionName: 'contextCounter',
    disabled: false,
    priority: 7, // Changes the order of the context items
    iconClass: 'settings',
  }, {
    label: 'Disabled Context Item',
    actionName: 'contextCounter',
    disabled: true,
  }, {
    isCheckbox: true,
    checked: true,
    priority: 21,
    label: 'Context Item w/ Checkbox',
    actionName: 'contextChecked',
    disabled: false,
  }, {
    isCheckbox: true,
    checked: false,
    label: 'Context Item w/ Checkbox and Icon',
    actionName: 'contextCheckedIcon',
    disabled: false,
    iconClass: 'settings',
  }, {
    isCheckbox: true,
    checked: false,
    priority: 14,
    label: 'Disabled Context Item w/ Checkbox',
    actionName: 'contextCheckedDisabled',
    disabled: true,
  }, {
    isDivider: true,
    priority: 2,
  }],

  counter: 0,

  checked: true,

  checkedIcon: false,

  checkedDisabled: false,

  actions: {
    contextCounter() {
      this.incrementProperty('counter');
    },
    contextChecked(item, checked) {
      this.set('checked', checked);
    },
    contextCheckedIcon(item, checked) {
      this.set('checkedIcon', checked);
    },
    contextCheckedDisabled(item, checked) {
      this.set('checkedDisabled', checked);
    },
  },
});
//END-SNIPPET
