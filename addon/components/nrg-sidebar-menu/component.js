import {
  inject as service
} from '@ember/service';
import Component from '@ember/component';
import layout from './template';
import {
  filterBy,
  notEmpty
} from '@ember/object/computed';

export default Component.extend({
  layout,

  sidebarMenuManager: service(),

  classNames: ['ui', 'vertical', 'left', 'menu', 'sidebar-menu'],

  appReloadLocation: '/',

  visibleMenuItems: filterBy('sidebarMenuManager.menuItems', 'isShownInSidebar', true),

  visibleFooterItems: filterBy('sidebarMenuManager.footerMenuItems', 'isShownInSidebar', true),

  hasVisibleFooterItems: notEmpty('visibleFooterItems'),

  actions: {
    clickedLink() {
      this.sendAction();
    },
    sidebarAction(menuItem) {
      menuItem.sidebarAction();
    },
  },
});
