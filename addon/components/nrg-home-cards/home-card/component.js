import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import layout from './template';

export default Component.extend({
  layout,

  classNames: ['card', 'home-card'],

  classNameBindings: ['actionCard'],

  tagName: 'a',

  router: service(),

  isVisible: computed('currentUser.roles', function() {
    const role = this.get('role');
    if (role) {
      return this.get('currentUser.content').hasRole(role);
    }
    return true;
  }),

  click() {
    const route = this.get('route');
    const routeModel = this.get('routeModel');
    const url = this.get('url');
    if (route && routeModel) {
      this.get('router').transitionTo(route, routeModel);
    } else if (route) {
      this.get('router').transitionTo(route);
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
