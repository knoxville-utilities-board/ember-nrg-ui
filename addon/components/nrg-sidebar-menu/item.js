import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class NrgSidebarMenuItem extends Component {
  @service application;

  get url() {
    return this.args.url ?? '';
  }

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

  @action
  onClick(evt) {
    if (!this.args.url) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    this.args.onClick?.(...arguments);
    this.args.onClickInternal?.(...arguments);
  }
}
