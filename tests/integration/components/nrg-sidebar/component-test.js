import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-sidebar', function(hooks) {
  hooks.afterEach(() => {
    // Clean up sidebar remenants
    document.querySelector('.sidebar-modal').remove();
    const dimmedElement = document.querySelector('.dimmed');
    if (dimmedElement) {
      dimmedElement.classList.remove('dimmed');
    }
  });

  setupRenderingTest(hooks);

  test('sidebar is rendered', async function(assert) {
    await render(hbs`{{nrg-sidebar isOpen=true}}`);
    assert.equal(document.querySelectorAll('.ui.sidebar').length, 2);
  });

  test('Item is rendered', async function(assert) {
    const sidebarMenuManager = this.owner.lookup('service:sidebarMenuManager');
    sidebarMenuManager.registerSidebarMenuItem({
      sidebarLabel: 'Home',
      routeName: '',
      isShownInSidebar: true,
    });
    await render(hbs`{{nrg-sidebar}}`);
    assert.ok(
      document
        .querySelector('.ui.sidebar')
        .textContent.trim()
        .match(/Home/)
    );
  });
});
