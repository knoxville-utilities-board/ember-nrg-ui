import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import { typeOf as emberTypeOf } from '@ember/utils';

export default Mixin.create({
  sidebarMenuManager: service(),

  sidebarPriority: 10,

  isShownInSidebar: true,

  concatenatedProperties: ['sidebarURLs'],

  init() {
    this._super(...arguments);
    this.updateSidebarMenuItems(undefined);
  },

  updateSidebarMenuItems(dynamicSidebarUrls) {
    next(() => {
      const sidebarMenuManager = this.get('sidebarMenuManager');

      let sidebarURLs = this.get('sidebarURLs') || A();
      if (dynamicSidebarUrls) {
        sidebarURLs = dynamicSidebarUrls;
      } else {
        sidebarMenuManager.registerSidebarMenuItem(this);
      }
      const routeName = this.get('routeName');
      sidebarURLs.forEach((item) => {
        if (item.isShownInSidebar === undefined) {
          item.isShownInSidebar = true;
        }
        if (emberTypeOf(item.isShownInSidebar) === 'string') {
          item.isShownInSidebar = this.get(item.isShownInSidebar);
        }
        sidebarMenuManager.registerSidebarMenuItem(
          EmberObject.create({
            sidebarLabel: item.label,
            sidebarURL: item.url,
            sidebarRole: item.role,
            needsAllRoles: item.needsAllRoles,
            sidebarIconClass: item.icon,
            sidebarBadge: item.badge,
            sidebarPriority: item.priority || 10,
            isShownInSidebar: item.isShownInSidebar,
            sidebarFooterItem: item.sidebarFooterItem,
            routeName,
          })
        );
      });
    });
  },

  willDestroy() {
    this._super(...arguments);
    this.get('sidebarMenuManager').unregisterSidebarMenuItem(this);
  },
});
