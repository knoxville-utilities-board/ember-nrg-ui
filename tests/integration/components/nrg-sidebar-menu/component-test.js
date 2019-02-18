import {
  module,
  test
} from 'qunit';
import {
  setupRenderingTest
} from 'ember-qunit';
import {
  render
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | nrg-sidebar-menu', function(hooks) {
  setupRenderingTest(hooks);

  test('item is rendered', async function(assert) {
    const sidebarMenuManager = this.owner.lookup('service:sidebarMenuManager')
    sidebarMenuManager.registerSidebarMenuItem({
      sidebarLabel: 'Home',
      routeName: '',
      isShownInSidebar: true,
    });

    await render(hbs `{{nrg-sidebar clickedSidebarItem=clickedSidebarItem}}`);

    assert.ok($('.ui.sidebar').text().trim().match(/Home/));
  });
});
