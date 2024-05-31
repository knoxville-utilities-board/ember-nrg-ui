import ObjectProxy from '@ember/object/proxy';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'ember-get-config';

import type { PageTitleService } from 'global';

declare type User = {
  roles: string[];
};

class ApplicationUser extends ObjectProxy<User> {
  get roles() {
    return this.content?.roles ?? [];
  }

  hasRole(role: string) {
    return this.roles?.includes?.(role) ?? false;
  }
}

export default class ApplicationService extends Service {
  @service('page-title')
  declare pageTitleService: PageTitleService;

  constructor(owner: object | undefined) {
    super(owner);
    this.pageTitleService.titleDidUpdate = (title: string) => {
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
  pageTitle?: string;

  get environmentConfig() {
    return config;
  }

  get isTesting() {
    return this.environmentConfig.environment === 'test';
  }
}
