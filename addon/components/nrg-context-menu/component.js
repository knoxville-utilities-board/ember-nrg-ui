import {
  alias
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  contextService: service('context-menu'),

  options: alias('contextService.contextItems'),

  actions: {
    itemSelected(selected) {
      selected.client.send(selected.actionName, selected);
    },
    itemChecked(selected, checked) {
      selected.client.send(selected.actionName, selected, checked);
    },
  },
});
