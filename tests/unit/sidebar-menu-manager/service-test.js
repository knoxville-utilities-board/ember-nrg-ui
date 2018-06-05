import {
  module,
  test
} from 'qunit';
import {
  setupTest
} from 'ember-qunit';
import {
  A
} from '@ember/array';

module('Unit | Service | sidebar-menu-manager', function(hooks) {
  setupTest(hooks);

  const routing = {};

  test('menu item is correctly accounted for', function(assert) {
    const service = this.owner.lookup('service:sidebar-menu-manager');
    service.set('routing', routing);
    service.set('_menuItems', A());

    service.registerSidebarMenuItem({
      routeName: 'foo.chocolate',
      sidebarLabel: 'Foo Bar',
      sidebarPriority: 50,
    });
    service.registerSidebarMenuItem({
      routeName: 'foo.bar',
      sidebarLabel: 'Foo Bar',
      sidebarPriority: 40,
    });
    service.registerSidebarMenuItem({
      routeName: 'foo',
      sidebarLabel: 'Foo',
      isSidebarGroupHeader: true,
    });
    const menuItems = service.get('menuItems');

    const firstItem = menuItems.get('firstObject');
    assert.equal(firstItem.routeName, 'foo');
    assert.equal(firstItem.children[0].routeName, 'foo.chocolate');
    assert.equal(firstItem.children[1].routeName, 'foo.bar');
  });

  test('add orphaned routes to list', function(assert) {
    const service = this.owner.lookup('service:sidebar-menu-manager');
    service.set('routing', routing);
    service.set('_menuItems', A());

    service.registerSidebarMenuItem({
      routeName: 'foo.chocolate',
      sidebarLabel: 'Foo Bar',
      sidebarPriority: 50,
    });
    service.registerSidebarMenuItem({
      routeName: 'foo.bar',
      sidebarLabel: 'Foo Bar',
      sidebarPriority: 40,
    });
    service.registerSidebarMenuItem({
      routeName: 'foo',
      sidebarLabel: 'Foo',
    });
    const menuItems = service.get('menuItems');

    const firstItem = menuItems.get('firstObject');
    assert.equal(firstItem.routeName, 'foo.chocolate');
  });
});
