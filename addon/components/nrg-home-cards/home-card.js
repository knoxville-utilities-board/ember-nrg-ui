import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeCard extends Component {
  @service
  application;

  @service
  router;

  get visible() {
    if (!this.args.role) {
      return true;
    }
    const roles = Array.isArray(this.args.role)
      ? this.args.role
      : [this.args.role];
    const needsAllRoles = this.args.needsAllRoles;
    const currentUser = this.application.user;
    if (needsAllRoles) {
      return roles.every((role) => currentUser.hasRole(role));
    }
    return roles.some((role) => currentUser.hasRole(role));
  }

  @action
  click(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const route = this.args.route;
    const routeModel = this.args.routeModel;
    const url = this.args.url;
    if (route && routeModel) {
      this.router.transitionTo(route, routeModel);
    } else if (route) {
      this.router.transitionTo(route);
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      if (this.args.onClick) {
        this.args.onClick();
      }
    }
  }
}
