import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ContextMenuService extends Service {
  @tracked
  contextMenus = A();

  get currentContextMenu() {
    return this.contextMenus.lastObject;
  }

  addContextMenu(elements) {
    this.contextMenus.addObject(elements);
  }

  removeContextMenu(elements) {
    this.contextMenus.removeObject(elements);
  }
}
