import Route from '@ember/routing/route';
import ContextMenuMixin from 'ember-nrg-ui/mixins/context-menu';
import KeyboardShortcutMixin from 'ember-nrg-ui/mixins/global-keyboard-shortcut';

export default Route.extend(ContextMenuMixin, KeyboardShortcutMixin, {
  contextItems: [
    {
      label: 'Release Notes',
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
