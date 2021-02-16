import { sort, filterBy, setDiff } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed, set } from '@ember/object';
import { getOwner } from '@ember/application';
import SidebarNavigationMixin from 'ember-nrg-ui/mixins/sidebar-navigation';

export default Service.extend({
  routing: service('-routing'),

  init() {
    this._super(...arguments);
    this.loadApplicableRoutes();
  },

  availableRoutes: computed(function() {
    const availableRoutes = this.get('routing.router._routerMicrolib.recognizer.names');
    return (availableRoutes && Object.keys(availableRoutes)) || [];
  }),

  loadApplicableRoutes() {
    const routing = this.get('routing');
    const availableRoutes = this.get('availableRoutes');
    const container = getOwner(this);
    availableRoutes.forEach(routeName => {
      const route = container.lookup(`route:${routeName}`);
      const isSidebarRoute = route && SidebarNavigationMixin.detect(route);
      if (isSidebarRoute) {
        routing.generateURL(routeName, A(), {});
      }
    });
  },

  registerSidebarMenuItem(menuItem) {
    this.get('_menuItems').pushObject(menuItem);
  },

  unregisterSidebarMenuItem(menuItem) {
    this.get('_menuItems').removeObject(menuItem);
  },

  contextItemSort: ['sidebarPriority:desc', 'sidebarLabel:asc'],

  _menuItems: A(),

  _menuItemsRoleFiltered: computed('_menuItems.[]', 'currentUser.roles.[]', function() {
    return this.get('_menuItems').filter(item => {
      if (!item.sidebarRole) {
        return true;
      }
      const currentUserContent = this.get('currentUser.content');
      const roles = Array.isArray(item.sidebarRole) ? item.sidebarRole : [item.sidebarRole];
      if (item.needsAllRoles) {
        return roles.every(role => currentUserContent.hasRole(role));
      }
      return roles.some(role => currentUserContent.hasRole(role));
    });
  }),

  _menuItemsSorted: sort('_menuItemsRoleFiltered', 'contextItemSort'),

  footerMenuItems: filterBy('_menuItemsSorted', 'sidebarFooterItem', true),

  _menuItemsFiltered: setDiff('_menuItemsSorted', 'footerMenuItems'),

  _groupMenuItems: computed('_menuItemsFiltered.[]', function() {
    const menuItems = this.get('_menuItemsFiltered');
    const menuGroups = menuItems.filter(menuItem => {
      return menuItem.isSidebarGroupHeader;
    });
    menuGroups.forEach(menuGroup => {
      if (menuGroup.routeName === 'application') {
        set(menuGroup, 'isApplicationRoute', true);
        return;
      }
      const children = menuItems.filter(menuItem => {
        if (!menuItem.sidebarAction && (!menuItem.routeName || menuItem.isSidebarGroupHeader)) {
          return false;
        }

        let isChild = false;
        if (menuItem.sidebarAction) {
          isChild = menuItem.sidebarGroup === menuGroup.sidebarGroup;
        } else {
          const belongsToRoute = menuItem.routeName.indexOf(menuGroup.routeName) === 0;
          const isSameRoute = menuGroup.routeName === menuItem.routeName && !menuItem.sidebarURL;
          isChild = belongsToRoute && !isSameRoute;
        }

        if (isChild) {
          menuItem.isChild = isChild;
        }
        return isChild;
      });
      set(menuGroup, 'children', children);
    });

    const orphanRoutes = menuItems.filter(menuItem => {
      return !menuItem.isChild && !menuItem.isSidebarGroupHeader;
    });

    return menuGroups.concat(orphanRoutes);
  }),

  menuItems: sort('_groupMenuItems', 'contextItemSort'),
});
