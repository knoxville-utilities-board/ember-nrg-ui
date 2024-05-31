import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ContextMenuService extends Service {
  @tracked
  contextMenus = A();

  get currentContextMenu() {
    return this.contextMenus.lastObject;
  }

  addContextMenu(element: HTMLElement) {
    this.contextMenus.addObject(element);
  }

  removeContextMenu(element: HTMLElement) {
    this.contextMenus.removeObject(element);
  }
}
