//BEGIN-SNIPPET global-keyboard-shortcuts
import Component from '@ember/component';
import KeyboardShortcutMixin from 'ember-nrg-ui/mixins/global-keyboard-shortcut';

export default Component.extend(KeyboardShortcutMixin, {
  tagName: '',

  shortcutHeader: 'From a Component',

  keyboardShortcuts: [{
    key: 'ArrowUp',
    actionName: 'emptyEvent',
    description: "Arrow Up",
  }, {
    key: 'ArrowDown',
    actionName: 'emptyEvent',
    description: "Arrow Down",
  }, {
    key: 'ArrowLeft',
    actionName: 'emptyEvent',
    description: "Arrow Left",
  }, {
    key: 'ArrowRight',
    actionName: 'emptyEvent',
    description: "Arrow Right",
  }, {
    key: 'KeyV',
    header: "From a Route",
    actionName: 'emptyEvent',
    description: "Actually from a component, but with header overwritten",
  }, {
    key: 'KeyC',
    actionName: 'countC',
    description: "Increment C counter",
  }, {
    key: 'KeyC',
    shft: true,
    actionName: 'countShiftC',
    description: "Increment Shft+C counter",
  }, {
    key: 'KeyC',
    ctrl: true,
    actionName: 'countCtrlC',
    description: "Increment Ctrl+C counter",
  }, {
    key: 'KeyC',
    alt: true,
    shft: true,
    actionName: 'countAltShiftC',
    description: "Increment Alt+Shft+C counter",
  }],

  counterC: 0,
  counterShftC: 0,
  counterCtrlC: 0,
  counterAltShftC: 0,

  actions: {
    emptyEvent() {
      //
    },
    countC() {
      this.incrementProperty('counterC');
    },
    countShiftC() {
      this.incrementProperty('counterShftC');
    },
    countCtrlC() {
      this.incrementProperty('counterCtrlC');
    },
    countAltShiftC() {
      this.incrementProperty('counterAltShftC');
    },
  }
});
//END-SNIPPET
