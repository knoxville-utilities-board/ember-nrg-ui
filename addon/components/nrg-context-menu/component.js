import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',
  contextService: service('context-menu'),
  options: alias('contextService.contextItems'),

  itemSelected(selected) {
    selected.client.send(selected.actionName, selected);
  },
  itemChecked(selected, checked) {
    selected.client.send(selected.actionName, selected, checked);
  },
});
