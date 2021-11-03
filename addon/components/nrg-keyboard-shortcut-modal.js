import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { alias, mapBy, uniq, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import KeyboardShortcutMixin from 'ember-nrg-ui/mixins/global-keyboard-shortcut';
import specialCharacterConversion from '../utils/special-characters';
import layout from '../templates/components/nrg-keyboard-shortcut-modal';

export default Component.extend(KeyboardShortcutMixin, {
  layout,
  keyboardService: service('keyboard-shortcut'),
  isOpen: alias('keyboardService.modalIsOpen'),

  keyboardShortcuts: [
    {
      key: 'Slash',
      shft: true,
      priority: 40,
      actionName: 'openKeyboardHelp',
      description: 'Show Keyboard Help',
    },
  ],

  shortcuts: alias('keyboardService.shortcuts'),
  mappedShortcuts: computed('shortcuts.[]', function() {
    return this.shortcuts.map(shortcut => {
      const modKeys = [];
      if (shortcut.ctrl) {
        modKeys.push('Ctrl');
      }
      if (shortcut.alt) {
        modKeys.push('Alt');
      }
      if (shortcut.shft) {
        modKeys.push('Shft');
      }
      const keys = [];
      if (shortcut.lastCode) {
        keys.push(this.getCharacter(shortcut.lastCode, shortcut.shft));
      }
      keys.push(this.getCharacter(shortcut.code, shortcut.shft));

      return {
        modKeys,
        keys,
        header: shortcut.header,
        description: shortcut.description,
      };
    });
  }),
  headers: mapBy('mappedShortcuts', 'header'),
  uniqHeaders: uniq('headers'),

  shortcutSegments: computed('uniqHeaders', 'mappedShortcuts', function() {
    const mappedShortcuts = this.mappedShortcuts;
    const headers = this.uniqHeaders;
    return headers.map(header => {
      const shortcuts = A(mappedShortcuts).filterBy('header', header);
      return {
        header,
        shortcuts,
      };
    });
  }),
  segmentSort: ['header:asc'],
  sortedSegments: sort('shortcutSegments', 'segmentSort'),

  getCharacter(code, shift) {
    let key = '';
    const conversionType = shift ? specialCharacterConversion.shift : specialCharacterConversion.default;

    if (conversionType[code] !== undefined) {
      key = conversionType[code];
    } else {
      key = String.fromCharCode(code);
    }

    return key.toUpperCase();
  },
  actions: {
    openKeyboardHelp() {
      this.set('isOpen', true);
    },
  },
});
