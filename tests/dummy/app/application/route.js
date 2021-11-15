import Route from '@ember/routing/route';
import KeyboardShortcutMixin from 'ember-nrg-ui/mixins/global-keyboard-shortcut';

export default Route.extend(KeyboardShortcutMixin, {
  pageTitle: 'NRG UI',

  contextItems: [
    {
      label: 'Release Notes',
      actionName: 'routeToReleaseNotes',
      priority: 2,
    },
    {
      label: 'More Release Note',
      actionName: 'routeToReleaseNotes',
      priority: 2,
    },
  ],

  keyboardShortcuts: [
    {
      key: 'KeyS',
      alt: true,
      actionName: 'goToKeyboardShortcuts',
      description: 'Go to keyboard-shortcuts',
    },
  ],

  actions: {
    routeToReleaseNotes() {
      this.transitionTo('release-notes');
    },
    goToKeyboardShortcuts() {
      this.transitionTo('view-mixins.global-keyboard-shortcut');
    },
  },
});
