import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class NrgContextMenuComponent extends Component {
  @service('context-menu')
  contextService;

  @tracked
  elements;

  @action
  onInsert(element) {
    this.elements = {
      topElement: element.querySelector('.top'),
      bottomElement: element.querySelector('.bottom'),
    };
    this.contextService.addContextMenu(this.elements);
  }

  @action
  onDestroy() {
    this.contextService.removeContextMenu(this.elements);
  }
}
