import Route from '@ember/routing/route';
import SidebarNavigationMixin from 'ember-nrg-ui/mixins/sidebar-navigation';
import { readOnly } from '@ember/object/computed';

export default Route.extend(SidebarNavigationMixin, {
  sidebarLabel: 'Acceptance Test Route',
  isSidebarGroupHeader: true,
  isShownInSidebar: readOnly('applicationSettings.acceptanceTestRouteIsShownInSidebar'),
  sidebarFooterItem: readOnly('applicationSettings.acceptanceTestRouteSidebarFooterItem'),
});
