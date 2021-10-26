import Component from '@ember/component';
import layout from '../templates/components/nrg-render-template-block';

export default Component.extend({
  layout,
  classNames: ['is-visually-hidden'],

  getTemplateNode() {
    return this.element.querySelector('.js-capture-node');
  },

  setupMutationObserver() {
    const callback = () => this.updateParent();
    const node = this.getTemplateNode();
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
    };

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
