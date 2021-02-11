import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import layout from './template';

export default Component.extend({
  layout,

  classNames: ['card', 'home-card'],

  classNameBindings: ['actionCard', 'visible::is-visually-hidden'],

  tagName: 'a',

  router: service(),

  visible: computed('currentUser.roles', function() {
    const role = this.role;
    const needsAllRoles = this.needsAllRoles;
    const currentUserContent = this.get('currentUser.content');
    if (Array.isArray(role) && needsAllRoles) {
      return role.every(role => currentUserContent.hasRole(role));
    } else if (Array.isArray(role)) {
      return role.some(role => currentUserContent.hasRole(role));
    } else if (role) {
      return currentUserContent.hasRole(role);
    }
    return true;
  }),

  click() {
    const route = this.route;
    const routeModel = this.routeModel;
    const url = this.url;
    if (route && routeModel) {
      this.router.transitionTo(route, routeModel);
    } else if (route) {
      this.router.transitionTo(route);
    } else if (url) {
      // https://mathiasbynens.github.io/rel-noopener/
      const newWindow = window.open();
      newWindow.opener = null;
      newWindow.location = url;
    } else {
      this.sendAction();
    }
  },
});
