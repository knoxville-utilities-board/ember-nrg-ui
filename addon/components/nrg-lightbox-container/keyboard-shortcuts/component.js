import Component from '@ember/component';
import {
  alias
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service';
import KeyboardShortcutMixin from 'ember-nrg-ui/mixins/global-keyboard-shortcut';

export default Component.extend(KeyboardShortcutMixin, {
  lightboxService: service('lightbox'),

  shortcutHeader: "Photo Lightbox",
  keyboardShortcuts: [{
    key: 'ArrowLeft',
    actionName: 'leftPressed',
    description: "Previous Photo",
  }, {
    key: 'ArrowRight',
    actionName: 'rightPressed',
    description: "Next Photo",
  }],

  previousDisabled: alias('lightboxService.previousDisabled'),
  nextDisabled: alias('lightboxService.nextDisabled'),

  actions: {
    leftPressed() {
      if (!this.get('previousDisabled')) {
        this.get('lightboxService').selectPrevious();
      }
    },
    rightPressed() {
      if (!this.get('nextDisabled')) {
        this.get('lightboxService').selectNext();
      }
    },
  },
});
