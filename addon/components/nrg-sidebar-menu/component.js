import {
  inject as service
} from '@ember/service';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  sidebarMenuManager: service(),

  classNames: ['ui', 'vertical', 'left', 'menu', 'sidebar-menu'],

  appReloadLocation: '/',

  actions: {
    clickedLink() {
      this.sendAction();
    },
    sidebarAction(menuItem) {
      menuItem.sidebarAction();
    },
  },
});
