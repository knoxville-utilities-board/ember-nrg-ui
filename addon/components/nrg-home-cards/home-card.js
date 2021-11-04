import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeCard extends Component {
  @service application;
  @service router;

  get visible() {
    if (!this.args.role) {
      return true;
    }
    const roles = Array.isArray(this.args.role)
      ? this.args.role
      : [this.args.role];
    const needsAllRoles = this.args.needsAllRoles;
    const currentUserContent = this.application.currentUser.content;
    if (needsAllRoles) {
      return roles.every((role) => currentUserContent.hasRole(role));
    }
    return roles.some((role) => currentUserContent.hasRole(role));
  }

  @action click() {
    const route = this.args.route;
    const routeModel = this.args.routeModel;
    const url = this.args.url;
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
      if (this.args.onClick) {
        this.args.onClick();
      }
    }
  }
}
