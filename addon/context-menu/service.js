import { isNone } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import EmberObject, { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { A } from '@ember/array';
import Service from '@ember/service';

export default Service.extend({
  registeredClients: A(),

  contextItems: sort('rawContextItems', 'contextItemSort'),

  contextItemSort: ['priority:desc', 'baseLabel:asc'],

  rawContextItems: computed('registeredClients.[]', 'registeredClients.@each.contextItems', function() {
    const rawContextItems = A();
    this.get('registeredClients').forEach(client => {
      client.get('contextItems').forEach(item => {
        const contextItem = EmberObject.create(item);
        contextItem.set('client', client);
        contextItem.set('baseLabel', item.label);
        if (item.isCheckbox && item.iconClass) {
          contextItem.set('label', htmlSafe(`<i class='${item.iconClass} icon'></i>${item.label}`));
        }
        if (isNone(item.priority)) {
          contextItem.set('priority', 10);
        }
        rawContextItems.addObject(contextItem);
      });
    });
    return rawContextItems;
  }),

  addClient(client) {
    this.get('registeredClients').addObject(client);
  },
  removeClient(client) {
    this.get('registeredClients').removeObject(client);
  },
});
