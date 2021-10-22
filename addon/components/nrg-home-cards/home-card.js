import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import layout from '../../templates/components/nrg-home-cards/home-card';

export default Component.extend({
  layout,

  classNames: ['card', 'home-card'],

  classNameBindings: ['actionCard', 'visible::is-visually-hidden'],

  tagName: 'a',

  router: service(),

  visible: computed('currentUser.roles', 'role', function() {
    if (!this.role) {
      return true;
    }
    const roles = Array.isArray(this.role) ? this.role : [this.role];
    const needsAllRoles = this.needsAllRoles;
    const currentUserContent = this.get('currentUser.content');
    if (needsAllRoles) {
      return roles.every(role => currentUserContent.hasRole(role));
    }
    return roles.some(role => currentUserContent.hasRole(role));
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
