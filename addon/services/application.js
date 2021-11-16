import { getOwner } from '@ember/application';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class ApplicationService extends Service {
  @service('page-title')
  pageTitleService;

  constructor() {
    super(...arguments);
    this.pageTitleService.titleDidUpdate = (title) => {
      this.pageTitle = title;
    };
  }

  @tracked
  sidebarMenuIsOpen = true;

  @tracked
  pageTitle = this.environmentConfig?.APP?.name;

  get environmentConfig() {
    return getOwner(this).resolveRegistration('config:environment');
  }

  get isTesting() {
    return this.environmentConfig.environment === 'test';
  }
}
