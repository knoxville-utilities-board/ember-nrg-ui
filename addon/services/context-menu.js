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

  disabled: false,

  rawContextItems: computed('registeredClients.[]', 'registeredClients.@each.contextItems', function() {
    const rawContextItems = A();
    this.registeredClients.forEach(client => {
      client.contextItems.forEach(item => {
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
    this.registeredClients.addObject(client);
  },
  removeClient(client) {
    this.registeredClients.removeObject(client);
  },
});
