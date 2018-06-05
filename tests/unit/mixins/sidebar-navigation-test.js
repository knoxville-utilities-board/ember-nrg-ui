import EmberObject from '@ember/object';
import SidebarNavigationMixin from 'ember-nrg-ui/mixins/sidebar-navigation';
import {
  module,
  test
} from 'qunit';

module('Unit | Mixin | sidebar-navigation', function() {
  test('Route registers itself on init', async function(assert) {
    const SidebarNavigationObject = EmberObject.extend(SidebarNavigationMixin);
    const subject = SidebarNavigationObject.create({
      sidebarMenuManager: {
        registerSidebarMenuItem(menuItem) {
          assert.equal(menuItem, subject);
        },
      },
    });
  });
});
