import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import KeyboardShortcutMixin from 'ember-nrg-ui/mixins/global-keyboard-shortcut';
import layout from '../../templates/components/nrg-lightbox-container/keyboard-shortcuts';

export default Component.extend(KeyboardShortcutMixin, {
  layout,
  lightboxService: service('lightbox'),

  shortcutHeader: 'Photo Lightbox',
  keyboardShortcuts: [
    {
      key: 'ArrowLeft',
      actionName: 'leftPressed',
      description: 'Previous Photo',
    },
    {
      key: 'ArrowRight',
      actionName: 'rightPressed',
      description: 'Next Photo',
    },
  ],

  previousDisabled: alias('lightboxService.previousDisabled'),
  nextDisabled: alias('lightboxService.nextDisabled'),

  actions: {
    leftPressed() {
      if (!this.previousDisabled) {
        this.lightboxService.selectPrevious();
      }
    },
    rightPressed() {
      if (!this.nextDisabled) {
        this.lightboxService.selectNext();
      }
    },
  },
});
