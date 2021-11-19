import { getOwner } from '@ember/application';
import ObjectProxy from '@ember/object/proxy';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

class ApplicationUser extends ObjectProxy {
  get roles() {
    return this.content?.roles ?? [];
  }

  hasRole(role) {
    return this.roles?.includes?.(role) ?? false;
  }
}

export default class ApplicationService extends Service {
  @service('page-title')
  pageTitleService;

  constructor() {
    super(...arguments);
    this.pageTitleService.titleDidUpdate = (title) => {
      this.pageTitle = title;
    };
    this.user = new ApplicationUser();
    this.settings = new ObjectProxy();
  }

  @tracked
  user;

  @tracked
  settings;

  @tracked
  sidebarMenuIsOpen = true;

  @tracked
  sidebarIsOpen = false;

  @tracked
  pageTitle = this.environmentConfig?.APP?.name;

  get environmentConfig() {
    return getOwner(this).resolveRegistration('config:environment');
  }

  get isTesting() {
    return this.environmentConfig.environment === 'test';
  }
}
