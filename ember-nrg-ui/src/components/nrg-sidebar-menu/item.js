import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from '../../utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgSidebarMenuItem extends Component {
  @service
  application;

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
    const currentUser = this.application.user;
    if (needsAllRoles) {
      return roles.every((role) => currentUser.hasRole(role));
    }
    return roles.some((role) => currentUser.hasRole(role));
  }

  @action
  onClick(evt) {
    if (!this.args.url && !this.args.routeName) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    this.args.onClick?.(...arguments);
    this.args.onClickInternal?.(...arguments);
  }
}
