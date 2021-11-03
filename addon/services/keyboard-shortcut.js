import Service from '@ember/service';
import {
  keyDown,
  EKMixin,
  EKOnInitMixin
} from 'ember-keyboard';
import { A, isArray } from '@ember/array';
import { computed } from '@ember/object';
import { on } from '@ember/object/evented';
import { sort } from '@ember/object/computed';
import { assert } from '@ember/debug';
import modifierKeys from '../utils/modifier-keys';

export default Service.extend(EKMixin, EKOnInitMixin, {
  registeredClients: A(),
  lastCode: null,

  modalIsOpen: false,

  shortcuts: sort('_shortcuts', 'shortcutsSort'),
  shortcutsSort: ['priority:desc', 'shortcutRegisteredTime:asc', 'description:asc'],

  _shortcuts: computed('registeredClients.[]', function() {
    const shortcuts = A();
    this.registeredClients.forEach(client => {
      shortcuts.addObjects(client.get('_mappedShortcuts'));
    });
    return shortcuts;
  }),

  keyTrigger: on(keyDown(), function(event) {
    const code = event;
    const lastCode = this.lastCode;

    // Ignore modifier keys
    if (modifierKeys.includes(code)) {
      return;
    }

    const firstMatchingShortcut = this.shortcuts.find(shortcut => {
      const altMatch = (event.altKey || false) == shortcut.alt;
      const shftMatch = (event.shiftKey || false) == shortcut.shft;
      const ctrlOrMeta = event.ctrlKey || event.metaKey;
      const ctrlMatch = shortcut.ctrl ? ctrlOrMeta : !ctrlOrMeta;
      const modKeysMatch = altMatch && shftMatch && ctrlMatch;

      const codeMatch = code == shortcut.code;
      const lastCodeMatch = lastCode == shortcut.lastCode;
      const lastCodeTrueMatch = shortcut.lastCode ? lastCodeMatch : true;

      return modKeysMatch && codeMatch && lastCodeTrueMatch;
    });
    if (firstMatchingShortcut) {
      this.set('modalIsOpen', false);
      firstMatchingShortcut.client.send(firstMatchingShortcut.actionName, event);
      this.set('lastCode', null);
      event.preventDefault();
    } else {
      this.set('lastCode', code);
    }
  }),

  mapClientShortcuts(client) {
    const shortcutRegisteredTime = client.get('shortcutRegisteredTime');
    const clientHeader = client.get('shortcutHeader');
    return client.get('keyboardShortcuts').map(clientShortcut => {
      let code = clientShortcut.key;
      let lastCode = null;

      if (isArray(clientShortcut.key)) {
        assert('Chained shortcuts longer than two keys are not currently supported.', clientShortcut.key.length == 2);
        lastCode = clientShortcut.key[0];
        code = clientShortcut.key[1];
      }
      const header = clientShortcut.header || clientHeader || '';

      assert('Shortcuts must have a description', clientShortcut.description);
      return {
        client,
        code,
        lastCode,
        header,
        shortcutRegisteredTime,
        priority: clientShortcut.priority || 10,
        description: clientShortcut.description,
        alt: clientShortcut.alt || false,
        ctrl: clientShortcut.ctrl || false,
        shft: clientShortcut.shft || false,
        actionName: clientShortcut.actionName,
      };
    });
  },

  registerKeyboardShortcuts(client) {
    client.set('shortcutRegisteredTime', new Date());
    const mappedShortcuts = this.mapClientShortcuts(client);
    mappedShortcuts.forEach(shortcut => {
      const matchingShortcut = this.shortcuts.find(registeredShortcut => {
        const altMatch = registeredShortcut.alt == shortcut.alt;
        const shftMatch = registeredShortcut.shft == shortcut.shft;
        const ctrlMatch = registeredShortcut.ctrl == shortcut.ctrl;
        const modKeysMatch = altMatch && shftMatch && ctrlMatch;
        const codeMatch = registeredShortcut.code == shortcut.code;
        const lastCodeMatch = registeredShortcut.lastCode == shortcut.lastCode;
        return modKeysMatch && codeMatch && lastCodeMatch;
      });
      assert(
        `Registering two shortcuts with the same path: [${shortcut.description}] and [${matchingShortcut.description}]`,
        !matchingShortcut
      );
    });
    client.set('_mappedShortcuts', mappedShortcuts);
    this.registeredClients.addObject(client);
  },
  unregisterKeyboardShortcuts(client) {
    this.registeredClients.removeObject(client);
  },
});
