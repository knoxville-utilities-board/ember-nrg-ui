import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class NrgSidebarMenu extends Component {
  @service
  sidebarMenuManager;

  get visibleMenuItems() {
    return this.sidebarMenuManager.menuItems?.filterBy?.('isShownInSidebar');
  }

  visibleFooterItems() {
    return this.sidebarMenuManager.footerMenuItems?.filterBy?.(
      'isShownInSidebar'
    );
  }

  get hasVisibleFooterItems() {
    return this.visibleFooterItems?.length > 0;
  }

  sidebarAction(menuItem) {
    menuItem.sidebarAction();
  }
}
