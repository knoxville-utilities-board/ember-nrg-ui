import Route from '@ember/routing/route';
import SidebarNavigationMixin from 'ember-nrg-ui/mixins/sidebar-navigation';
import { readOnly } from '@ember/object/computed';

export default Route.extend(SidebarNavigationMixin, {
  sidebarLabel: 'Acceptance Test Child Route',
  isShownInSidebar: readOnly('applicationSettings.acceptanceTestChildRouteIsShownInSidebar'),
  sidebarFooterItem: readOnly('applicationSettings.acceptanceTestChildRouteSidebarFooterItem'),
});
