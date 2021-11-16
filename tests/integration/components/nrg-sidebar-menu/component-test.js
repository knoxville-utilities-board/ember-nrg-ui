import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-sidebar-menu', function(hooks) {
  setupRenderingTest(hooks);

  test('item is rendered', async function(assert) {
    const sidebarMenuManager = this.owner.lookup('service:sidebarMenuManager');
    sidebarMenuManager.registerSidebarMenuItem({
      sidebarLabel: 'Home',
      routeName: '',
      isShownInSidebar: true,
    });

    await render(hbs`<NrgSidebar @isOpen={{true}} @onSidebarItemClick={{onSidebarItemClick}} />`);

    assert.ok(
      document
        .querySelector('.sidebar-menu')
        .textContent.trim()
        .match(/Home/)
    );
  });
});
