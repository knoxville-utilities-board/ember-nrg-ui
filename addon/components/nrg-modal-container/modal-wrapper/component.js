import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, and, not, readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import layout from './template';
export default Component.extend({
  layout,

  tagName: '',

  modalService: service('modal'),

  isTesting: readOnly('modal.isTesting'),
  isOpen: alias('modal.isOpen'),
  isActive: alias('modal.isActive'),
  renderInPlace: alias('modal.renderInPlace'),
  hasMovedDom: alias('modal.hasMovedDom'),

  sidebar: alias('modal.sidebar'),
  basic: alias('modal.basic'),
  lightbox: alias('modal.lightbox'),
  modalClass: alias('modal.modalClass'),
  dimmerClass: alias('modal.dimmerClass'),

  notSidebar: not('sidebar'),
  hasCloseIcon: and('dismissable', 'notSidebar'),
  dismissable: alias('modal.dismissable'),

  _modalClass: computed(
    'sidebar',
    'basic',
    'lightbox',
    'modalClass',
    function() {
      let appliedClass = '';
      if (this.sidebar) {
        appliedClass += ' sidebar-modal';
      }
      if (this.lightbox) {
        appliedClass += ' fullscreen lightbox';
      }
      appliedClass += ' ' + this.modalClass;
      if (this.basic) {
        appliedClass += ' basic';
      }
      return appliedClass;
    }
  ),

  _contentClass: computed('sidebar', 'lightbox', 'renderInPlace', function() {
    let appliedClasses = ['modal-content'];
    if (this.lightbox) {
      appliedClasses.push('image');
    }
    if (!this.sidebar) {
      appliedClasses.push('content');
    }
    if (!this.renderInPlace) {
      appliedClasses.push('scrolling');
    }
    return appliedClasses.join(' ');
  }),

  addModalToWormhole(element) {
    if (this.hasMovedDom || this.renderInPlace || this.isTesting) {
      return;
    }
    this.contentNode = this.modal.element.querySelector('.modal-js');
    this._parentContentNode = element;
    element.appendChild(this.contentNode);
    this.set('hasMovedDom', true);
  },

  removeModalFromWormhole() {
    if (!this.hasMovedDom) {
      return;
    }
    if (!this.modal || this.modal.isDestroying || !this.modal.element) {
      this._parentContentNode.removeChild(this.contentNode);
    } else {
      this.modal.element.appendChild(this.contentNode);
      this.modalService.remove(this);
      this.set('hasMovedDom', false);
    }
  },

  onHide() {
    this.modal.onHide();
  },

  _onPrimary() {
    this.modal._onPrimary();
  },

  _onSecondary() {
    this.modal._onSecondary();
  },
});
