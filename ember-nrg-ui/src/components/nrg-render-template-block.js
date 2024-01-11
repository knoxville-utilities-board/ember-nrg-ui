import { action } from '@ember/object';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from '../utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgRenderTemplateBlockComponent extends Component {
  mutationObserver;
  captureElement;

  removeIdsInDomTree(node) {
    node.id = '';
    const children = node.children || [];
    for (let i = 0; i < children.length; i++) {
      this.removeIdsInDomTree(children[i]);
    }
  }

  updateParent() {
    const clonedNode = this.captureElement.cloneNode(true);
    this.removeIdsInDomTree(clonedNode);
    this.args.templateRendered?.(clonedNode);
  }

  @action
  setupMutationObserver(element) {
    this.captureElement = element;
    const callback = () => this.updateParent();
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    };

    this.mutationObserver = new MutationObserver(callback);
    this.mutationObserver.observe(element, config);
    this.updateParent();
  }

  @action
  teardownMutationObserver() {
    this.mutationObserver?.disconnect();
  }
}
