import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, and, not, readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import ResizeMixin from 'ember-nrg-ui/mixins/resize';
import layout from './template';

const isIE11 = !window.ActiveXObject && 'ActiveXObject' in window;
const useFlexBox = !isIE11;

export default Component.extend(ResizeMixin, {
  layout,

  tagName: '',

  modalService: service('modal'),

  isTesting: readOnly('modal.isTesting'),
  isOpen: alias('modal.isOpen'),
  isActive: alias('modal.isActive'),
  renderInPlace: alias('modal.renderInPlace'),
  hasMovedDom: alias('modal.hasMovedDom'),

  masterDetail: alias('modal.masterDetail'),
  sidebar: alias('modal.sidebar'),
  basic: alias('modal.basic'),
  lightbox: alias('modal.lightbox'),
  modalClass: alias('modal.modalClass'),
  dimmerClass: alias('modal.dimmerClass'),
  scrolling: alias('modal.scrolling'),
  notSidebar: not('sidebar'),
  hasCloseIcon: and('dismissable', 'notSidebar'),
  dismissable: alias('modal.dismissable'),

  modalStyles: computed('modalElement', function() {
    if (useFlexBox || !this.modalElement || this.masterDetail || this.sidebar || this.lightbox) {
      return '';
    }
    const marginTop = this.modalElement.offsetHeight / 2;
    const marginLeft = this.modalElement.offsetWidth / 2;
    return htmlSafe(
      `margin-top: -${marginTop}px; margin-left: -${marginLeft}px;`
    );
  }),

  didResize() {
    this.notifyPropertyChange('modalStyles');
  },

  _modalClass: computed(
    'sidebar',
    'basic',
    'lightbox',
    'modalClass',
    'masterDetail',
    function() {
      const appliedClasses = [];
      if (this.sidebar) {
        appliedClasses.push('sidebar-modal');
      }
      if (this.lightbox) {
        appliedClasses.push('fullscreen');
        appliedClasses.push('lightbox');
      }
      if (this.modalClass) {
        appliedClasses.push(this.modalClass);
      }
      if (this.basic) {
        appliedClasses.push('basic');
      }
      if (this.masterDetail) {
        appliedClasses.push('master-detail--takeover');
      }
      return appliedClasses.join(' ');
    }
  ),

  _contentClass: computed(
    'sidebar',
    'lightbox',
    'renderInPlace',
    'masterDetail',
    'scrolling',
    function() {
      const appliedClasses = ['modal-content'];
      if (this.lightbox) {
        appliedClasses.push('image');
      }
      if (!this.sidebar) {
        appliedClasses.push('content');
      }
      if (this.scrolling) {
        appliedClasses.push('scrolling');
      }
      return appliedClasses.join(' ');
    }
  ),

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

  modalElementAdded(element) {
    this.set('modalElement', element);

    if (useFlexBox || this.masterDetail || this.sidebar || this.lightbox) {
      return;
    }

    const config = {
      attributes: false,
      childList: true,
      subtree: true,
    };
    this.modalMutationObserver = new MutationObserver(() => {
      this.notifyPropertyChange('modalStyles');
    });
    const observedElement = element.querySelector('.modal-content');
    this.modalMutationObserver.observe(observedElement, config);
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.modalMutationObserver) {
      this.modalMutationObserver.disconnect();
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
