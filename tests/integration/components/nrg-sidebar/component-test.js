import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-sidebar', function(hooks) {
  setupRenderingTest(hooks);

  test('sidebar is rendered', async function(assert) {
    await render(hbs`<NrgSidebar @isOpen={{true}} />`);
    assert.equal(document.querySelectorAll('.sidebar-menu').length, 1);
  });

  test('Item is rendered', async function(assert) {
    const sidebarMenuManager = this.owner.lookup('service:sidebarMenuManager');
    sidebarMenuManager.registerSidebarMenuItem({
      sidebarLabel: 'Home',
      routeName: '',
      isShownInSidebar: true,
    });
    await render(hbs`<NrgSidebar @isOpen={{true}} />`);
    assert.ok(
      document
        .querySelector('.sidebar-menu')
        .textContent.trim()
        .match(/Home/)
    );
  });
});
