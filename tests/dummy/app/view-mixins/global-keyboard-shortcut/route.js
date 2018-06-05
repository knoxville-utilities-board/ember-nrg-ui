import Route from '@ember/routing/route';
import KeyboardShortcutMixin from 'ember-nrg-ui/mixins/global-keyboard-shortcut';
import SidebarNavigationMixin from 'ember-nrg-ui/mixins/sidebar-navigation';

export default Route.extend(KeyboardShortcutMixin, SidebarNavigationMixin, {
  sidebarLabel: 'global-keyboard-shortcuts',

  shortcutHeader: "From a Route",
  keyboardShortcuts: [{
    key: 'KeyF',
    alt: true,
    actionName: 'goToForms',
    description: "Go to form-container",
  }, {
    key: ['KeyH', 'KeyC'],
    ctrl: true,
    shft: true,
    actionName: 'goToHomeCard',
    description: "Go to home-cards",
  }],

  actions: {
    goToForms() {
      this.transitionTo('view-components.nrg-form-container');
    },
    goToHomeCard() {
      this.transitionTo('view-components.nrg-home-card');
    },
  },
});
