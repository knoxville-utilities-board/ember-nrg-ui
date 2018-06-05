import Route from '@ember/routing/route';
import SidebarNavigationMixin from 'ember-nrg-ui/mixins/sidebar-navigation';

export default Route.extend(SidebarNavigationMixin, {
  sidebarLabel: 'modal',
});
