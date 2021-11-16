import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

class ContextMenuItem {
  @tracked checked;
  @tracked label;
  @tracked disabled;
  @tracked isDivider;
  @tracked isCheckbox;
  @tracked iconClass;
  @tracked priority;
  action;
}

export default class ContextMenuService extends Service {
  @tracked
  registeredClients = A();

  get contextItems() {
    return this.rawContextItems.sort((a, b) => {
      if (a.priority > b.priority) {
        return -1;
      } else if (a.priority < b.priority) {
        return 1;
      }
      if (a.label > b.label || !b.label) {
        return 1;
      } else if (a.label < b.label || !a.label) {
        return -1;
      }
      return 0;
    });
  }

  get rawContextItems() {
    const rawContextItems = A();
    this.registeredClients.forEach((client) => {
      client.contextItems.forEach((item) => {
        const menuItem = new ContextMenuItem();
        menuItem.checked = item.checked;
        menuItem.label = item.label;
        menuItem.disabled = item.disabled;
        menuItem.isDivider = item.isDivider;
        menuItem.isCheckbox = item.isCheckbox;
        menuItem.iconClass = item.iconClass;
        menuItem.priority = item.priority ?? 10;
        menuItem.action = item.action;
        rawContextItems.addObject(menuItem);
      });
    });
    return rawContextItems;
  }

  addClient(client) {
    this.registeredClients.addObject(client);
  }

  removeClient(client) {
    this.registeredClients.removeObject(client);
  }
}
