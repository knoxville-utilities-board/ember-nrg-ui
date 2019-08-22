import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNames: ['ui hidden message'],
  layout,
  getTemplateNode() {
    return this.element.querySelector('.js-capture-node');
  },

  setupMutationObserver() {
    const callback = () => this.updateParent();
    const node = this.getTemplateNode();
    const config = { attributes: true, childList: true, subtree: true };

    this.mutationObserver = new MutationObserver(callback);
    this.mutationObserver.observe(node, config);
  },

  teardownMutationObserver() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  },

  removeIdsInDomTree(node) {
    node.id = '';
    const children = node.children || [];
    for (let i = 0; i < children.length; i++) {
      this.removeIdsInDomTree(children[i]);
    }
  },

  updateParent() {
    const clonedNode = this.getTemplateNode().cloneNode(true);
    this.removeIdsInDomTree(clonedNode);
    this.templateRendered && this.templateRendered(clonedNode);
  },

  didInsertElement() {
    this._super(...arguments);
    this.setupMutationObserver();
  },

  didRender() {
    this._super(...arguments);
    this.updateParent();
  },

  willDestroyElement() {
    this.teardownMutationObserver();
    this._super(...arguments);
  },
});
