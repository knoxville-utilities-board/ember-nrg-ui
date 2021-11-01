import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { filterBy, notEmpty } from '@ember/object/computed';

export default class NrgSidebarMenu extends Component {
  @service sidebarMenuManager;
  @filterBy('sidebarMenuManager.menuItems', 'isShownInSidebar', true) visibleMenuItems;
  @filterBy('sidebarMenuManager.footerMenuItems', 'isShownInSidebar', true) visibleFooterItems;
  @notEmpty('visibleFooterItems') hasVisibleFooterItems;

  sidebarAction(menuItem) {
    menuItem.sidebarAction();
  }
};
