import {
  module,
  test
} from 'qunit';
import {
  visit,
  find,
  findAll
} from '@ember/test-helpers';
import {
  setupApplicationTest
} from 'ember-qunit';

const hasSidebarItem = (label, nodeIdentifier = '.sidebar-menu > .item') => {
  const nodes = findAll(nodeIdentifier);
  return nodes.find(node => {
    return node.innerText.includes(label) || hasSidebarItem(label, nodeIdentifier + '> .menu > .item');
  });
};
module('Acceptance | focus first input', function(hooks) {
  setupApplicationTest(hooks);

  test('Route shown is not sidebar', async function(assert) {
    const applicationSettings = this.owner.lookup('settings:application');
    applicationSettings.setProperties({
      acceptanceTestRouteIsShownInSidebar: false,
    });
    await visit('/');
    assert.notOk(hasSidebarItem('Acceptance Test Route'));
  });

  test('Route shown in sidebar', async function(assert) {
    const applicationSettings = this.owner.lookup('settings:application');
    applicationSettings.setProperties({
      acceptanceTestRouteIsShownInSidebar: true,
    });
    await visit('/');
    assert.ok(hasSidebarItem('Acceptance Test Route'));
  });

  test('Child Route not shown in sidebar', async function(assert) {
    const applicationSettings = this.owner.lookup('settings:application');
    applicationSettings.setProperties({
      acceptanceTestRouteIsShownInSidebar: true,
      acceptanceTestChildRouteIsShownInSidebar: false,
    });
    await visit('/');
    assert.notOk(hasSidebarItem('Acceptance Test Child Route'));
  });

  test('Child Route is shown in sidebar', async function(assert) {
    const applicationSettings = this.owner.lookup('settings:application');
    applicationSettings.setProperties({
      acceptanceTestRouteIsShownInSidebar: true,
      acceptanceTestChildRouteIsShownInSidebar: true,
    });
    await visit('/');
    assert.ok(hasSidebarItem('Acceptance Test Child Route'));
  });

  test('Route is shown and a footer item', async function(assert) {
    const applicationSettings = this.owner.lookup('settings:application');
    applicationSettings.setProperties({
      acceptanceTestRouteSidebarFooterItem: true,
      acceptanceTestRouteIsShownInSidebar: true,
    });
    await visit('/');
    const text = find('.sidebar-menu > .sidebar-footer').innerText;
    assert.ok(text.includes('Acceptance Test Route'));
  });
});
