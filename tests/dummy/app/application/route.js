import Route from '@ember/routing/route';
import KeyboardShortcutMixin from 'ember-nrg-ui/mixins/global-keyboard-shortcut';
import RoutePageTitleMixin from 'ember-nrg-ui/mixins/route-page-title';

export default Route.extend(KeyboardShortcutMixin, RoutePageTitleMixin, {
  pageTitle: 'NRG UI',


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
